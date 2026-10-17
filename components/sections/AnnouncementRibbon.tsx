import { Sun, ArrowRight } from "lucide-react";

export default function AnnouncementRibbon() {
  return (
    <section className="w-full bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary py-space-sm px-gutter-lg relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm text-body-sm font-body-sm">
        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-secondary text-white text-[11px] font-bold shadow-sm">
            <Sun className="w-[14px] h-[14px] mr-1" />
            2025/2026 Admissions
          </span>
          <span className="font-medium text-surface">
            Admissions ongoing for Toddler, Nursery 1-2, and Basic 1-6 • Fun
            Early Readiness Playdays Every Saturday!
          </span>
        </div>
        <div className="flex items-center gap-space-md text-surface-container-high">
          <a
            href="#fast-inquiry-box"
            className="hover:text-secondary-fixed transition-colors flex items-center gap-1 font-label-md text-label-md"
          >
            Book Assessment Playday
            <ArrowRight className="w-[15px] h-[15px]" />
          </a>
        </div>
      </div>
    </section>
  );
}