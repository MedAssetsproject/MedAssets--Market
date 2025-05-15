"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const WalletButton = dynamic(() => import("./WalletButton"), {
  ssr: false,
  loading: () => (
    <button className="wallet-adapter-button wallet-adapter-button-trigger">
      Loading...
    </button>
  ),
});

export default function Header() {
  return (
    <header className="w-full px-4 py-4 flex items-center justify-between border-b bg-white">
      <div className="flex items-center space-x-8">
        <div
          className="flex items-center space-x-2 h-10 overflow-hidden"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <Image src="/logo.png" alt="Logo" width={200} height={40} />
        </div>
        <nav className="flex space-x-4">
          <Link
            href="/mysubscribe"
            className="hover:text-[#8af7ff] text-2xl font-bold text-gray-800"
          >
            Mysubscribe
          </Link>
          <Link
            href="/mydata"
            className="hover:text-[#8af7ff] text-2xl font-bold text-gray-800"
          >
            Mydata
          </Link>
        </nav>
      </div>
      <WalletButton />
    </header>
  );
}
