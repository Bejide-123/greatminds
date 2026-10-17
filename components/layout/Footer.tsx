import { Baby, MapPin, Phone, Mail, Clock } from "lucide-react";

type FooterProps = {
  onOpenTour: () => void;
};

const ADMISSION_LINKS = [
  { label: "How to Enroll", href: "#admissions-journey" },
  { label: "Tuition & Feeding Fees", href: "#" },
  { label: "Book Saturday Playday", href: "#", action: "openTour" as const },
  { label: "Crèche Care Handbook", href: "#" },
  { label: "Primary Admissions FAQ", href: "#" },
];

const CURRICULUM_LINKS = [
  { label: "Early Years Foundation (EYFS)", href: "#curriculum-section" },
  { label: "Jolly Phonics & Literacy", href: "#curriculum-section" },
  { label: "Lower Primary (Basic 1-3)", href: "#curriculum-section" },
  { label: "Upper Primary (Basic 4-6)", href: "#curriculum-section" },
  { label: "Kids Playground & Splash Pool", href: "#pupil-life" },
];

export default function Footer({ onOpenTour }: FooterProps) {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface pt-space-2xl pb-space-xl border-t border-surface-container">
      <div className="max-w-7xl mx-auto px-gutter-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter-lg pb-space-2xl">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                <Baby className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  Great Minds Junior
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Nursery &amp; Primary School
                </span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Nurturing bright, joyful, and confident young thinkers from ages
              18 months to 11 years. Accredited British EYFS, Cambridge Primary
              Checkpoint, and Nigerian Basic Education Curriculum.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs flex-wrap">
              {["British EYFS", "Cambridge Primary", "Common Entrance 100%"].map(
                (b) => (
                  <span
                    key={b}
                    className="inline-flex items-center px-space-md py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold"
                  >
                    {b}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Admissions column */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              Primary Admissions
            </span>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm">
              {ADMISSION_LINKS.map((l) =>
                l.action === "openTour" ? (
                  <button
                    key={l.label}
                    onClick={onOpenTour}
                    className="text-left text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {l.label}
                  </button>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Curriculum column */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              Curriculum &amp; Play
            </span>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm">
              {CURRICULUM_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Visit column */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              Visit Campus
            </span>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <p className="flex items-start gap-space-xs">
                <MapPin className="w-[18px] h-[18px] text-primary shrink-0 mt-0.5" />
                17, Olarenwaju Oladunjoye street, off Ilo-Awela RD, Ota, Ogun State, Nigeria
              </p>
              <p className="flex items-center gap-space-xs">
                <Phone className="w-[18px] h-[18px] text-primary shrink-0" />
                +234 8028010867 / +234 802319338
              </p>
              <p className="flex items-center gap-space-xs">
                <Mail className="w-[18px] h-[18px] text-primary shrink-0" />
                greatmindintl@gmail.com
              </p>
              <p className="flex items-center gap-space-xs">
                <Clock className="w-[18px] h-[18px] text-primary shrink-0" />
                Mon – Fri: 7:00 AM – 5:30 PM (After-School Care)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-label-sm text-label-sm text-on-surface-variant border-t border-surface-container">
          <p>
            © 2025 Great Minds Nursery &amp; Primary School Lagos. All rights
            reserved.
          </p>
          <div className="flex items-center gap-space-lg flex-wrap justify-center">
            <a href="#" className="hover:text-primary transition-colors">
              Safeguarding &amp; Child Protection
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Parent Handbooks
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              School Bus Routes
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Parent Portal Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}