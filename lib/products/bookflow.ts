import type { Product } from "../data.type";
import { productStatuses } from "../data.type";
import { platformBadges } from "../platformBadges";

export const bookFlow = {
  id: "bookflow",
  name: "Book Flow",
  shortDescription:
    "Every WooCommerce order synced to QuickBooks or Xero as its own real transaction, matched to the actual payout, down to the fee and the penny of tax.",
  fullDescription: `Most WooCommerce sync tools batch your orders into one summary entry per day. That's fine until a customer disputes a charge, a payout doesn't match what WooCommerce says you made, or your accountant asks where a number came from, and you're stuck opening a lump sum with a hundred orders buried inside it.

BookFlow syncs every order the moment it happens, as its own Sales Receipt, Invoice, Refund Receipt, or Credit Memo in QuickBooks or Xero, never as an aggregated journal entry. Each document links straight back to the WooCommerce order it came from, so if something looks off, you can trace it in seconds instead of digging through a spreadsheet at month end.

Payouts get the same treatment. When Stripe, PayPal, or WooCommerce Payments sends you money, BookFlow records it as a real deposit with fees and chargebacks itemized, and flags anything that doesn't reconcile against what WooCommerce actually collected. Tax is recorded exactly as WooCommerce calculated it, so your tax liability reports tie out without manual adjustments.

Setup takes one pass through a guided wizard that maps your chart of accounts automatically. You can adjust any mapping by hand if your books need it, but you don't have to touch a single field to get started.`,
  category: "plugin",
  platform: ["woocommerce", "quickbooks", "xero"],
  statusId: productStatuses.development.id,
  icon: "🛠️",
  accentColor: "#2563EB",
  version: "0.1.0",
  releaseDate: "2026-08-05",
  pricing: {
    label: "Coming soon",
    kind: "coming-soon",
  },
  screenshots: [],
  features: [
    {
      title: "Syncs the moment an order happens",
      description:
        "No hourly or nightly batch. Orders, refunds, and payouts show up in QuickBooks or Xero as they occur, driven by WooCommerce webhooks.",
      icon: "zap",
    },
    {
      title: "One order, one document",
      description:
        "Every order becomes its own Sales Receipt, Invoice, Refund Receipt, or Credit Memo, never folded into a summary entry you can't unpack.",
      icon: "file-search",
    },
    {
      title: "Payouts that reconcile themselves",
      description:
        "Every deposit is matched against what WooCommerce says was collected, with fees and chargebacks broken out and mismatches flagged automatically.",
      icon: "refresh-ccw",
    },
    {
      title: "Tax that ties out",
      description:
        "Records the exact tax WooCommerce, WooCommerce Tax, or Avalara collected on each order, so your tax reports don't need a manual fix afterward.",
      icon: "receipt",
    },
    {
      title: "Set up without an accountant",
      description:
        "A guided wizard connects your store and auto-maps your chart of accounts. Manual overrides are there if you need them, not required if you don't.",
      icon: "settings",
    },
    {
      title: "Handles a flash sale without dropping orders",
      description:
        "A queue-based backend absorbs order spikes and retries failed syncs on its own, so nothing gets lost when volume jumps.",
      icon: "trending-up",
    },
  ],
  techStack: ["WooCommerce", "Go", "PostgreSQL", "QuickBooks API", "Xero API"],
  storeLinks: {
    woocommerce: platformBadges.woocommerce,
  },
  videoDemo: "",
  testimonials: [],
  featured: true,
} satisfies Product;
