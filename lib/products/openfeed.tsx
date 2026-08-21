import type { Product } from "../data.type";
import { productStatuses } from "../data.type";
import type { Badge } from "../platformBadges";
import { Globe } from "lucide-react";

const openFeedBadge = {
  icon: <Globe size={50} />,
  text: "VISIT",
  store: "openfeed.ink",
  bg: "bg-[#059669]",
  href: "https://openfeed.ink",
} satisfies Badge;

export const openFeed = {
  id: "openfeed",
  name: "OpenFeed",
  shortDescription:
    "A feedback board, public roadmap, and changelog for your product, dropped in with one script tag, for a flat $15 a month with no per-user fees.",
  fullDescription: `Canny and Frill both start cheap and then charge you more the moment your product actually gets users, because their pricing scales with how many people show up to vote and comment. OpenFeed doesn't do that. It's one flat price no matter how many end users your board has, because the tool that helps you grow shouldn't get more expensive the more you succeed.

Under the hood it's the same three things every team ends up needing: a feedback board where users submit and upvote ideas, a public roadmap that shows what's planned, in progress, and shipped, and a changelog to announce it when it ships. All three live behind one embeddable widget, so instead of stitching together three separate tools and three separate logins, you drop in a script tag or an npm package and it's just there, styled to match your product instead of looking like a bolted-on iframe.

There's an AI Product Advisor built in that reads through your feedback and roadmap and helps you figure out what to prioritize next, instead of you scrolling through fifty upvoted requests trying to spot the pattern yourself. And because the whole thing is open source, you're never locked into paying for it. Self-host it for free and run it on your own infrastructure, or let us host it for $15 a month and skip the ops work. Either way, nothing about your data or your users depends on us staying in business.`,
  category: "saas",
  platform: ["web"],
  statusId: productStatuses.live.id,
  icon: "/products/openfeed/logo.png",
  accentColor: "#059669",
  version: "0.1.0",
  releaseDate: "2026-08-21",
  pricing: {
    label: "$15/mo, or free self-hosted",
    amount: 15,
    currency: "USD",
    kind: "paid",
  },
  screenshots: ["/products/openfeed/og-hero.jpg", "/products/openfeed/widget-builder.png"],
  features: [
    {
      title: "Feedback board that doesn't charge per voter",
      description:
        "Users submit and upvote ideas the way they would on Canny, except the bill doesn't grow with how many of them show up.",
      icon: "message-square",
    },
    {
      title: "A roadmap people actually check",
      description:
        "Planned, in progress, and shipped, laid out publicly so users stop asking 'is this ever happening' in your support inbox.",
      icon: "map",
    },
    {
      title: "Changelog that closes the loop",
      description:
        "Announce what shipped right where the request came from, so the people who asked for it actually see it landed.",
      icon: "megaphone",
    },
    {
      title: "An AI Advisor that reads the board for you",
      description:
        "Points at what's worth building next based on your actual feedback and roadmap, instead of you skimming fifty threads by hand.",
      icon: "sparkles",
    },
    {
      title: "One widget, not three separate tools",
      description:
        "Feedback, roadmap, and changelog live behind a single embed. Match it to your product's colors and fonts from the dashboard.",
      icon: "puzzle",
    },
    {
      title: "Open source, so you're never stuck",
      description:
        "Self-host it for free and own the whole stack, or pay $15 a month to skip the ops. The code is public either way.",
      icon: "unlock",
    },
  ],
  techStack: ["Next.js", "React", "Drizzle ORM", "PostgreSQL", "Tailwind CSS"],
  storeLinks: {
    web: openFeedBadge,
  },
  videoDemo: "",
  testimonials: [],
  featured: true,
} satisfies Product;
