"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import TourModal from "@/components/modals/TourModal";

export default function Header() {
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_2px_12px_rgba(15,37,74,0.06)] border-b border-surface-container">
        <TopBar />
        <Navbar onOpenTour={() => setIsTourOpen(true)} />
      </header>
      <TourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />
    </>
  );
}