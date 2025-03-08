"use client";
import React, { useEffect, useState } from "react";
import homeImg from "../../../public/images/landing.png";
import connectWallet from "../../../public/images/connect-wallet.png";
import mintNow from "../../../public/images/mint-now.png";
import notEligible from "../../../public/images/not-eligible.png";
import notEligibleBtn from "../../../public/images/not-eligible-btn.png";
import sendMessage from "../../../public/images/send-message-form.png";
import sendMessageBg from "../../../public/images/send-message-bg.png";
import goBack from "../../../public/images/arrow.png";
import nft from "../../../public/images/nft.png";
import thanksMessage from "../../../public/images/thanks-message.png";
import phantomWallet from "../../../public/images/phantom-wallet.png";
import Image, { StaticImageData } from "next/image";
import Navbar from "./Navbar";
import MintNFTModal from "./MintNFTModal";
import ModalCard from "./ModalCard";
import { useCallback } from "react";
import confetti from "canvas-confetti";

export interface Wallet {
  id?: number;
  wallet?: string;
  image?: StaticImageData;
}

const HomePage = () => {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [eligibilityChecked, setIsEligibilityChecked] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<Wallet>({});

  const [showMessageForm, setShowMessageForm] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 560);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const x = event.clientX;
    const y = event.clientY;

    setClickPosition({ x, y });
    console.log("x", x, "y", y);

    if (!isMobile) {
      if (x > 980 && x<1150 && y > 300 && y < 450) {
        console.log("Opening Mint Modal");
        setIsMintModalOpen(true);
      } else if (x > 950 && x<1200 && y > 480 && y < 1000) {
        console.log("Opening Send Modal");
        setSendModalOpen(true);
      }
    } else {
      if (x > 250 && y > 200 && y > 370 && y < 450) {
        console.log("Opening Mint Modal on Mobile");
        setIsMintModalOpen(true);
      } else if (x > 240 && y > 500 && y < 780) {
        console.log("Opening Send Modal on Mobile");
        setSendModalOpen(true);
      }
    }

    console.log("x", x, "y", y);
  };

  const handleConnectWallet = () => {
    setConnectedWallet({
      id: 1,
      wallet: "PHANTOM",
      image: phantomWallet,
    });
  };

  const handleCheckEligibility = () => {
    setIsEligibilityChecked(true);
    // 50% chance eligible 50% for not
    const random = Math.random();
    console.log("Random", random);
    if (random > 0.5) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const handleMint = () => {
    setIsMinted(true);
    fireConfetti();
  };

  const handleSendMessage = () => {
    console.log("Sending Message");
    setShowMessageForm(true);
  };

  const handleGoBack = () => {
    setShowMessageForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target.from.value;
    const message = e.target.message.value;
    console.log("From", from, "Message", message);
    setIsMessageSent(true);
  };

  const handleCloseSendModal = () => {
    setSendModalOpen(false);
    setShowMessageForm(false);
    setIsMessageSent(false);
  };

  const handleCloseMintModal = () => {
    setIsMintModalOpen(false);
    setIsEligibilityChecked(false);
    setIsEligible(false);
    setIsMinted(false);
  };

  const wallet = "5OCJSHI54K8KJH75JGH6JQZQ";
  return (
    <div className="w-full min-h-screen relative shoulder-font">
      <Navbar
        wallet={wallet}
        connectedWallet={connectedWallet}
        setConnectedWallet={setConnectedWallet}
      />
      <div>
        <Image
          onClick={handleBackgroundClick}
          src={homeImg}
          alt="home"
          className="w-full h-screen object-cover object-[70%_50%] lg:object-right absolute"
        />
      </div>
      <div>
        <MintNFTModal isOpen={isMintModalOpen} onClose={handleCloseMintModal}>
          {!connectedWallet?.wallet && (
            <ModalCard onClose={handleCloseMintModal} image={connectWallet}>
              <button
                onClick={handleConnectWallet}
                className="absolute bottom-5 ml-6 w-full py-4 text-black font-semibold text-xl"
              >
                CONNECT WALLET
              </button>
            </ModalCard>
          )}
          {connectedWallet?.wallet && !eligibilityChecked && (
            <ModalCard onClose={handleCloseMintModal} image={connectWallet}>
              <button
                onClick={handleCheckEligibility}
                className="absolute bottom-5 ml-6 w-full py-4 text-black font-semibold text-xl"
              >
                CHECK ELIGIBILITY
              </button>
            </ModalCard>
          )}
          {connectedWallet?.wallet && eligibilityChecked && !isEligible && (
            <ModalCard onClose={handleCloseMintModal} image={notEligible}>
              <button>
                <Image
                  src={notEligibleBtn}
                  alt="not eligible"
                  className="absolute bottom-12 left-10 w-[232px] animate-grow"
                />
              </button>
            </ModalCard>
          )}
          {connectedWallet?.wallet && isEligible && !isMinted && (
            <ModalCard onClose={handleCloseMintModal} image={mintNow}>
              <button
                onClick={handleMint}
                className="absolute bottom-4 ml-6 w-full py-4 text-black font-semibold text-xl leading-4"
              >
                <p>MINT!</p>
                <p className="text-xs">YOU LEGEND</p>
              </button>
            </ModalCard>
          )}
          {connectedWallet?.wallet && isEligible && isMinted && (
            <ModalCard onClose={handleCloseMintModal} image={mintNow}>
              <button
                onClick={handleCloseMintModal}
                className="absolute bottom-4 ml-6 w-full py-4 text-black font-semibold text-xl leading-4"
              >
                <p>VIEW TRANSACTION</p>
                <p className="text-xs">WELCOME TO THE MANZANO FAMILY</p>
              </button>
            </ModalCard>
          )}
        </MintNFTModal>
        <MintNFTModal isOpen={sendModalOpen} onClose={handleCloseSendModal}>
          {sendModalOpen && (
            <div className={`relative w-[272px] overflow-hidden`}>
              <button
                onClick={handleCloseSendModal}
                className="bg-[#d3484b] text-black aspect-square rounded-full absolute top-3 right-3 w-6 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {!showMessageForm && (
                <Image
                  src={sendMessageBg}
                  alt="send message"
                  className="w-full"
                />
              )}
              <Image
                src={nft}
                alt="nft"
                className={`absolute h-[118px] top-14 transition-all duration-300 ${
                  !showMessageForm ? "left-2" : "-left-[100px]"
                } w-24 z-10`}
              />
              {!showMessageForm && (
                <button
                  onClick={handleSendMessage}
                  className={`absolute bottom-5 ml-6 w-full py-4 text-black font-semibold text-xl`}
                >
                  SEND A MESSAGE
                </button>
              )}
              <button
                onClick={handleGoBack}
                className={`bg-[#f6ff04] text-black aspect-square rounded-full absolute top-3 left-3 w-6 p-1 transition-all duration-300 ${
                  showMessageForm
                    ? "left-4 opacity-100"
                    : "left-[1000px] opacity-0"
                }`}
              >
                <Image alt="go back" src={goBack} />
              </button>
              {sendModalOpen && showMessageForm && !isMessageSent && (
                <>
                  <Image
                    src={sendMessage}
                    alt="send message"
                    className="w-full"
                  />
                  <form
                    onSubmit={handleSubmit}
                    className="absolute bottom-5 ml-5 w-full"
                  >
                    <div className="ml-4">
                      <textarea
                        name="message"
                        id="message"
                        className="w-44 h-16 rounded-xl bg-transparent focus:outline-none p-1"
                      ></textarea>
                      <input
                        type="text"
                        name="from"
                        className="w-44 mt-2.5 p-1 bg-transparent mb-3 rounded-xl focus:outline-none "
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={handleSendMessage}
                      className="w-full py-4 text-black font-semibold text-xl"
                    >
                      SEND
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          {sendModalOpen && showMessageForm && isMessageSent && (
            <ModalCard
              onClose={handleCloseSendModal}
              image={thanksMessage}
            ></ModalCard>
          )}
        </MintNFTModal>
      </div>
    </div>
  );
};

export default HomePage;
