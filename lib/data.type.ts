import { Archive, ClipboardCheck, Code2, Lightbulb, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconName } from "lucide-react/dynamic";
import type { Badge } from "./platformBadges";

export const platforms = ["woocommerce", "shopify", "quickbooks", "xero", "airtable", "web"] as const;
export type Platform = (typeof platforms)[number];

export const productCategories = ["plugin", "saas"] as const;
export type ProductCategory = (typeof productCategories)[number];

export const productStatusIds = ["planning", "development", "review", "live", "deprecated"] as const;
export type ProductStatusId = (typeof productStatusIds)[number];

type StatusColors = {
  text: string;
  bg: string;
  border: string;
};

export type ProductStatus = {
  id: ProductStatusId;
  label: string;
  icon: LucideIcon;
  color: StatusColors;
};

export const productStatuses: Record<ProductStatusId, ProductStatus> = {
  planning: {
    id: "planning",
    label: "Planning",
    icon: Lightbulb,
    color: {
      text: "text-yellow-700",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
  },
  development: {
    id: "development",
    label: "In Development",
    icon: Code2,
    color: {
      text: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
  },
  review: {
    id: "review",
    label: "Under Review",
    icon: ClipboardCheck,
    color: {
      text: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
  },
  live: {
    id: "live",
    label: "Live",
    icon: Rocket,
    color: {
      text: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
    },
  },
  deprecated: {
    id: "deprecated",
    label: "Deprecated",
    icon: Archive,
    color: {
      text: "text-gray-700",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
};

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
};

export type AppFeature = {
  title: string;
  description: string;
  icon: IconName;
};

export type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  message: string;
};

export type ProductPricing = {
  label: string;
  amount?: number;
  currency?: string;
  kind?: "free" | "paid" | "coming-soon";
};

export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: ProductCategory;
  platform: readonly Platform[];
  statusId: ProductStatusId;
  icon: string;
  accentColor: string;
  version: string;
  releaseDate: string;
  pricing: ProductPricing;
  screenshots: readonly string[];
  features: readonly AppFeature[];
  techStack: readonly string[];
  storeLinks: Partial<Record<Platform, Badge>>;
  videoDemo?: string;
  testimonials: readonly Testimonial[];
  featured: boolean;
};

export type ProductListCategory = ProductCategory | "all";

export type Category = {
  id: ProductListCategory;
  name: string;
  icon: string;
};

export type AppData = {
  info: {
    name: string;
    title: string;
    email: string;
    tagline: string;
    sub: string;
    social: SocialLinks;
  };
  apps: readonly Product[];
  categories: readonly Category[];
};
