"use client";

import { MarketData, updateSubscribeStatus } from "@/lib/data";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { useState } from "react";

const RECEIVER = "5Vw4oLtvEWNPcXRseR5ou4CqGNabLGG7zYCRf1SqUrKb";

export default function Detail({ data }: { data: MarketData }) {
  const [issub, setIssub] = useState(data.issubscribe);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();

  // 下载文件
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/download_test.txt";
    link.download = "download_test.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 订阅并转账
  const handleSubscribe = async () => {
    setMsg("");
    if (!connected || !publicKey) {
      setMsg("请先连接钱包");
      return;
    }
    setLoading(true);
    try {
      const balance = await connection.getBalance(publicKey);
      // 解析price
      let price = 0;
      if (data.price.toLowerCase() !== "free") {
        price = parseFloat(data.price.replace(/[^0-9.]/g, ""));
      }
      console.log("balance=======", balance);
      console.log("price=======", price);
      if (balance < price * LAMPORTS_PER_SOL) {
        setMsg("余额不足");
        setLoading(false);
        return;
      }
      if (price > 0) {
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(RECEIVER),
            lamports: price * LAMPORTS_PER_SOL,
          })
        );
        await sendTransaction(tx, connection);
      }
      setIssub(true);
      updateSubscribeStatus(data.id, true);
      setMsg("订阅成功！");
    } catch (e: unknown) {
      setMsg("转账失败: " + (e instanceof Error ? e.message : String(e)));
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-md w-full max-w-xl flex flex-col items-center">
        <h2 className="font-bold text-2xl mb-2 text-gray-900">{data.title}</h2>
        <div className="w-full text-left mb-4">
          <div className="mb-1">
            <span className="font-semibold">Description:</span>
            {data.desc}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Price:</span>
            {data.price} SOL
          </div>
          {/* <div className="mb-1">
            <span className="font-semibold">Content:</span>
            {data.content}
          </div> */}
          <div className="mb-1">
            <span className="font-semibold">Owner:</span>
            {data.owner}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Subscribed:</span>
            {issub ? "Yes" : "No"}
          </div>
        </div>
        <div className="flex gap-6 mt-4 w-full justify-center">
          <button
            className={`px-6 py-2 rounded font-bold border transition ${
              issub
                ? "bg-[#8af7ff] text-black border-[#8af7ff] hover:bg-[#5befff]"
                : "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
            disabled={!issub}
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className={`px-6 py-2 rounded font-bold border transition ${
              !issub
                ? "bg-[#8af7ff] text-black border-[#8af7ff] hover:bg-[#5befff]"
                : "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
            disabled={issub || loading}
            onClick={handleSubscribe}
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </div>
        {msg && <div className="mt-4 text-red-500">{msg}</div>}
      </div>
    </div>
  );
}
