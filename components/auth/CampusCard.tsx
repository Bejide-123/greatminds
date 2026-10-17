import Image from "next/image";

const CAMPUS_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCn--MJTo6eHj_YBltNadHH_feuEADq3ASgcloay7Rrv2-i1fCscxWS4bvG1crTgFlR92r7B3DhRmILNY-XrceonuWuZ1HDiK-v2mPUs231wtiAkBoS8CLEiPpLWeTb2ZWUiaqWuQJb_ahy-XLY94PD2FwRGJ9fNsF1p0hfP2cZVHRhdRzEmfFNin2pVa5WJ17onyS742tld3VoU72H7_9k1m2RDemSnlYeh9JekyQ";

export default function CampusCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md">
      <div className="relative h-48 w-full bg-surface-container overflow-hidden">
        <Image
          src={CAMPUS_IMAGE}
          alt="A sunlit, prestigious international school library and campus courtyard with high architectural arches."
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-4">
          <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
            Campus Milestone
          </span>
          <p className="font-headline-sm text-headline-sm text-on-primary font-semibold leading-tight">
            Primary Academic Session 2024/2025 Primary Honors List &amp;
            Terminal Assessment
          </p>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Great Minds International Primary School delivers foundational
          British &amp; Nigerian primary curricular standards, nurturing young
          minds in literacy, numeracy, and character.
        </p>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-surface-container p-3 rounded-lg">
            <span className="font-label-sm text-label-sm text-outline block">
              Active Pupils Enrolled
            </span>
            <span className="font-headline-md text-headline-md text-primary font-bold">
              1,480+
            </span>
          </div>
          <div className="bg-surface-container p-3 rounded-lg">
            <span className="font-label-sm text-label-sm text-outline block">
              Terminal Pass Rate
            </span>
            <span className="font-headline-md text-headline-md text-secondary font-bold">
              98.4%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}