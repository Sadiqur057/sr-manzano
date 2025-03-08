"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";
/*
const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
*/

import { BasicsView } from "../views";
import RiveBackground from "components/RiveBackground";
import { useState } from "react";
import Modal from "components/Modal";
import HomePage from "components/home";

const Home: NextPage = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleBackgroundClick = (x: number, y: number) => {
    console.log("Clicked at:", x, y);

    // Define specific X, Y ranges where the modal should appear
    if (x > 800 && x < 1000 && y > 800 && y < 1000) {
      setClickPosition({ x, y });
      setModalOpen(true);
    }
  };
  return (
    <main className="relative w-screen h-screen flex flex-col items-center justify-center">
      {/* Background Animation */}
      <HomePage />
      {/* <RiveBackground onClick={handleBackgroundClick} /> */}

      {/* Content */}
      {/* <div className="absolute z-10 text-center">
        <h1 className="text-white text-4xl font-bold mb-4">
          Interactive Website
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Open Modal
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold">You Clicked!</h2>
        <p className="text-gray-600 mt-2">
          Position: X = {clickPosition.x}, Y = {clickPosition.y}
        </p>
      </Modal> */}
    </main>
  );
};

export default Home;
