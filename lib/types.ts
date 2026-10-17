export type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

export type PortalItem = {
  label: string;
  href: string;
  icon: "backpack" | "escalator" | "badge";
};

export type TrustBadge = {
  value: string;
  label: string;
  color: "amber" | "blue" | "emerald" | "purple";
};

export type PillarColor =
  | "amber"
  | "blue"
  | "emerald"
  | "orange";

export type PillarIcon = "extension" | "book" | "bot" | "heart";

export type Pillar = {
  icon: PillarIcon;
  color: PillarColor;
  title: string;
  description: string;
  ctaLabel: string;
};

export type StageKey = "creche" | "nursery" | "lower" | "upper";

export type StageChipColor = "amber" | "orange" | "blue" | "emerald";

export type Stage = {
  key: StageKey;
  tabLabel: string;
  chipColor: StageChipColor;
  chipIcon: "crib" | "spellcheck" | "book" | "award";
  chipLabel: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  captionColor: "primary" | "secondary";
};

export type Facility = {
  imageSrc: string;
  imageAlt: string;
  chipLabel: string;
  chipIcon: "waves" | "music" | "bot";
  chipColor: "secondary" | "primary" | "emerald";
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  name: string;
  role: string;
};

export type StepColor = "primary" | "secondary" | "emerald";

export type AdmissionStep = {
  number: string;
  color: StepColor;
  title: string;
  description: string;
  tagline: string;
  taglineColor: "secondary" | "emerald";
};

export type ClassOption = {
  value: string;
  label: string;
};

export type FooterLink = {
  label: string;
  href: string;
  onClick?: "openTour";
};