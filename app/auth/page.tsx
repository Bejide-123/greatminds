import type { Metadata } from "next";
import AmbientBackdrop from "@/components/auth/AmbientBackdrop";
import AuthMasthead from "@/components/auth/AuthMasthead";
import AuthCard from "@/components/auth/AuthCard";
import SidePanels from "@/components/auth/SidePanels";
import AuthFooter from "@/components/auth/AuthFooter";

export const metadata: Metadata = {
  title: "Great Minds International School - Authentication",
  description:
    "Unified Primary School Portal • Centralized Management System for Pupils, Teachers & Institutional Governance",
};

export default function AuthPage() {
  return (
    <main className="w-full min-h-screen bg-surface">
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden bg-surface-container-lowest">
          <AmbientBackdrop />

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:py-12">
            <AuthMasthead />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
              <AuthCard />
              <SidePanels />
            </div>

            <AuthFooter />
          </div>
        </div>
      </div>
    </main>
  );
}