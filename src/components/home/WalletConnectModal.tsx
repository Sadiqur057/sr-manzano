"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import walletConnect from "../../../public/images/wallet-logo.png";
import solflareWallet from "../../../public/images/solflare-logo.png";
import coinbaseWallet from "../../../public/images/coinbase-logo.png";
import braveWallet from "../../../public/images/brave-logo.png";
import phantomWallet from "../../../public/images/phantom-logo.png";
import buttonBG from "../../../public/images/navbar-button.png";
import sliceText from "utils/sliceText";

interface Wallet {
  id?: number;
  wallet?: string;
  image?: StaticImageData;
}

export default function WalletConnectModal({
  isOpen,
  setIsOpen,
  connectedWallet,
  setConnectedWallet,
  wallet,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  connectedWallet: Wallet;
  setConnectedWallet: Function;
  wallet: string;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen); // Controls rendering

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true); // Show modal immediately
    } else {
      setTimeout(() => setShouldRender(false), 500); // Delay unmounting (matches animation duration)
    }
  }, [isOpen]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const wallets = [
    { id: 1, wallet: "PHANTOM", image: phantomWallet },
    { id: 2, wallet: "SOLFLARE", image: solflareWallet },
    { id: 3, wallet: "COINBASE", image: coinbaseWallet },
    { id: 4, wallet: "BRAVE WALLET", image: braveWallet },
    { id: 5, wallet: "WALLET CONNECT", image: walletConnect },
  ];

  if (!shouldRender) return null; 

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 `}
      onClick={() => setIsOpen(false)}
    >
      <div className="absolute w-full h-full pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#b8c53c] opacity-30 blur-[100px]"></div>
      </div>
      <div
        className={`bg-[#1a1a1a] rounded-2xl p-6 lg:p-8 max-w-xs w-full z-10 shadow-[0_0_80px_rgba(184,197,60,0.8)]
          ${
            isMobile
              ? isOpen
                ? "animate-slide-up fixed bottom-0 rounded-t-2xl rounded-b-none"
                : "animate-slide-down fixed bottom-0 rounded-t-2xl rounded-b-none"
              : isOpen
              ? "animate-fade-in"
              : ""
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-4">
          {connectedWallet.wallet ? (
            <div className="min-h-[240px] flex flex-col justify-between">
              <button className="flex justify-center items-center bg-[#1e1e1e] hover:shadow-[0_0_20px_rgba(184,197,60,0.7)] rounded-xl py-1 transition-all mx-auto w-full">
                <Image
                  src={connectedWallet?.image}
                  width={180}
                  height={120}
                  className="h-12 object-contain w-fit"
                  alt={connectedWallet?.wallet}
                />
                <p className="z-10 text-white font-semibold text-lg text-center p-3 shoulder-font w-fit">
                  {sliceText(wallet)}
                </p>
              </button>
              <div className="w-48 h-[60px] mx-auto relative">
                <Image
                  src={buttonBG}
                  alt="logo"
                  width={240}
                  height={120}
                  className="w-48 h-auto object-contain absolute"
                />
                <button
                  onClick={() => setConnectedWallet({})}
                  className="absolute z-10 text-black font-semibold text-lg text-center p-3 shoulder-font w-full"
                >
                  DISCONNECT
                </button>
              </div>
            </div>
          ) : (
            wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => setConnectedWallet(wallet)}
                className="flex justify-center gap-3 items-center bg-[#1e1e1e] hover:shadow-[0_0_20px_rgba(184,197,60,0.7)] rounded-xl py-1 transition-all mx-auto w-full group"
              >
                <Image
                  src={wallet.image}
                  width={180}
                  height={120}
                  className="filter brightness-[1000] group-hover:brightness-100 h-12 object-contain w-fit py-1 transition-all"
                  alt={wallet.wallet}
                />
                <p className="z-10 text-white font-semibold text-xl p-3 shoulder-font text-nowrap text-start">
                  {wallet?.wallet}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
