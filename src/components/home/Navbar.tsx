"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/images/logo.png";
import buttonBG from "../../../public/images/navbar-button.png";
import sliceText from "utils/sliceText";
import WalletConnectModal from "./WalletConnectModal";

const Navbar = ({ connectedWallet, setConnectedWallet, wallet }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex absolute z-10 justify-between p-4 w-full">
      <Image
        src={logo}
        alt="logo"
        width={120}
        className="w-44 h-auto object-contain"
      />
      <div
        className="relative w-12 h-10 flex flex-col justify-between items-center sm:hidden"
        onClick={() => setIsOpen(true)}
      >
        <span className="block w-full h-2 bg-yellow-300 clip-trapezoid-1"></span>
        <span className="block w-full h-2 bg-yellow-300 clip-trapezoid-2"></span>
        <span className="block w-full h-2 bg-yellow-300 clip-trapezoid-3"></span>
      </div>
      <div className="w-48 h-[60px] relative hidden sm:block">
        <Image
          src={buttonBG}
          alt="logo"
          width={240}
          height={120}
          className="w-48 h-auto object-contain absolute"
        />
        <button
          onClick={() => setIsOpen(true)}
          className="absolute z-10 text-black font-semibold text-lg text-center p-4 shoulder-font w-full"
        >
          {connectedWallet?.wallet ? sliceText(wallet) : "CONNECT WALLET"}
        </button>
      </div>
      <WalletConnectModal
        wallet={wallet}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setConnectedWallet={setConnectedWallet}
        connectedWallet={connectedWallet}
      />
    </div>
  );
};

export default Navbar;
