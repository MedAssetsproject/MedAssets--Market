import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import type { MarketData } from "./data";
import { dataList } from "./data";

const DB_PATH = "./market.db";

// 打开数据库
export async function openDb(): Promise<Database> {
  return open({ filename: DB_PATH, driver: sqlite3.Database });
}

// 初始化数据库（只在第一次调用时写入初始数据）
export async function initDb() {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS market_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    desc TEXT,
    price TEXT,
    content TEXT,
    owner TEXT,
    issubscribe INTEGER
  )`);
  // 检查是否已有数据
  const count = await db.get("SELECT COUNT(*) as cnt FROM market_data");
  if (count.cnt === 0) {
    const stmt = await db.prepare(
      "INSERT INTO market_data (title, desc, price, content, owner, issubscribe) VALUES (?, ?, ?, ?, ?, ?)"
    );
    for (const item of dataList) {
      await stmt.run(
        item.title,
        item.desc,
        item.price,
        item.content,
        item.owner,
        item.issubscribe ? 1 : 0
      );
    }
    await stmt.finalize();
  }
  await db.close();
}

// 获取所有数据
export async function getAllMarketData(): Promise<MarketData[]> {
  const db = await openDb();
  const rows = await db.all("SELECT * FROM market_data");
  await db.close();
  return rows.map((row) => ({ ...row, issubscribe: !!row.issubscribe }));
}

// 更新issubscribe
export async function updateSubscribeStatus(id: number, status: boolean) {
  const db = await openDb();
  await db.run(
    "UPDATE market_data SET issubscribe = ? WHERE id = ?",
    status ? 1 : 0,
    id
  );
  await db.close();
}
