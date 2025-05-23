"use client";

import DataCard from "./DataCard";
import { getDataList, MarketData } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Subscribe() {
  const router = useRouter();
  const [subscribedData, setSubscribedData] = useState<MarketData[]>([]);

  useEffect(() => {
    function syncData() {
      setSubscribedData(getDataList().filter((item) => item.issubscribe));
    }
    syncData();
    window.addEventListener("storage", syncData);
    return () => window.removeEventListener("storage", syncData);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto mt-12 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Subscribed Data
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscribedData.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/${item.id}`)}
            className="cursor-pointer"
          >
            <DataCard
              title={item.title}
              desc={item.desc}
              price={item.price}
              issubscribe={item.issubscribe}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
