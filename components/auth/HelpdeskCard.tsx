import {
  Headphones,
  ReceiptText,
  Server,
  Globe,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const LINKS = [
  {
    href: "#bursary",
    icon: ReceiptText,
    title: "Bursary & Tuition Inquiries",
    subtitle: "Fee schedules & payment receipts",
    trailing: "chevron" as const,
  },
  {
    href: "#it-helpdesk",
    icon: Server,
    title: "IT Systems & Biometrics Desk",
    subtitle: "Portal access PIN resets & token sync",
    trailing: "chevron" as const,
  },
  {
    href: "#school-main",
    icon: Globe,
    title: "Back to Main School Website",
    subtitle: "Prospectus, news & admissions",
    trailing: "arrow" as const,
  },
];

export default function HelpdeskCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-3.5">
      <div className="flex items-center gap-2">
        <Headphones className="text-secondary w-[22px] h-[22px]" />
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          Institutional Helpdesk
        </h3>
      </div>
      <ul className="space-y-2.5">
        {LINKS.map(({ href, icon: Icon, title, subtitle, trailing }) => (
          <li key={href}>
            <a
              href={href}
              className="group flex items-center justify-between p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="text-primary w-5 h-5" />
                <div>
                  <span className="font-label-md text-label-md text-on-surface block group-hover:text-primary">
                    {title}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {subtitle}
                  </span>
                </div>
              </div>
              {trailing === "chevron" ? (
                <ChevronRight className="text-outline w-[18px] h-[18px]" />
              ) : (
                <ArrowUpRight className="text-outline w-[18px] h-[18px]" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}