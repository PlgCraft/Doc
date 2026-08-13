import { Product, productStatuses, } from "../data.type";
import { platformBadges } from "../platformBadges";

export const bookFlow: Product = {
  id: "bookflow",
  name: "Book Flow",
  shortDescription:
    "Every WooCommerce order, synced to QuickBooks and Xero as a real transaction — not a batch summary you have to untangle later.",
  fullDescription:
    "If you've ever tried to reconcile a WooCommerce store against QuickBooks or Xero, you know the problem: most sync tools dump your orders in as one giant summary entry per day. Great for a glance, useless when a customer disputes a charge or your accountant asks \"where did this number come from?\"\n\nBookFlow does it differently. Every order, refund, fee, and payout gets synced as its own transaction, linked back to the exact WooCommerce order it came from. Open any line in QuickBooks or Xero and trace it straight to the source — no spreadsheets, no guessing, no end-of-month archaeology.\n\nIt runs in real time, so your books reflect what's happening in your store right now, not what happened three batch-syncs ago. Connect your store, map your accounts once, and BookFlow handles the rest — quietly, accurately, every time an order comes in.",
  category: "plugin",
  platform: [
    "woocommerce",
    "quickbooks",
    "xero"
  ],
  status: productStatuses['development'],
  icon: "🛠️",
  accentColor: "#2563EB",
  version: "0.1.0",
  releaseDate: "2026-08-05",
  price: "Coming soon",
  screenshots: [],
  features: [
    {
      title: "Real-Time Order Sync",
      description:
        "Orders land in QuickBooks or Xero the moment they happen in WooCommerce — no waiting on a nightly batch.",
      icon: "zap"
    },
    {
      title: "A Real Audit Trail",
      description:
        "Every synced transaction stays linked to its original order, so you can always trace a number back to where it came from.",
      icon: "file-search"
    },
    {
      title: "Reconciliation That Just Works",
      description:
        "Payouts, fees, refunds, and adjustments get matched automatically, so your books match reality without the manual cleanup.",
      icon: "refresh-ccw"
    },
    {
      title: "Numbers You Can Trust",
      description:
        "Taxes, discounts, shipping, and fees are recorded correctly the first time — no more end-of-month corrections.",
      icon: "receipt"
    },
    {
      title: "Set Up in Minutes",
      description:
        "A guided setup walks you through connecting your store and accounts — built for store owners, not just developers.",
      icon: "settings"
    },
    {
      title: "Built to Scale",
      description:
        "Whether you're processing 10 orders a day or 10,000, BookFlow's architecture keeps every sync accurate.",
      icon: "trending-up"
    }
  ],
  techStack: [
    "WooCommerce",
    "Go",
    "PostgreSQL",
    "QuickBooks API",
    "Xero API"
  ],
  storeLinks:{  woocommerce: platformBadges['woocommerce']},
  videoDemo: "",
  testimonials: [],
  featured: true
};
