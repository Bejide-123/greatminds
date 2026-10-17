import { TESTIMONIALS } from "@/lib/data";
import StarRating from "@/components/ui/StarRating";

export default function Testimonials() {
  return (
    <section className="w-full py-space-2xl bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-gutter-lg flex flex-col gap-space-xl">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Words from Our Families
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
            What Primary &amp; Nursery Parents Say
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Hear how our little learners flourish in reading fluency, polite
            manners, and joyful confidence every single morning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-surface-container-lowest p-space-lg rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between gap-space-md"
            >
              <div className="flex flex-col gap-space-sm">
                <StarRating />
                <p className="font-body-md text-body-md text-on-surface italic">
                  {t.quote}
                </p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${t.avatarBg} ${t.avatarColor}`}
                >
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-primary font-bold">
                    {t.name}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}