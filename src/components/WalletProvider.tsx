"use client";

import { FC, ReactNode, useMemo } from "react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

interface Props {
  children: ReactNode;
}

export const WalletProvider: FC<Props> = ({ children }) => {
  // 设置网络为Devnet
  // const network = WalletAdapterNetwork.Devnet;

  const RPC_ENDPOINT =
    "https://devnet.helius-rpc.com/?api-key=0422440e-2b28-48a5-8683-fb4de54ee525";
  const endpoint = useMemo(() => RPC_ENDPOINT, []);

  // 配置支持的钱包
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};
