"use client";

import Image from "next/image";
import {
  Smile,
  CalendarDays,
  BookOpen,
  Brain,
  Palette,
} from "lucide-react";
import { HERO_IMAGE, TRUST_BADGES } from "@/lib/data";

const BADGE_COLOR: Record<string, string> = {
  amber: "bg-amber-50/70 border-amber-200/50 text-secondary",
  blue: "bg-blue-50/70 border-blue-200/50 text-primary",
  emerald: "bg-emerald-50/70 border-emerald-200/50 text-emerald-700",
  purple: "bg-purple-50/70 border-purple-200/50 text-purple-700",
};

type HeroProps = {
  onOpenTour: () => void;
};

export default function Hero({ onOpenTour }: HeroProps) {
  return (
    <section className="relative w-full bg-surface-container-lowest overflow-hidden pt-space-xl pb-space-2xl border-b border-surface-container">
      {/* Backdrop accents */}
      <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none animate-float-bubble" />
      <div className="absolute top-1/3 -left-16 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none animate-float-bubble-delayed" />

      <div className="max-w-7xl mx-auto px-gutter-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center relative z-10">
        {/* Left column */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <div className="inline-flex items-center gap-space-xs self-start px-space-md py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 font-label-md text-label-md shadow-sm">
            <Smile className="w-[18px] h-[18px] text-secondary" />
            <span>
              Dual British EYFS &amp; Nigerian Primary Curriculum • Ota, Ogun State, Nigeria.
            </span>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight font-extrabold tracking-tight">
              Where Bright Young Minds{" "}
              <span className="text-secondary underline decoration-amber-300 decoration-wavy decoration-2">
                Blossom
              </span>{" "}
              with Curiosity &amp; Joy!
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Welcome to Greatminds International School, Ota, Ogun State, Nigeria. A
              loving, joyful haven where little learners from 18 months to 11
              years master fluent early reading with Jolly Phonics, spark
              wonder with Lego STEM robotics, and grow into confident, kind
              young scholars.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <button
              onClick={onOpenTour}
              className="inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-2xl bg-secondary text-white font-title-md text-title-md shadow-lg shadow-secondary/30 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 font-bold"
            >
              <CalendarDays className="w-[22px] h-[22px]" />
              Book a Fun Campus Playday
            </button>
            <a
              href="#curriculum-section"
              className="inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-2xl bg-surface-container text-primary font-title-md text-title-md hover:bg-surface-container-high transition-all font-semibold border border-outline-variant/40"
            >
              <BookOpen className="w-[22px] h-[22px] text-secondary" />
              Explore Nursery &amp; Primary Tracks
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md pt-space-md">
            {TRUST_BADGES.map((b) => (
              <div
                key={b.value}
                className={`p-space-md rounded-2xl border shadow-sm flex flex-col ${BADGE_COLOR[b.color]}`}
              >
                <span className="font-headline-lg text-headline-lg font-extrabold">
                  {b.value}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-5 relative flex justify-center">
          {/* Floating award ribbon */}
          <div className="absolute -top-3 -left-3 z-20 bg-surface-container-lowest p-space-sm rounded-2xl shadow-xl border border-secondary/20 flex items-center gap-space-sm max-w-xs transition-transform hover:-translate-y-1">
            <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
              <Brain className="w-[26px] h-[26px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary font-bold">
                BRITISH EYFS &amp; CAMBRIDGE
              </span>
              <span className="font-title-md text-title-md text-primary font-bold">
                Primary Checkpoint School
              </span>
            </div>
          </div>

          {/* Hero image card */}
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-surface-container-high border-4 border-white">
            <Image
              src={HERO_IMAGE}
              loading="eager"
              alt="Vibrant bright modern kindergarten classroom with young smiling multi-ethnic children engaged in playful sensory math games with colorful counting blocks, supervised by an attentive African female teacher."
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />

            {/* Bottom floating badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-2xl shadow-lg border border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-9 h-9 rounded-xl bg-secondary text-white flex items-center justify-center font-bold">
                  <Palette className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <p className="font-title-md text-title-md text-primary font-bold">
                    Early Learners Playday
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Every Saturday • Free child discovery kit
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenTour}
                className="px-space-md py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors font-semibold"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}