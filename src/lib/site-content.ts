import { cmsCollections } from "@/lib/cms-model";
import { safeSanityFetch } from "@/sanity/lib/client";
import { resolveSanityImageUrl, type SanityImageSource } from "@/sanity/lib/image";
import {
  faqItemsQuery,
  homePageQuery,
  projectBySlugQuery,
  projectsQuery,
  servicesQuery,
  siteSettingsQuery,
  teamQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";

export type Metric = {
  label: string;
  value: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  portrait?: SanityImageSource;
  portraitUrl?: string;
  portraitAlt?: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
  accent?: "blue" | "lime" | "amber";
};

export type ProjectMediaItem = {
  label: string;
  description: string;
  type?: "image" | "video";
  alt?: string;
  caption?: string;
  imageRole?: string;
  image?: SanityImageSource;
  poster?: SanityImageSource;
  imageUrl?: string;
  posterUrl?: string;
  videoUrl?: string;
};

export type CtaSettings = {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type Project = {
  slug: string;
  title: string;
  clientName?: string;
  projectType:
    | "Full Game"
    | "UGC Experience"
    | "Brand Activation"
    | "System / Feature"
    | "UI / UX"
    | "Live Ops";
  platform: "Roblox";
  genreTags: string[];
  serviceTags: string[];
  year: number;
  featured: boolean;
  coverImage?: SanityImageSource;
  coverImageUrl?: string;
  summary: string;
  challenge?: string;
  goals?: string[];
  outcomes?: string[];
  solution?: string;
  gameplayFeatures: string[];
  productionProcess: string[];
  resultsMetrics: ProjectMetric[];
  galleryMedia: ProjectMediaItem[];
  confidentialityNote?: string;
  palette: [string, string, string];
  headline: string;
  testimonialId?: string;
  cta?: CtaSettings;
  seo: {
    title: string;
    description: string;
  };
};

export type Service = {
  slug: string;
  category:
    | "Game Development"
    | "Live Ops / Content"
    | "Branded Experiences"
    | "Systems / UX"
    | "Technical Support";
  title: string;
  summary: string;
  outcomes: string[];
  timeline: string;
  engagementModel: string;
  idealFor: string;
  deliverables: string[];
  inquiryLabel?: string;
  featuredImage?: SanityImageSource;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  focus: string;
  portrait?: SanityImageSource;
  portraitUrl?: string;
  portraitAlt?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
  category: "General" | "Process" | "Contact";
};

export type SiteSettings = {
  studioName: string;
  tagline: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  primaryEmail: string;
  timezone: string;
  responseSla: string;
  socials: SocialLink[];
  proofChips: string[];
  heroMetrics: Metric[];
  navLinks: { label: string; href: string }[];
};

export type HomeOutcomeCard = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
};

export type HomeBuyerType = {
  title: string;
  body: string;
};

export type HomeProcessStep = {
  title: string;
  body: string;
};

export type HomePageContent = {
  heroBackgroundImage?: SanityImageSource;
  heroBackgroundImageUrl?: string;
  heroBackgroundImageAlt?: string;
  outcomeCards: HomeOutcomeCard[];
  buyerTypes: HomeBuyerType[];
  serviceOverview: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  resultsSection: {
    eyebrow: string;
    title: string;
    metrics: Metric[];
  };
  processSteps: HomeProcessStep[];
  studioSection: {
    eyebrow: string;
    title: string;
    body: string;
  };
  faqSection: {
    eyebrow: string;
    title: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

const siteSettings: SiteSettings = {
  studioName: "[REPLACE: Studio Name]",
  tagline: "[REPLACE: One-line positioning statement for your studio]",
  heroEyebrow: "Roblox production partner",
  heroHeadline: "[REPLACE: Hero headline that states your strongest offer]",
  heroDescription:
    "We help brands, agencies, and game teams ship Roblox launches, feature sprints, and live updates with tight scope control, readable UX, and production-safe execution. [REPLACE: Tailor this summary to match your studio specialty.]",
  primaryEmail: "[REPLACE: Contact Email]",
  timezone: "[REPLACE: Primary Timezone, e.g. EST / GMT+8]",
  responseSla: "[REPLACE: Response window, e.g. Replies within 24 hours]",
  socials: [
    { label: "Discord", href: "https://discord.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
  ],
  proofChips: [
    "[REPLACE: X+ projects shipped]",
    "[REPLACE: Top proof metric, e.g. 14M+ visits supported]",
    "Brands, agencies, and live-game teams",
    "[REPLACE: Trust signal, e.g. White-label delivery available]",
  ],
  heroMetrics: [
    {
      label: "Delivery fit",
      value: "Brand launches, execution support, and live ops",
    },
    {
      label: "Proof path",
      value: "Case studies, metrics, and process in the first scroll",
    },
    {
      label: "Availability",
      value: "[REPLACE: Current availability or start window]",
    },
  ],
  navLinks: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

const homePageContent: HomePageContent = {
  heroBackgroundImageAlt: "Cinematic Roblox environment placeholder",
  outcomeCards: [
    {
      eyebrow: "Offer",
      title: "See what the studio builds and how buyers engage.",
      body: "Start with the offer: launches, white-label execution, systems work, and support for teams that need Roblox production help.",
      href: "/services",
      label: "Review services",
    },
    {
      eyebrow: "Proof",
      title: "Get to proof before the long explanation.",
      body: "Move straight into case studies with outcomes, delivery role, and next-step context instead of generic showcase browsing.",
      href: "#featured-work",
      label: "See featured proof",
    },
    {
      eyebrow: "Inquiry",
      title: "Send a brief without losing momentum.",
      body: "The contact path stays visible, structured, and easy to complete whether a buyer is ready now or still qualifying fit.",
      href: "/contact",
      label: "Start inquiry",
    },
  ],
  buyerTypes: [
    {
      title: "Brand clients",
      body: "Need a Roblox experience that supports a campaign, launch, or activation without a messy production process.",
    },
    {
      title: "Agencies",
      body: "Need a reliable execution partner who can slot into your delivery plan and keep handoff clean.",
    },
    {
      title: "Game teams",
      body: "Need Roblox systems, UI, polish, or live support without spinning up a full internal team.",
    },
  ],
  serviceOverview: {
    eyebrow: "Services overview",
    title: "Built for teams hiring a production partner, not browsing for inspiration.",
    body:
      "This default homepage copy is intentionally direct: what the studio does, who it helps, how the work is delivered, and where the proof lives. Replace only the specifics that are unique to your studio.",
    points: [
      "Gameplay-first production before visual excess",
      "Readable milestones and visible scope control",
      "Player-facing UX, retention, and launch literacy",
      "Direct path to contact across the full journey",
    ],
  },
  resultsSection: {
    eyebrow: "Results and trust",
    title: "Show the outcome before the long explanation.",
    metrics: [
      { label: "Shipped engagements", value: "[REPLACE: 8+]" },
      { label: "Top performance metric", value: "[REPLACE: +18% / 12M+ / similar]" },
      { label: "Reply window", value: "[REPLACE: 24h]" },
    ],
  },
  processSteps: [
    {
      title: "Discovery",
      body: "Clarify audience, platform constraints, KPIs, and the smallest shippable scope.",
    },
    {
      title: "Pre-production",
      body: "Lock the loop, milestone plan, risk map, and visual / UX direction before expensive build-out.",
    },
    {
      title: "Production to live ops",
      body: "Ship, optimize, QA, and support launch with the same quality bar used in the build phase.",
    },
  ],
  studioSection: {
    eyebrow: "Studio credibility",
    title: "Visible roles, clear ownership, and credible delivery signals.",
    body:
      "Keep this section compact and practical. Buyers should be able to understand who owns delivery, how the work is run, and why the studio is safe to brief before they ever reach the contact form.",
  },
  faqSection: {
    eyebrow: "FAQ",
    title: "Remove buying friction before the brief.",
  },
  finalCta: {
    eyebrow: "Final CTA",
    title: 'Ready to move from "interesting" to "worth a call"?',
    primaryLabel: "Start a Project",
    primaryHref: "/contact",
    secondaryLabel: "View Work",
    secondaryHref: "/work",
  },
};

const testimonials: Testimonial[] = [
  {
    id: "placeholder-quote-1",
    quote:
      '"They kept the scope disciplined, surfaced risks early, and still gave us a polished launch that felt stronger than the original brief." [REPLACE: Testimonial Quote]',
    name: "[REPLACE: Client Name]",
    role: "[REPLACE: Client Role]",
    company: "[REPLACE: Client Company]",
  },
  {
    id: "placeholder-quote-2",
    quote:
      '"They fit into our delivery plan quickly, communicated like an execution partner, and made the handoff easy for our internal team." [REPLACE: Testimonial Quote]',
    name: "[REPLACE: Client Name]",
    role: "[REPLACE: Client Role]",
    company: "[REPLACE: Client Company]",
  },
  {
    id: "placeholder-quote-3",
    quote:
      '"The UX changes were immediately clearer to players, and the update shipped faster because the production path stayed organized." [REPLACE: Testimonial Quote]',
    name: "[REPLACE: Client Name]",
    role: "[REPLACE: Client Role]",
    company: "[REPLACE: Client Company]",
  },
];

const projects: Project[] = [
  {
    slug: "brand-launch-placeholder",
    title: "Brand Launch for [REPLACE: Client / Campaign]",
    clientName: "[REPLACE: Brand Client]",
    projectType: "Brand Activation",
    platform: "Roblox",
    genreTags: ["Social", "Event"],
    serviceTags: ["Full Production", "UI", "Live Ops"],
    year: 2026,
    featured: true,
    summary:
      "A campaign-led Roblox launch designed to turn awareness traffic into a stronger first session, clearer return hooks, and cleaner approval flow for stakeholders. [REPLACE: Project Summary]",
    challenge:
      "The client needed an experience that felt premium on-brand, loaded cleanly on mobile, and still stayed straightforward to approve under a fixed campaign timeline. [REPLACE: Challenge]",
    goals: [
      "Increase qualified first-session engagement during launch week. [REPLACE: Goal]",
      "Reduce friction across desktop and mobile entry points. [REPLACE: Goal]",
      "Give players a reason to return after the first traffic spike. [REPLACE: Goal]",
    ],
    solution:
      "We scoped the launch loop first, simplified the onboarding path, and built the experience around repeatable return hooks so the launch could do more than absorb a short campaign spike. [REPLACE: Solution]",
    gameplayFeatures: [
      "Campaign-aligned core gameplay loop",
      "Return mechanic or reward hook",
      "UI onboarding pass for first-session clarity",
      "Post-launch content or support layer",
    ],
    productionProcess: [
      "[Process Step: Discovery and scope alignment]",
      "[Process Step: Prototype or planning sprint]",
      "[Process Step: Production with milestone reviews]",
      "[Process Step: QA and optimization]",
      "[Process Step: Launch or post-launch support]",
    ],
    resultsMetrics: [
      { label: "[REPLACE: Launch engagement]", value: "[REPLACE: +22%]", accent: "blue" },
      { label: "[REPLACE: Session depth]", value: "[REPLACE: +14%]", accent: "lime" },
      { label: "[REPLACE: Return rate]", value: "[REPLACE: +9%]", accent: "amber" },
    ],
    galleryMedia: [
      {
        label: "[REPLACE: Key art / hero still]",
        description:
          "Use this slot for the first asset a prospect should see in the case study: key art, opening scene, or the strongest branded visual.",
        type: "image",
        alt: "[REPLACE: Alt text for hero still]",
      },
      {
        label: "[REPLACE: Gameplay clip or launch trailer]",
        description:
          "Use this slot for a short gameplay or walkthrough clip that shows the loop, pacing, or event trigger in motion.",
        type: "video",
        alt: "[REPLACE: Alt text for video poster]",
      },
      {
        label: "[REPLACE: UI / onboarding capture]",
        description:
          "Use this slot for the UI, onboarding, or player-flow screen that best explains why the launch was easier to read.",
        type: "image",
        alt: "[REPLACE: Alt text for UI capture]",
      },
    ],
    palette: ["#4cc9ff", "#101726", "#0b0f16"],
    headline:
      "Campaign traffic converted into a clearer first-session experience. [REPLACE: Headline]",
    testimonialId: "placeholder-quote-1",
    seo: {
      title: "Brand Launch for [REPLACE: Client] | [REPLACE: Studio Name]",
      description:
        "Branded Roblox launch case study covering scope, delivery role, gameplay flow, and measurable launch outcomes. [REPLACE: SEO Description]",
    },
  },
  {
    slug: "full-game-placeholder",
    title: "Full Game Build for [REPLACE: Game / IP]",
    clientName: "[REPLACE: Game Team]",
    projectType: "Full Game",
    platform: "Roblox",
    genreTags: ["Tycoon", "RPG"],
    serviceTags: ["Design", "Scripting", "Full Production"],
    year: 2026,
    featured: true,
    summary:
      "A full Roblox production engagement focused on shipping a repeatable core loop, readable progression, and a safer first-release scope. [REPLACE: Project Summary]",
    challenge:
      "The team needed a production partner who could protect the core loop, reduce scope creep, and still ship something that felt complete enough to learn from in market. [REPLACE: Challenge]",
    goals: [
      "Improve early progression clarity so players understand the loop faster. [REPLACE: Goal]",
      "Strengthen repeat-session motivation with better reward pacing. [REPLACE: Goal]",
      "Ship a release-safe scope that still feels complete to players. [REPLACE: Goal]",
    ],
    solution:
      "We structured the build around the repeatable player action first, then used UI, pacing, and feature prioritization to make the first release more stable and easier to expand. [REPLACE: Solution]",
    gameplayFeatures: [
      "Economy or progression system pass",
      "Core loop expansion and tuning",
      "Reward or retention hook design",
      "Post-launch balancing support",
    ],
    productionProcess: [
      "[Process Step: Audit and prioritization]",
      "[Process Step: Scope lock]",
      "[Process Step: Production and QA]",
      "[Process Step: Launch balancing and analytics]",
    ],
    resultsMetrics: [
      { label: "[REPLACE: Retention metric]", value: "[REPLACE: +18%]", accent: "lime" },
      { label: "[REPLACE: Session length]", value: "[REPLACE: +11%]", accent: "amber" },
      { label: "[REPLACE: Scope delivery]", value: "[REPLACE: On time]", accent: "blue" },
    ],
    galleryMedia: [
      {
        label: "[REPLACE: Systems map or feature plan]",
        description:
          "Use this slot for the clearest visual explanation of your systems thinking: flowchart, feature map, or game loop plan.",
        type: "image",
        alt: "[REPLACE: Alt text for systems map]",
      },
      {
        label: "[REPLACE: Gameplay flow clip]",
        description:
          "Use this slot for a short capture of the most important gameplay sequence, upgrade path, or player decision loop.",
        type: "video",
        alt: "[REPLACE: Alt text for gameplay clip poster]",
      },
      {
        label: "[REPLACE: HUD / UI capture]",
        description:
          "Use this slot for the interface, HUD, or progression view that best demonstrates why the game became easier to read.",
        type: "image",
        alt: "[REPLACE: Alt text for HUD capture]",
      },
    ],
    palette: ["#8b5cf6", "#1a1132", "#090a0d"],
    headline:
      "A first release shaped around retention, readability, and expansion headroom. [REPLACE: Headline]",
    testimonialId: "placeholder-quote-2",
    seo: {
      title: "Full Game Build for [REPLACE: Game] | [REPLACE: Studio Name]",
      description:
        "Full Roblox production case study covering scope control, core loop development, and first-release outcomes. [REPLACE: SEO Description]",
    },
  },
  {
    slug: "feature-sprint-placeholder",
    title: "Feature Sprint for [REPLACE: Live Game]",
    clientName: "[REPLACE: Product Team]",
    projectType: "System / Feature",
    platform: "Roblox",
    genreTags: ["Simulator", "Social"],
    serviceTags: ["UI", "Optimization", "Live Ops"],
    year: 2026,
    featured: true,
    summary:
      "A focused sprint to improve a high-value player flow, make the feature legible on mobile, and reduce friction around a specific conversion or retention moment. [REPLACE: Project Summary]",
    challenge:
      "The existing flow was doing too much at once: players missed the intended action, the interface was harder to use on mobile, and the live team needed something clearer to ship and support. [REPLACE: Challenge]",
    goals: [
      "Make the targeted flow legible on smaller screens. [REPLACE: Goal]",
      "Increase participation in the intended action or event. [REPLACE: Goal]",
      "Reduce support overhead by simplifying state logic and UX. [REPLACE: Goal]",
    ],
    solution:
      "We audited the friction points, simplified the decision path, and rebuilt the state logic around the one action players needed to understand first. [REPLACE: Solution]",
    gameplayFeatures: [
      "Control surface or UI system refresh",
      "Priority or state logic cleanup",
      "Mobile-first navigation pass",
      "Content or live-ops slotting support",
    ],
    productionProcess: [
      "[Process Step: Audit]",
      "[Process Step: UX iteration]",
      "[Process Step: Build and implementation]",
      "[Process Step: Post-launch review]",
    ],
    resultsMetrics: [
      { label: "[REPLACE: Adoption rate]", value: "[REPLACE: +27%]", accent: "blue" },
      { label: "[REPLACE: Tap-through / CTR]", value: "[REPLACE: +15%]", accent: "lime" },
      { label: "[REPLACE: Support reduction]", value: "[REPLACE: -30%]", accent: "amber" },
    ],
    galleryMedia: [
      {
        label: "[REPLACE: Before / after comparison]",
        description:
          "Use this slot for the clearest before-and-after visual showing how the interaction or screen changed.",
        type: "image",
        alt: "[REPLACE: Alt text for before / after comparison]",
      },
      {
        label: "[REPLACE: State logic or component library]",
        description:
          "Use this slot for the system view: state map, component library, or interface logic that made the feature easier to maintain.",
        type: "image",
        alt: "[REPLACE: Alt text for system view]",
      },
      {
        label: "[REPLACE: QA / rollout checklist]",
        description:
          "Use this slot for the rollout proof: QA notes, launch checklist, or implementation-ready handoff artifact.",
        type: "image",
        alt: "[REPLACE: Alt text for rollout artifact]",
      },
    ],
    palette: ["#b7ff4a", "#1c2412", "#0d1108"],
    headline:
      "A high-value player flow rebuilt for clarity, adoption, and easier rollout. [REPLACE: Headline]",
    testimonialId: "placeholder-quote-3",
    seo: {
      title: "Feature Sprint for [REPLACE: Game] | [REPLACE: Studio Name]",
      description:
        "Roblox feature sprint case study covering UX cleanup, implementation support, and measurable player-facing improvements. [REPLACE: SEO Description]",
    },
  },
  {
    slug: "live-ops-placeholder",
    title: "Live Ops Support for [REPLACE: Game / Event]",
    clientName: "[REPLACE: Creator or Studio]",
    projectType: "Live Ops",
    platform: "Roblox",
    genreTags: ["Obby", "Event"],
    serviceTags: ["Live Ops", "UI", "Optimization"],
    year: 2026,
    featured: false,
    summary:
      "A fast-turn support engagement covering event readiness, UI cleanup, and release protection when the internal team needed extra execution bandwidth. [REPLACE: Project Summary]",
    challenge:
      "The release window was tight, the player-facing flows had friction, and the team needed support without exposing internal details publicly. [REPLACE: Challenge]",
    goals: [
      "Improve event readiness inside a compressed production window. [REPLACE: Goal]",
      "Reduce friction in rewards, storefront, or return flows. [REPLACE: Goal]",
    ],
    solution:
      "We focused on the player-facing bottlenecks first, cleaned up release risk, and supported the launch path without expanding the public scope beyond what could be safely shared. [REPLACE: Solution]",
    gameplayFeatures: [
      "Seasonal or event loop support",
      "Reward or monetization pass",
      "Optimization and performance cleanup",
      "UI or storefront improvement",
    ],
    productionProcess: [
      "[Process Step: Performance audit]",
      "[Process Step: Gameplay or reward tuning]",
      "[Process Step: Asset or VFX cleanup]",
      "[Process Step: Release support]",
    ],
    resultsMetrics: [],
    galleryMedia: [],
    confidentialityNote:
      "Public metrics and media are intentionally limited for this engagement. Use this slot to explain what can be shared safely while still showing the kind of delivery support you provided. [REPLACE: Confidentiality Note]",
    palette: ["#ff8f5a", "#2a1510", "#110908"],
    headline:
      "Release support that reduced friction without expanding project risk. [REPLACE: Headline]",
    seo: {
      title: "Live Ops Support for [REPLACE: Game] | [REPLACE: Studio Name]",
      description:
        "Live ops support case study covering event readiness, optimization work, and NDA-safe delivery proof. [REPLACE: SEO Description]",
    },
  },
];

const services: Service[] = [
  {
    slug: "roblox-game-mvp",
    category: "Game Development",
    title: "Roblox MVP Build",
    summary:
      "From concept to first playable, this engagement is built to prove the core loop fast without losing control of scope, UX, or launch readiness.",
    outcomes: [
      "Reach a playable first release with a production-safe scope",
      "Clarify the core loop before full-scale build costs stack up",
      "Ship with a cleaner onboarding and UI foundation",
    ],
    timeline: "Typical: 6-10 weeks",
    engagementModel:
      "Fixed-scope MVP build with milestone reviews, a defined ship target, and clear scope control.",
    idealFor:
      "Founders, creators, or publishers validating a new Roblox concept before committing to a larger roadmap.",
    deliverables: [
      "Core loop scope",
      "Milestone plan",
      "UI foundation",
      "Launch QA",
    ],
    inquiryLabel: "Scope an MVP",
  },
  {
    slug: "branded-experiences",
    category: "Branded Experiences",
    title: "Branded Experience Build",
    summary:
      "A campaign-ready Roblox build shaped for launch timelines, brand approvals, and a player experience that still needs to hold attention after the first click.",
    outcomes: [
      "Turn campaign traffic into a stronger first-session experience",
      "Reduce launch risk with clearer scope and approvals",
      "Support replayability after the initial traffic spike",
    ],
    timeline: "Typical: 4-8 weeks",
    engagementModel:
      "Scoped launch build for brand teams or agency-led delivery with a clear approval path.",
    idealFor:
      "Brands and agencies that need a Roblox activation with reliable execution and fewer production surprises.",
    deliverables: [
      "Experience concept alignment",
      "Launch-ready build",
      "UI and player flow",
      "QA and delivery support",
    ],
    inquiryLabel: "Plan a launch",
  },
  {
    slug: "systems-and-features",
    category: "Systems / UX",
    title: "Systems / Features Sprint",
    summary:
      "A focused sprint for a single high-leverage feature, progression system, or UX flow that needs to become clearer, faster, or easier to ship.",
    outcomes: [
      "Improve player clarity around progression, rewards, or event flow",
      "Increase feature adoption with cleaner UX and state logic",
      "Reduce friction in high-value player actions",
    ],
    timeline: "Typical: 2-6 weeks",
    engagementModel:
      "Focused sprint for one feature, system, or UX flow with a clear start, finish, and rollout path.",
    idealFor:
      "Live games that need stronger progression, economy, retention, or UX systems without a full rebuild.",
    deliverables: [
      "Audit",
      "Feature design",
      "Implementation support",
      "Rollout checklist",
    ],
    inquiryLabel: "Plan a sprint",
  },
  {
    slug: "live-ops-support",
    category: "Live Ops / Content",
    title: "Live Ops Support",
    summary:
      "Ongoing support for event cadence, content drops, tuning, and release cleanup when your internal team needs more throughput without losing quality.",
    outcomes: [
      "Keep releases moving without breaking player trust",
      "Improve cadence for seasonal drops, events, and updates",
      "Reduce production drag on the core internal team",
    ],
    timeline: "Typical: Monthly retainer",
    engagementModel:
      "Ongoing support retainer or rolling update cadence tied to your release schedule.",
    idealFor: "Teams that need consistent support after launch without staffing every role in-house.",
    deliverables: [
      "Event cadence",
      "Balance tuning",
      "Release QA",
      "Performance review",
    ],
    inquiryLabel: "Discuss ongoing support",
  },
  {
    slug: "technical-support",
    category: "Technical Support",
    title: "Technical Production Support",
    summary:
      "Senior support for debugging, optimization, tooling, and technical cleanup when delivery is slowing down because the hard problems are stacking up.",
    outcomes: [
      "Remove blockers that are slowing release timelines",
      "Improve performance, stability, or maintainability in shipped builds",
      "Give production leads clearer technical visibility",
    ],
    timeline: "Typical: 1-4 weeks or advisory blocks",
    engagementModel:
      "Diagnostic sprint, cleanup pass, or embedded technical support for a defined technical risk area.",
    idealFor:
      "Teams that need senior support on performance, tooling, debugging, or handoff quality.",
    deliverables: [
      "Technical audit",
      "Bug or performance triage",
      "Implementation cleanup",
      "Risk and handoff notes",
    ],
    inquiryLabel: "Resolve blockers",
  },
];

const team: TeamMember[] = [
  {
    name: "[REPLACE: Studio Lead Name]",
    role: "Studio Lead / Production",
    bio:
      "Owns scope, milestones, and client communication from kickoff through handoff. [REPLACE: Add years of experience, shipped titles, or notable client work.]",
    skills: ["Production Planning", "Client Comms", "Scope Control", "Launch Delivery"],
    focus:
      "Keeps decisions visible, risks surfaced early, and delivery moving without surprises. [REPLACE: Add one trust signal.]",
  },
  {
    name: "[REPLACE: Technical Lead Name]",
    role: "Technical Designer",
    bio:
      "Shapes systems, progression logic, and implementation decisions so the build stays performant, readable, and easier to expand later. [REPLACE: Add a credibility note.]",
    skills: ["Systems Design", "Gameplay Logic", "Balance Tuning", "Optimization"],
    focus:
      "Turns complex requirements into production-safe systems the team can actually ship. [REPLACE: Add one trust signal.]",
  },
  {
    name: "[REPLACE: UI / UX Lead Name]",
    role: "UI / UX Designer",
    bio:
      "Focuses on player-facing clarity: onboarding, interface hierarchy, and the small decisions that make a Roblox experience feel easier to understand fast. [REPLACE: Add a credibility note.]",
    skills: ["UI Systems", "Player Flows", "Wireframes", "Visual Polish"],
    focus:
      "Helps players understand what to do next without friction, confusion, or visual noise. [REPLACE: Add one trust signal.]",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What types of Roblox work do you take on?",
    answer:
      "The studio can be positioned around new game builds, branded launches, live ops support, systems work, UI / UX cleanup, or technical production support. Replace the surrounding case studies and service pages with the mix that best reflects what you actually want to sell.",
    category: "General",
  },
  {
    question: "How do projects usually start?",
    answer:
      "Most engagements start with a short brief covering the goal, platform, timeline, and any hard constraints. From there, the next step is usually a scope review, milestone recommendation, or a short call if the project is a likely fit.",
    category: "Process",
  },
  {
    question: "What happens after I submit the brief?",
    answer:
      "The form confirms immediately on-page. If the project looks like a fit, the follow-up is typically an email reply, scope clarification, or a short call based on complexity and urgency.",
    category: "Contact",
  },
];

const projectTypeOptions = [
  "Full Game",
  "UGC Experience",
  "Brand Activation",
  "System / Feature",
  "UI / UX",
  "Live Ops",
] as const;

const serviceCategoryOptions = [
  "Game Development",
  "Live Ops / Content",
  "Branded Experiences",
  "Systems / UX",
  "Technical Support",
] as const;

const faqCategoryOptions = ["General", "Process", "Contact"] as const;
const SANITY_IMAGE_SIZES = {
  projectGallery: { width: 1600, quality: 76 } as const,
  projectCover: { width: 1440, quality: 74 } as const,
};

function sanitizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => sanitizeText(entry))
    .filter(Boolean);
}

function sanitizeMetricArray(value: unknown, fallback: Metric[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const metrics = value
    .map((entry) => {
      const label = sanitizeText((entry as { label?: unknown }).label);
      const metricValue = sanitizeText((entry as { value?: unknown }).value);

      if (!label || !metricValue) {
        return null;
      }

      return { label, value: metricValue };
    })
    .filter((entry): entry is Metric => entry !== null);

  return metrics.length > 0 ? metrics : fallback;
}

function sanitizeLinkArray(value: unknown, fallback: { label: string; href: string }[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const links = value
    .map((entry) => {
      const label = sanitizeText((entry as { label?: unknown }).label);
      const href = sanitizeText((entry as { href?: unknown }).href);

      if (!label || !href) {
        return null;
      }

      return { label, href };
    })
    .filter((entry): entry is { label: string; href: string } => entry !== null);

  return links.length > 0 ? links : fallback;
}

function isProjectType(value: string): value is Project["projectType"] {
  return (projectTypeOptions as readonly string[]).includes(value);
}

function isServiceCategory(value: string): value is Service["category"] {
  return (serviceCategoryOptions as readonly string[]).includes(value);
}

function isFaqCategory(value: string): value is FAQItem["category"] {
  return (faqCategoryOptions as readonly string[]).includes(value);
}

function normalizeSiteSettings(data: Partial<SiteSettings> | null | undefined): SiteSettings {
  if (!data) {
    return siteSettings;
  }

  return {
    studioName: sanitizeText(data.studioName) || siteSettings.studioName,
    tagline: sanitizeText(data.tagline) || siteSettings.tagline,
    heroEyebrow: sanitizeText(data.heroEyebrow) || siteSettings.heroEyebrow,
    heroHeadline: sanitizeText(data.heroHeadline) || siteSettings.heroHeadline,
    heroDescription: sanitizeText(data.heroDescription) || siteSettings.heroDescription,
    primaryEmail: sanitizeText(data.primaryEmail) || siteSettings.primaryEmail,
    timezone: sanitizeText(data.timezone) || siteSettings.timezone,
    responseSla: sanitizeText(data.responseSla) || siteSettings.responseSla,
    socials: sanitizeLinkArray(data.socials, siteSettings.socials),
    proofChips: sanitizeStringArray(data.proofChips).length > 0
      ? sanitizeStringArray(data.proofChips)
      : siteSettings.proofChips,
    heroMetrics: sanitizeMetricArray(data.heroMetrics, siteSettings.heroMetrics),
    navLinks: sanitizeLinkArray(data.navLinks, siteSettings.navLinks),
  };
}

function normalizeHomePageContent(data: Partial<HomePageContent> | null | undefined): HomePageContent {
  if (!data) {
    return homePageContent;
  }

  const outcomeCards = Array.isArray(data.outcomeCards)
    ? data.outcomeCards
        .map((card) => {
          const eyebrow = sanitizeText(card.eyebrow);
          const title = sanitizeText(card.title);
          const body = sanitizeText(card.body);
          const href = sanitizeText(card.href);
          const label = sanitizeText(card.label);

          if (!title || !href || !label) {
            return null;
          }

          return { eyebrow, title, body, href, label };
        })
        .filter((card): card is HomeOutcomeCard => card !== null)
    : [];

  const buyerTypes = Array.isArray(data.buyerTypes)
    ? data.buyerTypes
        .map((item) => {
          const title = sanitizeText(item.title);
          const body = sanitizeText(item.body);

          if (!title || !body) {
            return null;
          }

          return { title, body };
        })
        .filter((item): item is HomeBuyerType => item !== null)
    : [];

  const processSteps = Array.isArray(data.processSteps)
    ? data.processSteps
        .map((item) => {
          const title = sanitizeText(item.title);
          const body = sanitizeText(item.body);

          if (!title || !body) {
            return null;
          }

          return { title, body };
        })
        .filter((item): item is HomeProcessStep => item !== null)
    : [];

  return {
    heroBackgroundImage:
      typeof data.heroBackgroundImage === "object" && data.heroBackgroundImage
        ? data.heroBackgroundImage
        : homePageContent.heroBackgroundImage,
    heroBackgroundImageUrl:
      resolveSanityImageUrl(
        typeof data.heroBackgroundImage === "object" && data.heroBackgroundImage
          ? data.heroBackgroundImage
          : homePageContent.heroBackgroundImage,
        { width: 1600, quality: 74 },
      ) ||
      sanitizeText(data.heroBackgroundImageUrl) ||
      homePageContent.heroBackgroundImageUrl,
    heroBackgroundImageAlt:
      sanitizeText(data.heroBackgroundImageAlt) || homePageContent.heroBackgroundImageAlt,
    outcomeCards: outcomeCards.length > 0 ? outcomeCards : homePageContent.outcomeCards,
    buyerTypes: buyerTypes.length > 0 ? buyerTypes : homePageContent.buyerTypes,
    serviceOverview: {
      eyebrow:
        sanitizeText(data.serviceOverview?.eyebrow) || homePageContent.serviceOverview.eyebrow,
      title: sanitizeText(data.serviceOverview?.title) || homePageContent.serviceOverview.title,
      body: sanitizeText(data.serviceOverview?.body) || homePageContent.serviceOverview.body,
      points:
        sanitizeStringArray(data.serviceOverview?.points).length > 0
          ? sanitizeStringArray(data.serviceOverview?.points)
          : homePageContent.serviceOverview.points,
    },
    resultsSection: {
      eyebrow:
        sanitizeText(data.resultsSection?.eyebrow) || homePageContent.resultsSection.eyebrow,
      title: sanitizeText(data.resultsSection?.title) || homePageContent.resultsSection.title,
      metrics: sanitizeMetricArray(
        data.resultsSection?.metrics,
        homePageContent.resultsSection.metrics,
      ),
    },
    processSteps: processSteps.length > 0 ? processSteps : homePageContent.processSteps,
    studioSection: {
      eyebrow:
        sanitizeText(data.studioSection?.eyebrow) || homePageContent.studioSection.eyebrow,
      title: sanitizeText(data.studioSection?.title) || homePageContent.studioSection.title,
      body: sanitizeText(data.studioSection?.body) || homePageContent.studioSection.body,
    },
    faqSection: {
      eyebrow: sanitizeText(data.faqSection?.eyebrow) || homePageContent.faqSection.eyebrow,
      title: sanitizeText(data.faqSection?.title) || homePageContent.faqSection.title,
    },
    finalCta: {
      eyebrow: sanitizeText(data.finalCta?.eyebrow) || homePageContent.finalCta.eyebrow,
      title: sanitizeText(data.finalCta?.title) || homePageContent.finalCta.title,
      primaryLabel:
        sanitizeText(data.finalCta?.primaryLabel) || homePageContent.finalCta.primaryLabel,
      primaryHref:
        sanitizeText(data.finalCta?.primaryHref) || homePageContent.finalCta.primaryHref,
      secondaryLabel:
        sanitizeText(data.finalCta?.secondaryLabel) || homePageContent.finalCta.secondaryLabel,
      secondaryHref:
        sanitizeText(data.finalCta?.secondaryHref) || homePageContent.finalCta.secondaryHref,
    },
  };
}

function normalizeProjectMediaItem(
  item: Partial<ProjectMediaItem> | null | undefined,
  fallback?: ProjectMediaItem,
): ProjectMediaItem | null {
  const image =
    typeof item?.image === "object" && item?.image
      ? item.image
      : fallback?.image;
  const poster =
    typeof item?.poster === "object" && item?.poster
      ? item.poster
      : fallback?.poster;
  const label = sanitizeText(item?.label) || sanitizeText(fallback?.label);
  const description = sanitizeText(item?.description) || sanitizeText(fallback?.description);
  const imageUrl =
    resolveSanityImageUrl(image, SANITY_IMAGE_SIZES.projectGallery) ||
    sanitizeText(item?.imageUrl) ||
    sanitizeText(fallback?.imageUrl);
  const posterUrl =
    resolveSanityImageUrl(poster, SANITY_IMAGE_SIZES.projectGallery) ||
    sanitizeText(item?.posterUrl) ||
    sanitizeText(fallback?.posterUrl);
  const videoUrl = sanitizeText(item?.videoUrl);
  const type = sanitizeText(item?.type);

  if (!label && !description && !imageUrl && !posterUrl && !videoUrl) {
    return null;
  }

  return {
    label: label || (type === "video" ? "Video preview" : "Media preview"),
    description:
      description ||
      "Add a short note about what this image or video shows so buyers understand the proof quickly.",
    type: type === "video" ? "video" : "image",
    alt: sanitizeText(item?.alt),
    caption: sanitizeText(item?.caption) || sanitizeText(fallback?.caption),
    imageRole: sanitizeText(item?.imageRole) || sanitizeText(fallback?.imageRole),
    image,
    poster,
    imageUrl,
    posterUrl,
    videoUrl,
  };
}

function normalizeProjectMetric(
  metric: Partial<ProjectMetric> | null | undefined,
  fallback?: ProjectMetric,
): ProjectMetric | null {
  const label = sanitizeText(metric?.label) || sanitizeText(fallback?.label);
  const value = sanitizeText(metric?.value) || sanitizeText(fallback?.value);

  if (!label || !value) {
    return null;
  }

  const accent = sanitizeText(metric?.accent || fallback?.accent);

  return {
    label,
    value,
    accent:
      accent === "blue" || accent === "lime" || accent === "amber"
        ? accent
        : fallback?.accent,
  };
}

function normalizeProjectCta(
  value: Partial<CtaSettings> | null | undefined,
  fallback?: CtaSettings,
) {
  const primaryLabel = sanitizeText(value?.primaryLabel) || sanitizeText(fallback?.primaryLabel);
  const primaryHref = sanitizeText(value?.primaryHref) || sanitizeText(fallback?.primaryHref);
  const secondaryLabel =
    sanitizeText(value?.secondaryLabel) || sanitizeText(fallback?.secondaryLabel);
  const secondaryHref =
    sanitizeText(value?.secondaryHref) || sanitizeText(fallback?.secondaryHref);

  if (!primaryLabel && !primaryHref && !secondaryLabel && !secondaryHref) {
    return fallback;
  }

  return {
    primaryLabel: primaryLabel || fallback?.primaryLabel,
    primaryHref: primaryHref || fallback?.primaryHref,
    secondaryLabel: secondaryLabel || fallback?.secondaryLabel,
    secondaryHref: secondaryHref || fallback?.secondaryHref,
  };
}

function normalizeProject(
  data: Partial<Project> | null | undefined,
  fallback?: Project,
): Project | null {
  const slug = sanitizeText(data?.slug) || fallback?.slug;
  const title = sanitizeText(data?.title) || fallback?.title;

  if (!slug || !title) {
    return null;
  }

  const projectType = sanitizeText(data?.projectType);
  const coverImage =
    typeof data?.coverImage === "object" && data?.coverImage
      ? data.coverImage
      : fallback?.coverImage;
  const coverImageUrl =
    resolveSanityImageUrl(coverImage, SANITY_IMAGE_SIZES.projectCover) ||
    sanitizeText(data?.coverImageUrl) ||
    sanitizeText(fallback?.coverImageUrl);
  const projectMedia = Array.isArray(data?.galleryMedia)
    ? data?.galleryMedia
        .map((item, index) =>
          normalizeProjectMediaItem(item, fallback?.galleryMedia[index]),
        )
        .filter((item): item is ProjectMediaItem => item !== null)
    : fallback?.galleryMedia ?? [];

  const resultsMetrics = Array.isArray(data?.resultsMetrics)
    ? data?.resultsMetrics
        .map((metric, index) =>
          normalizeProjectMetric(metric, fallback?.resultsMetrics[index]),
        )
        .filter((metric): metric is ProjectMetric => metric !== null)
    : fallback?.resultsMetrics ?? [];

  const palette = Array.isArray(data?.palette) && data.palette.length === 3
    ? ([sanitizeText(data.palette[0]), sanitizeText(data.palette[1]), sanitizeText(data.palette[2])] as [
        string,
        string,
        string,
      ])
    : fallback?.palette ?? ["#4cc9ff", "#101726", "#0b0f16"];

  return {
    slug,
    title,
    clientName: sanitizeText(data?.clientName) || fallback?.clientName,
    projectType: isProjectType(projectType)
      ? projectType
      : fallback?.projectType ?? "System / Feature",
    platform: "Roblox",
    genreTags: sanitizeStringArray(data?.genreTags).length > 0
      ? sanitizeStringArray(data?.genreTags)
      : fallback?.genreTags ?? [],
    serviceTags: sanitizeStringArray(data?.serviceTags).length > 0
      ? sanitizeStringArray(data?.serviceTags)
      : fallback?.serviceTags ?? [],
    year:
      typeof data?.year === "number" && Number.isFinite(data.year)
        ? data.year
        : fallback?.year ?? new Date().getFullYear(),
    featured: typeof data?.featured === "boolean" ? data.featured : fallback?.featured ?? false,
    coverImage,
    coverImageUrl,
    summary: sanitizeText(data?.summary) || fallback?.summary || "",
    challenge: sanitizeText(data?.challenge) || fallback?.challenge,
    goals: sanitizeStringArray(data?.goals).length > 0
      ? sanitizeStringArray(data?.goals)
      : fallback?.goals,
    outcomes: sanitizeStringArray(data?.outcomes).length > 0
      ? sanitizeStringArray(data?.outcomes)
      : fallback?.outcomes,
    solution: sanitizeText(data?.solution) || fallback?.solution,
    gameplayFeatures: sanitizeStringArray(data?.gameplayFeatures).length > 0
      ? sanitizeStringArray(data?.gameplayFeatures)
      : fallback?.gameplayFeatures ?? [],
    productionProcess: sanitizeStringArray(data?.productionProcess).length > 0
      ? sanitizeStringArray(data?.productionProcess)
      : fallback?.productionProcess ?? [],
    resultsMetrics,
    galleryMedia: projectMedia,
    confidentialityNote:
      sanitizeText(data?.confidentialityNote) || fallback?.confidentialityNote,
    palette,
    headline: sanitizeText(data?.headline) || fallback?.headline || title,
    testimonialId: sanitizeText(data?.testimonialId) || fallback?.testimonialId,
    cta: normalizeProjectCta(data?.cta, fallback?.cta),
    seo: {
      title: sanitizeText(data?.seo?.title) || fallback?.seo.title || title,
      description:
        sanitizeText(data?.seo?.description) ||
        fallback?.seo.description ||
        sanitizeText(data?.summary) ||
        "",
    },
  };
}

function normalizeService(
  data: Partial<Service> | null | undefined,
  fallback?: Service,
): Service | null {
  const slug = sanitizeText(data?.slug) || fallback?.slug;
  const title = sanitizeText(data?.title) || fallback?.title;
  const category = sanitizeText(data?.category);

  if (!slug || !title) {
    return null;
  }

  return {
    slug,
    category: isServiceCategory(category)
      ? category
      : fallback?.category ?? "Systems / UX",
    title,
    summary: sanitizeText(data?.summary) || fallback?.summary || "",
    outcomes: sanitizeStringArray(data?.outcomes).length > 0
      ? sanitizeStringArray(data?.outcomes)
      : fallback?.outcomes ?? [],
    timeline: sanitizeText(data?.timeline) || fallback?.timeline || "",
    engagementModel:
      sanitizeText(data?.engagementModel) || fallback?.engagementModel || "",
    idealFor: sanitizeText(data?.idealFor) || fallback?.idealFor || "",
    deliverables: sanitizeStringArray(data?.deliverables).length > 0
      ? sanitizeStringArray(data?.deliverables)
      : fallback?.deliverables ?? [],
    inquiryLabel: sanitizeText(data?.inquiryLabel) || fallback?.inquiryLabel,
    featuredImage:
      typeof data?.featuredImage === "object" && data.featuredImage
        ? data.featuredImage
        : fallback?.featuredImage,
    featuredImageUrl:
      resolveSanityImageUrl(
        typeof data?.featuredImage === "object" && data.featuredImage
          ? data.featuredImage
          : fallback?.featuredImage,
        { width: 960, quality: 72 },
      ) ||
      sanitizeText(data?.featuredImageUrl) ||
      fallback?.featuredImageUrl,
    featuredImageAlt:
      sanitizeText(data?.featuredImageAlt) || fallback?.featuredImageAlt,
  };
}

function normalizeTeamMember(
  data: Partial<TeamMember> | null | undefined,
  fallback?: TeamMember,
): TeamMember | null {
  const name = sanitizeText(data?.name) || fallback?.name;
  const role = sanitizeText(data?.role) || fallback?.role;

  if (!name || !role) {
    return null;
  }

  return {
    name,
    role,
    bio: sanitizeText(data?.bio) || fallback?.bio || "",
    skills: sanitizeStringArray(data?.skills).length > 0
      ? sanitizeStringArray(data?.skills)
      : fallback?.skills ?? [],
    focus: sanitizeText(data?.focus) || fallback?.focus || "",
    portrait:
      typeof data?.portrait === "object" && data.portrait
        ? data.portrait
        : fallback?.portrait,
    portraitUrl:
      resolveSanityImageUrl(
        typeof data?.portrait === "object" && data.portrait
          ? data.portrait
          : fallback?.portrait,
        { width: 720, height: 900, quality: 74 },
      ) ||
      sanitizeText(data?.portraitUrl) ||
      fallback?.portraitUrl,
    portraitAlt: sanitizeText(data?.portraitAlt) || fallback?.portraitAlt,
  };
}

function normalizeTestimonial(
  data: Partial<Testimonial> & { _id?: string } | null | undefined,
  fallback?: Testimonial,
): Testimonial | null {
  const id = sanitizeText(data?._id) || sanitizeText(data?.id) || fallback?.id;
  const name = sanitizeText(data?.name) || fallback?.name;

  if (!id || !name) {
    return null;
  }

  return {
    id,
    quote: sanitizeText(data?.quote) || fallback?.quote || "",
    name,
    role: sanitizeText(data?.role) || fallback?.role || "",
    company: sanitizeText(data?.company) || fallback?.company || "",
    portrait:
      typeof data?.portrait === "object" && data.portrait
        ? data.portrait
        : fallback?.portrait,
    portraitUrl:
      resolveSanityImageUrl(
        typeof data?.portrait === "object" && data.portrait
          ? data.portrait
          : fallback?.portrait,
        { width: 360, height: 360, quality: 72 },
      ) ||
      sanitizeText(data?.portraitUrl) ||
      fallback?.portraitUrl,
    portraitAlt: sanitizeText(data?.portraitAlt) || fallback?.portraitAlt,
  };
}

function normalizeFaqItem(
  data: Partial<FAQItem> | null | undefined,
  fallback?: FAQItem,
): FAQItem | null {
  const question = sanitizeText(data?.question) || fallback?.question;
  const answer = sanitizeText(data?.answer) || fallback?.answer;
  const category = sanitizeText(data?.category);

  if (!question || !answer) {
    return null;
  }

  return {
    question,
    answer,
    category: isFaqCategory(category)
      ? category
      : fallback?.category ?? "General",
  };
}

export async function getSiteSettings() {
  const cmsSettings = await safeSanityFetch<Partial<SiteSettings>>(siteSettingsQuery);
  return normalizeSiteSettings(cmsSettings);
}

export async function getHomePageContent() {
  const cmsHomePage = await safeSanityFetch<Partial<HomePageContent>>(homePageQuery);
  return normalizeHomePageContent(cmsHomePage);
}

export async function getProjects() {
  const cmsProjects = await safeSanityFetch<Partial<Project>[]>(projectsQuery);

  if (!cmsProjects || cmsProjects.length === 0) {
    return projects;
  }

  const fallbackProjects = new Map(projects.map((project) => [project.slug, project]));
  const normalizedProjects = cmsProjects
    .map((project) =>
      normalizeProject(project, fallbackProjects.get(sanitizeText(project.slug))),
    )
    .filter((project): project is Project => project !== null);

  return normalizedProjects.length > 0 ? normalizedProjects : projects;
}

export async function getFeaturedProjects() {
  const allProjects = await getProjects();
  return allProjects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string) {
  const cmsProject = await safeSanityFetch<Partial<Project>>(projectBySlugQuery, { slug });

  if (cmsProject) {
    const normalizedProject = normalizeProject(
      cmsProject,
      projects.find((project) => project.slug === slug),
    );

    if (normalizedProject) {
      return normalizedProject;
    }
  }

  return projects.find((project) => project.slug === slug);
}

export async function getServices() {
  const cmsServices = await safeSanityFetch<Partial<Service>[]>(servicesQuery);

  if (!cmsServices || cmsServices.length === 0) {
    return services;
  }

  const fallbackServices = new Map(services.map((service) => [service.slug, service]));
  const normalizedServices = cmsServices
    .map((service) =>
      normalizeService(service, fallbackServices.get(sanitizeText(service.slug))),
    )
    .filter((service): service is Service => service !== null);

  return normalizedServices.length > 0 ? normalizedServices : services;
}

export async function getTeam() {
  const cmsTeam = await safeSanityFetch<Partial<TeamMember>[]>(teamQuery);

  if (!cmsTeam || cmsTeam.length === 0) {
    return team;
  }

  const normalizedTeam = cmsTeam
    .map((member, index) => normalizeTeamMember(member, team[index]))
    .filter((member): member is TeamMember => member !== null);

  return normalizedTeam.length > 0 ? normalizedTeam : team;
}

export async function getTestimonials() {
  const cmsTestimonials = await safeSanityFetch<(Partial<Testimonial> & { _id?: string })[]>(
    testimonialsQuery,
  );

  if (!cmsTestimonials || cmsTestimonials.length === 0) {
    return testimonials;
  }

  const normalizedTestimonials = cmsTestimonials
    .map((testimonial, index) => normalizeTestimonial(testimonial, testimonials[index]))
    .filter((testimonial): testimonial is Testimonial => testimonial !== null);

  return normalizedTestimonials.length > 0 ? normalizedTestimonials : testimonials;
}

export async function getFaqItems() {
  const cmsFaqItems = await safeSanityFetch<Partial<FAQItem>[]>(faqItemsQuery);

  if (!cmsFaqItems || cmsFaqItems.length === 0) {
    return faqItems;
  }

  const normalizedFaqItems = cmsFaqItems
    .map((item, index) => normalizeFaqItem(item, faqItems[index]))
    .filter((item): item is FAQItem => item !== null);

  return normalizedFaqItems.length > 0 ? normalizedFaqItems : faqItems;
}

export async function getStudioSnapshot() {
  const [settings, homepage, portfolioProjects, serviceList, teamMembers, quotes, questions] =
    await Promise.all([
      getSiteSettings(),
      getHomePageContent(),
      getProjects(),
      getServices(),
      getTeam(),
      getTestimonials(),
      getFaqItems(),
    ]);

  return {
    settings,
    homepage,
    projects: portfolioProjects,
    services: serviceList,
    team: teamMembers,
    testimonials: quotes,
    faqItems: questions,
    cmsCollections,
  };
}
