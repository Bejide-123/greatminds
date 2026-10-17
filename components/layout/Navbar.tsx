"use client";

import Image from "next/image"; // eslint-disable-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import {
  Baby,
  ChevronDown,
  Backpack,
  UserCog,
  BadgeCheck,
  UserCheck,
  ToyBrick,
  Star,
} from "lucide-react";
import { NAV_ITEMS, PORTAL_ITEMS } from "@/lib/data";
import Button from "@/components/ui/Button";

const PORTAL_ICONS = {
  backpack: Backpack,
  escalator: UserCog,
  badge: BadgeCheck,
} as const;

type NavbarProps = {
  onOpenTour: () => void;
};

export default function Navbar({ onOpenTour }: NavbarProps) {
  return (
    <div className="h-20 max-w-7xl mx-auto px-gutter-lg flex items-center justify-between">
      {/* Logo */}
      <Link href="#" className="flex items-center gap-space-md group">
        <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-on-primary shadow-md relative overflow-hidden group-hover:scale-105 transition-transform">
          <Baby className="w-[26px] h-[26px]" />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center text-[9px] text-white font-bold">
            <Star className="w-2.5 h-2.5 fill-white" />
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-primary leading-tight font-extrabold flex items-center gap-1.5">
            Greatminds{" "}
            {/* <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold uppercase tracking-wider">
              Junior
            </span> */}
          </span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
            International School
          </span>
          <span className="font-label-sm text-[10px] text-secondary font-semibold tracking-normal">
            Ages 18 Months – 11 Years • Lagos
          </span>
        </div>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-space-lg">
        {NAV_ITEMS.map((item) =>
          item.isActive ? (
            <a
              key={item.label}
              href={item.href}
              aria-current="page"
              className="transition-colors py-space-xs text-primary font-title-md border-b-2 border-secondary font-bold"
            >
              {item.label}
            </a>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors py-space-xs font-medium"
            >
              {item.label}
            </a>
          )
        )}

        {/* Portals dropdown */}
        <div className="relative group/portal">
          <button className="flex items-center gap-1 font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors py-space-xs font-medium">
            Portals
            <ChevronDown className="w-4 h-4 transition-transform group-hover/portal:rotate-180 group-focus-within/portal:rotate-180" />
          </button>
          <div className="absolute left-0 top-full z-50 hidden pt-2 group-hover/portal:block group-focus-within/portal:block">
            <div className="w-48 rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-2 shadow-xl">
              {PORTAL_ITEMS.map((p) => {
                const Icon = PORTAL_ICONS[p.icon];
                return (
                  <a
                    key={p.label}
                    href={p.href}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-surface-container text-body-sm text-primary font-medium"
                  >
                    <Icon
                      className={`w-[18px] h-[18px] ${
                        p.icon === "backpack" ? "text-secondary" : "text-primary"
                      }`}
                    />
                    {p.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Right CTAs */}
      <div className="flex items-center gap-space-md">
        <a
          href="#admissions-journey"
          className="inline-flex items-center gap-space-xs px-space-lg py-2 rounded-xl bg-secondary text-white hover:bg-orange-600 font-label-md text-label-md transition-all shadow-md shadow-secondary/20 hover:scale-105 active:scale-95"
        >
          <UserCheck className="w-[18px] h-[18px]" />
          Apply for Admission
        </a>
        <Button
          variant="ghost"
          onClick={onOpenTour}
          icon={<ToyBrick className="w-[18px] h-[18px] text-secondary" />}
          className="hidden sm:inline-flex"
        >
          Book Playday Tour
        </Button>
      </div>
    </div>
  );
}