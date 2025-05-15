export interface MarketData {
  id: number;
  title: string;
  desc: string;
  price: string;
  content: string;
  owner: string;
  issubscribe: boolean;
}

export const dataList: MarketData[] = [
  {
    id: 1,
    title: "Human Genome Set",
    desc: "High-quality, anonymized human genome sequencing data for research and analysis.",
    price: "0.01",
    content: "111111",
    owner: "0x1234...abcd",
    issubscribe: true,
  },
  {
    id: 2,
    title: "Blood Test Records",
    desc: "Comprehensive blood test results dataset, including CBC, metabolic panel, and more.",
    price: "0.02",
    content: "111111",
    owner: "0x5678...efgh",
    issubscribe: false,
  },
  {
    id: 3,
    title: "Wearable Device Activity",
    desc: "Aggregated step count and heart rate data from wearable devices (2019-2023).",
    price: "0.03",
    content: "111111",
    owner: "0x9abc...ijkl",
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

// 模拟SQL：更新issubscribe字段
export function updateSubscribeStatus(id: number, status: boolean) {
  const item = dataList.find((d) => d.id === id);
  if (item) {
    item.issubscribe = status;
  }
}
