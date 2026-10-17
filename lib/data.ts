import type { NavItem, PortalItem, TrustBadge } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#", isActive: true },
  { label: "About Us", href: "#" },
  { label: "Nursery & Primary Curriculum", href: "#curriculum-section" },
  { label: "Admissions", href: "#admissions-journey" },
  { label: "Pupil Life", href: "#pupil-life" },
];

export const PORTAL_ITEMS: PortalItem[] = [
  { label: "Parent & Student Portal", href: "/auth", icon: "escalator" },
  { label: "Teacher & Staff Login", href: "/auth", icon: "badge" },
];

export const TRUST_BADGES: TrustBadge[] = [
  {
    value: "100%",
    label: "Common Entrance & Primary Checkpoint",
    color: "amber",
  },
  {
    value: "1 : 8",
    label: "Teacher-to-Pupil Loving Ratio",
    color: "blue",
  },
  {
    value: "Phonics & STEM",
    label: "Reading Fluency from Age 3 + Lego Coding",
    color: "emerald",
  },
  {
    value: "Safe & Loving",
    label: "CCTV Monitored & Nurturing Caregivers",
    color: "purple",
  },
];

export const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuANjs8VV2u41ktnJhQo9fpntW7UPsLu4AQEu16GjPwjB1R6S4N7VHxvolhikuHgjlicys2VFWLy6hWszrzi35C58qFTBDGSd8LxTBujB4_woofOcZQ9RdZqkW6oIWP4zsCqSAfq33myJlOGSTAwTIla3wtALEuJBSIovh0fO234OKW_jEZP1u_hQcCMpHLYg6Uc7mN3lpLk-idYOupQKoMzRhVIqsPtovKCVNgLCeM";

import type { Pillar, Stage, Facility, Testimonial } from "./types";

export const PILLARS: Pillar[] = [
  {
    icon: "extension",
    color: "amber",
    title: "EYFS & Montessori Play",
    description:
      "Sensory discovery, gross and fine motor skill stations, practical life exercises, and inquiry-led early learning through colorful educational manipulatives.",
    ctaLabel: "Discover early years play",
  },
  {
    icon: "book",
    color: "blue",
    title: "Jolly Phonics & Fluent Reading",
    description:
      "Systematic synthetic phonics instruction empowering young children to read fluently, write imaginatively, and recite expressive poetry by age 4.",
    ctaLabel: "Our literacy milestones",
  },
  {
    icon: "bot",
    color: "emerald",
    title: "Junior STEM & Coding",
    description:
      "Block-based coding with Scratch Jr., Lego WeDo robotics kits, simple science experiments, and fun mathematical puzzles built for young thinkers.",
    ctaLabel: "See kids STEM projects",
  },
  {
    icon: "heart",
    color: "orange",
    title: "Moral Values & Kindness",
    description:
      "Grounding every child in manners, emotional empathy, table etiquette, sharing, and honesty in a gentle, warm, and highly secure environment.",
    ctaLabel: "Pastoral care promise",
  },
];

export const STAGES: Stage[] = [
  {
    key: "creche",
    tabLabel: "Crèche & Toddlers (18mo – 3 yrs)",
    chipColor: "amber",
    chipIcon: "crib",
    chipLabel: "Ages 18 Months – 3 Years • Safe, Gentle Haven",
    title: "Crèche & Toddler Discovery Nest",
    description:
      "A serene, hygienic, and loving home away from home with certified pediatric nurses, sensory play centers, potty training guidance, and motor coordination activities.",
    bullets: [
      "Sensory & Tactile Discovery Hub",
      "Gentle Potty & Hygiene Routine",
      "Nursery Rhymes & Music Immersion",
      "Air-Purified Cozy Sleeping Pods",
    ],
    ctaLabel: "Download Crèche Handbook & Routine",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANjs8VV2u41ktnJhQo9fpntW7UPsLu4AQEu16GjPwjB1R6S4N7VHxvolhikuHgjlicys2VFWLy6hWszrzi35C58qFTBDGSd8LxTBujB4_woofOcZQ9RdZqkW6oIWP4zsCqSAfq33myJlOGSTAwTIla3wtALEuJBSIovh0fO234OKW_jEZP1u_hQcCMpHLYg6Uc7mN3lpLk-idYOupQKoMzRhVIqsPtovKCVNgLCeM",
    imageAlt:
      "Vibrant bright modern kindergarten classroom with young smiling multi-ethnic children engaged in playful sensory math games.",
    imageCaption: "Toddler Sensory & Math Blocks Studio",
    captionColor: "primary",
  },
  {
    key: "nursery",
    tabLabel: "Nursery & KG (Ages 3 – 5 yrs)",
    chipColor: "orange",
    chipIcon: "spellcheck",
    chipLabel: "Nursery 1 & 2 • Ages 3 – 5 Years • Phonics Immersion",
    title: "Nursery & Kindergarten (EYFS)",
    description:
      "Blending the British Early Years Foundation Stage (EYFS) with engaging hands-on Montessori activities. Children develop phonetic blending, early mental math, neat penmanship, and confident verbal expression.",
    bullets: [
      "Jolly Phonics (42 Core Letter Sounds)",
      "Early Numeracy & Shape Patterning",
      "French & Yoruba Conversational Play",
      "Creative Art, Drama & Water Play",
    ],
    ctaLabel: "Download Nursery Learning Scope",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASZVp0GBSsXdUt4srQNzlOoJFwq3PuoGO1iaLgJkv2ZtemYyUZomKhm9XUAd0nQYAEMgse9seSG4J_-i71YCVmESZCB-XdQloBYRyaw2TiAWe57vRsIby06II42q6e8Aj3l_NE38PePlXCh2z3-BSaSAmA5Xd7T1XZsbqPew5WCEkmWVT_HeW9b8Vz3lSb6F3D-nZLqz4wpKDtn4JWy5HksmBc8XSnPpiQk1MscCA",
    imageAlt:
      "Middle school students in crisp uniforms collaborating over a robotics engineering project.",
    imageCaption: "Hands-On Junior Science & Coding Table",
    captionColor: "secondary",
  },
  {
    key: "lower",
    tabLabel: "Lower Primary (Basic 1 – 3)",
    chipColor: "blue",
    chipIcon: "book",
    chipLabel: "Basic 1 – 3 • Ages 5 – 8 Years • Cambridge Primary",
    title: "Lower Primary (Key Stage 1)",
    description:
      "Solidifying essential literacy, critical math fluency, science exploration, and digital fluency. Pupils develop independent study habits, collaborative project work, and public speaking courage in morning assemblies.",
    bullets: [
      "Cambridge Primary English & Maths",
      "Science Experiments & Nature Walks",
      "Scratch Jr. Coding & Digital Literacy",
      "Junior Debating & Spelling Bee",
    ],
    ctaLabel: "Download Basic 1-3 Curriculum Guide",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsttvo5GT7C2nopjEViXOwk7_cJtThSrrFor_RwJkh3a2sC5Yjd3NeMHaDQJW_pyyK-jljknsbzcJzPUJCdZkurnC4Ib_dIg-oY8_KxyhChf9sIRIfAr5EHwGSqemfxBdzCyQHDixv5C49EuoibKxl5vkVHvI1OyS8eJlhAKUZf2qqrZu69vJc_szlN3kyR7VHW8KjtzQ_KdgUB_guRGTDpJelRuUY-M49ldJlvPs",
    imageAlt:
      "Senior secondary students in sharp blazers presenting a business case in a collegiate lecture theatre.",
    imageCaption: "Interactive Smartboard Presentation Classroom",
    captionColor: "primary",
  },
  {
    key: "upper",
    tabLabel: "Upper Primary (Basic 4 – 6)",
    chipColor: "emerald",
    chipIcon: "award",
    chipLabel: "Basic 4 – 6 • Ages 8 – 11 Years • Exam Distinction",
    title: "Upper Primary & Common Entrance Prep",
    description:
      "Our flagship transition program prepares pupils for 100% distinction in National Common Entrance Examinations and Cambridge Primary Checkpoints, gaining entry into Nigeria and the UK's finest secondary colleges.",
    bullets: [
      "Cambridge Primary Checkpoint Preparation",
      "National & State Common Entrance Coaching",
      "Quantitative & Verbal Reasoning Masterclasses",
      "Prefect Council & Junior Leadership Badges",
    ],
    ctaLabel: "Download Common Entrance Track Record",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdJmEWSy5HQCoWxlLio_XjhB565cSnP_dsKdCiVAy6pKXE40aFNtJA900_tnZbY-zP-EsNPZ89teU2Dp0B2-tQ65XhEdvWOk38T_3TW3U7WwQ4mNPKU6u3GepEBi7P5StJ9MfpjW_a8g1pC4iPsIGA8XSV6pqCuq1bKYK0eHzh6xFvQEQemIG3Rtf-yoeDKG6T4Fbi8tUrHwivnjnLWOW3czA2fs-90SSEHeU2MWw",
    imageAlt:
      "An articulate African high school student wearing a deep navy tailored school blazer with a rich orange silk tie.",
    imageCaption: "Pupil Library & Independent Study Nook",
    captionColor: "primary",
  },
];

export const FACILITIES: Facility[] = [
  {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3dGKgLhAak-xd4MmYruNih-LfvR08q9MGaAZMrBmkxnsL0rsDhlfFB5z5b3f6F4RHgEhqXRftIHzcYTGnQPVmKIL6WVOEKmYsF3Sgj9h-vL2mO4_1Lrje6ZYt0GjK8Fgdw1S58dNFk_kF43_I-8otDVpfEjxc9zuZY27R7kh7obGCtgrcv6XKXwSAarBVhVpa8Z0oDX3o3_wqJxIRMYSGNh1kFVuSQSFWIxzK6Y",
    imageAlt:
      "Olympic-standard school swimming pool with azure water and lanes.",
    chipLabel: "Junior Splash Pool & Playground",
    chipIcon: "waves",
    chipColor: "secondary",
    title: "Junior Splash Pool & Safe Playground",
    description:
      "Shallow heated training pool with certified lifeguards, rubber-cushioned playground slides, swings, and climbing frames for outdoor fun.",
  },
  {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOqdSSM7xyoC2SISrCSFiViKdWXhP-2AvfDIuC5a_u985E3CSpjq13u2NqnV0c6tlYGSigf-3Ho7m86dKGbkqG8DKoTDBJH224YeUM6O_Z4yaIlojIw2hvABDbgASzQv9MmjagCNKyJP7qFBALYe2qlDSp9oPO0DUNzfLA9v4w1X7JPBMrJooBH8MOEooH8oq32PPxtdKczuCOMU2RkuKtONQHRqPg5xXu223R0bw",
    imageAlt:
      "African student playing the violin in an acoustic auditorium alongside a school youth orchestra.",
    chipLabel: "Kids Music & Storytelling",
    chipIcon: "music",
    chipColor: "primary",
    title: "Little Mozart Music & Story Theatre",
    description:
      "Pupils discover the recorder, violin, piano, and African percussion while building eloquence in costume dramatics and storytelling circles.",
  },
  {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRBADhCZNLrejYmHsHpQnlFU6KIKIfoA6_ZhJl-CoFeGVZ_QlZ14FO-XWqHvmXg3BXSHZjk2Gcjv_4I07opw_zNbF8I2ZxkH2wdezU1l8DCbmU5SQb0Et08I66SYrDIl9u2WotTU8oSrhMdt1TRhDVQhyZhuu-gtPHmezSumEdO8xm0J1che_pp6Es5EBM3A-UNlk3ZwDPynHkVOyCV8rz9vTx4RX-PUcTZDnsaPE",
    imageAlt:
      "Pristine and cozy contemporary boarding school dorm lounge with comfortable study pods.",
    chipLabel: "Junior Lego STEM Suite",
    chipIcon: "bot",
    chipColor: "emerald",
    title: "Junior Library & Lego Robotics Lab",
    description:
      "Over 3,000 age-graded illustrated storybooks, reading tipis, touch-screen smart tables, and colorful Lego robotics construction sets.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "“Our son enrolled in Nursery 2 barely knowing his alphabet. Within just 4 months of their Jolly Phonics drills, he reads full bedtime storybooks to his sister and wakes up excited for school every morning!”",
    initials: "MA",
    avatarBg: "bg-secondary/15",
    avatarColor: "text-secondary",
    name: "Mrs. Morenike Adebayo",
    role: "Mother of Tiwa (Nursery 2 Pupil)",
  },
  {
    quote:
      "“The balance of Nigerian cultural values with the British Cambridge Primary curriculum is phenomenal. My daughter won the State Junior Spelling Bee and is already coding basic animations in Scratch!”",
    initials: "CE",
    avatarBg: "bg-primary/15",
    avatarColor: "text-primary",
    name: "Chief & Dr. (Mrs.) Eze",
    role: "Parents of Chidi (Basic 3 Scholar)",
  },
  {
    quote:
      "“The dedication of the Primary teachers during Common Entrance preparation is second to none. Both our older children scored top 1% marks and transitioned into top secondary colleges with total ease.”",
    initials: "FA",
    avatarBg: "bg-emerald-100",
    avatarColor: "text-emerald-800",
    name: "Engr. Femi Alabi",
    role: "Parent of Basic 5 & Alumni Scholar",
  },
];

import type { AdmissionStep, ClassOption } from "./types";

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    number: "01",
    color: "primary",
    title: "Campus Playday Tour",
    description:
      "Visit our colorful campus with your child, explore the classrooms, splash pool, and playground in an open relaxed atmosphere.",
    tagline: "Every Saturday & Weekdays",
    taglineColor: "secondary",
  },
  {
    number: "02",
    color: "secondary",
    title: "Informal Readiness Play",
    description:
      "Zero pressure! For Crèche & Nursery: sensory play observation. For Primary: friendly reading, numeracy & reasoning check.",
    tagline: "45-Minute Fun Session",
    taglineColor: "secondary",
  },
  {
    number: "03",
    color: "primary",
    title: "Parent & Headteacher Chat",
    description:
      "A warm conversation with our Head of Nursery & Primary to discuss your child's emotional development, diet, and learning goals.",
    tagline: "Personalized Care Plan",
    taglineColor: "secondary",
  },
  {
    number: "04",
    color: "emerald",
    title: "Welcome Pack & Induction",
    description:
      "Official enrollment letter, custom Great Minds uniform fitting, school bag & stationary kit, plus Buddy Day induction!",
    tagline: "Welcome to the Family!",
    taglineColor: "emerald",
  },
];

export const CLASS_OPTIONS: ClassOption[] = [
  { value: "creche", label: "Crèche & Toddlers (Ages 18mo – 3 yrs)" },
  { value: "nursery1", label: "Nursery 1 (Ages 3 – 4 yrs)" },
  { value: "nursery2", label: "Nursery 2 / Kindergarten (Ages 4 – 5 yrs)" },
  { value: "basic1", label: "Basic 1 / Grade 1 (Ages 5 – 6 yrs)" },
  { value: "basic2", label: "Basic 2 / Grade 2 (Ages 6 – 7 yrs)" },
  { value: "basic3", label: "Basic 3 / Grade 3 (Ages 7 – 8 yrs)" },
  { value: "basic4", label: "Basic 4 / Grade 4 (Ages 8 – 9 yrs)" },
  { value: "basic5", label: "Basic 5 / Grade 5 (Ages 9 – 10 yrs)" },
  {
    value: "basic6",
    label: "Basic 6 / Common Entrance Prep (Ages 10 – 11 yrs)",
  },
];