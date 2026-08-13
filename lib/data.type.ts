import {
  Lightbulb,
  Code2,
  Rocket,
  Archive,
  ClipboardCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "./platformBadges";
import { IconName } from "lucide-react/dynamic";

export type Platform =
  | "woocommerce"
  | "shopify"
  | "quickbooks"
  | "xero"
  | "airtable";

type ProductCategory =
//  | "tool"
  | "plugin"
 // | "extension"
  // | "integration"
  // | "saas";


type ProductStatusId =
  | "planning"
  | "development"
  | "review"
  | "live"
  | "deprecated";

type ProductStatus = {
  id: ProductStatusId;
  label: string;
  icon: LucideIcon;
  color: {
    text: string;
    bg: string;
    border: string;
  };
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
}; type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
};

type AppFeature = {
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

export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;

  category: ProductCategory;
  platform: Platform[];

  status: ProductStatus;

  icon: string;
  accentColor: string;

  version: string;
  releaseDate: string;

  price: string;

  screenshots: string[];

  features: AppFeature[];

  techStack: string[];

  storeLinks: Partial<Record<Platform, Badge>>;

  videoDemo?: string;

  testimonials: Testimonial[];

  featured: boolean;
};

type Category = {
  id: string;
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

  apps: Product[];

  categories: Category[];
};
