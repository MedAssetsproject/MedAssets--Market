import React from "react";

interface DataCardProps {
  title: string;
  desc: string;
  price: string;
  issubscribe?: boolean;
}

export default function DataCard({
  title,
  desc,
  price,
  issubscribe,
}: DataCardProps) {
  return (
    <div
      className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm transition-colors duration-200 hover:border-[#8af7ff] cursor-pointer min-w-[280px] max-w-[340px] flex flex-col justify-between h-full relative"
      tabIndex={0}
    >
      <div>
        <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{desc}</p>
      </div>
      <div className="font-semibold text-base text-[#00b4d8] mt-auto">
        {price} SOL
      </div>
      {issubscribe && (
        <span
          className="absolute bottom-3 right-3 text-green-500"
          title="Subscribed"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#d1fae5" />
            <path
              d="M7 13l3 3 7-7"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
