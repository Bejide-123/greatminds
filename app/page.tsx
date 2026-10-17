"use client";

import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourModal from "@/components/modals/TourModal";
import AnnouncementRibbon from "@/components/sections/AnnouncementRibbon";
import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import AcademicStages from "@/components/sections/AcademicStages";
import CampusLife from "@/components/sections/CampusLife";
import Testimonials from "@/components/sections/Testimonials";
import AdmissionsJourney from "@/components/sections/AdmissionsJourney";
import FastInquiry from "@/components/sections/FastInquiry";

export default function Home() {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const openTour = () => setIsTourOpen(true);
  const closeTour = () => setIsTourOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_2px_12px_rgba(15,37,74,0.06)] border-b border-surface-container">
        <TopBar />
        <Navbar onOpenTour={openTour} />
      </header>

      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <AnnouncementRibbon />
          <Hero onOpenTour={openTour} />
          <Pillars />
          <AcademicStages onOpenTour={openTour} />
          <CampusLife />
          <Testimonials />
          <AdmissionsJourney onOpenTour={openTour} />
          <FastInquiry />
        </div>
      </main>

      <Footer onOpenTour={openTour} />

      <TourModal isOpen={isTourOpen} onClose={closeTour} />
    </>
  );
}