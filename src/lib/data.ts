export interface MarketData {
  id: number;
  title: string;
  desc: string;
  price: string;
  content: string;
  owner: string;
  issubscribe: boolean;
}

const STORAGE_KEY = "market_data_list";

export const dataList: MarketData[] = [
  {
    id: 1,
    title: "Human Genome Set",
    desc: "High-quality, anonymized human genome sequencing data for research and analysis.",
    price: "0.01",
    content: "111111",
    owner: "me",
    issubscribe: true,
  },
  {
    id: 2,
    title: "Blood Test Records",
    desc: "Comprehensive blood test results dataset, including CBC, metabolic panel, and more.",
    price: "0.002",
    content: "111111",
    owner: "aaaaaaaa",
    issubscribe: false,
  },
  {
    id: 3,
    title: "Wearable Device Activity",
    desc: "Aggregated step count and heart rate data from wearable devices (2019-2023).",
    price: "0.03",
    content: "111111",
    owner: "me",
    issubscribe: true,
  },
  {
    id: 4,
    title: "MRI Brain Scans",
    desc: "A collection of anonymized MRI brain scan images for AI and medical research.",
    price: "0.04",
    content: "111111",
    owner: "0xdef0...mnop",
    issubscribe: false,
  },
  {
    id: 5,
    title: "Gut Microbiome Profiles",
    desc: "Diverse gut microbiome sequencing data from healthy adults.",
    price: "0.02",
    content: "111111",
    owner: "0x1111...2222",
    issubscribe: true,
  },
  {
    id: 6,
    title: "Sleep Pattern Logs",
    desc: "Sleep duration and quality logs from smart devices, multi-year dataset.",
    price: "0.01",
    content: "111111",
    owner: "0x3333...4444",
    issubscribe: false,
  },
];

export function getDataList(): MarketData[] {
  if (typeof window !== "undefined") {
    const str = localStorage.getItem(STORAGE_KEY);
    if (str) {
      try {
        return JSON.parse(str);
      } catch {}
    }
  }
  return dataList;
}

export function updateSubscribeStatus(id: number, status: boolean) {
  let list = getDataList();
  list = list.map((item) =>
    item.id === id ? { ...item, issubscribe: status } : item
  );
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}
