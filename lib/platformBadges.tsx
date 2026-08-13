import type { ReactNode } from "react";
import {
  SiWoo,
  SiShopify,
  SiQuickbooks,
  SiXero,
  SiAirtable,
} from "react-icons/si";
import { Platform } from "./data.type";

export type Badge = {
  icon: ReactNode;
  text: string;
  store: string;
  bg: string;
  href?: string;
};

export const platformBadges: Record<Platform, Badge> = {
  woocommerce: {
    icon: <SiWoo size={50} />,
    text: "INTEGRATES WITH",
    store: "WooCommerce",
    bg: "bg-[#96588A]",
  },
  shopify: {
    icon: <SiShopify size={50} />,
    text: "INTEGRATES WITH",
    store: "Shopify",
    bg: "bg-[#7AB55C]",
  },
  quickbooks: {
    icon: <SiQuickbooks size={50} />,
    text: "INTEGRATES WITH",
    store: "QuickBooks",
    bg: "bg-[#2CA01C]",
  },
  xero: {
    icon: <SiXero size={50} />,
    text: "INTEGRATES WITH",
    store: "Xero",
    bg: "bg-[#13B5EA]",
  },
  airtable: {
    icon: <SiAirtable size={50} />,
    text: "INTEGRATES WITH",
    store: "Airtable",
    bg: "bg-[#18BFFF]",
  },
};
