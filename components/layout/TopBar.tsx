import { PartyPopper, Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-primary text-on-primary py-space-xs px-gutter-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-xs text-center md:text-left">
        <div className="flex items-center gap-space-sm">
          <PartyPopper className="text-secondary-fixed w-[18px] h-[18px]" />
          <p className="font-label-sm text-label-sm text-surface">
            Now Enrolling for 2026/2027 Session • TenderHearts, Kindergaten, Nursery &amp;
            Basic 1-6 • Fun Assessment Playdays Every Weekend!
          </p>
        </div>
        <div className="flex items-center gap-space-lg font-label-sm text-label-sm text-primary-fixed">
          <span className="flex items-center gap-space-xs">
            <Phone className="w-4 h-4" />
            +234 8028010867 / +234 802319338
          </span>
          <span className="flex items-center gap-space-xs">
            <Mail className="w-4 h-4" />
            greatmindintl@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}