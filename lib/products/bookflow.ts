import type { Product } from "../data.type";
import { productStatuses } from "../data.type";
import { platformBadges } from "../platformBadges";

export const bookFlow = {
  id: "bookflow",
  name: "Book Flow",
  shortDescription:
    "Every WooCommerce order, refund, and payout synced to QuickBooks the moment it happens, as its own real document, matched down to the fee and the penny of tax.",
  fullDescription: `Most WooCommerce sync tools batch your orders into one summary entry per day. That's fine until a customer disputes a charge, a payout doesn't match what WooCommerce says you made, or your accountant asks where a number came from, and you're stuck opening a lump sum with a hundred orders buried inside it.

BookFlow syncs every order the moment it happens, as its own Sales Receipt or Invoice in QuickBooks, never as one aggregated entry. Refunds become their own Refund Receipt or Credit Memo, with tax handled correctly even on a partial refund, and the right payment method shown instead of a generic default. Every document carries the customer's real name, address, and email, the actual products and quantities, and a note pointing straight back to the WooCommerce order it came from, so if a number looks wrong you can trace it in seconds instead of digging through a spreadsheet at month end.

Payouts get the same treatment. When WooCommerce Payments sends you money, BookFlow records it as a real deposit with every linked order and fee itemized, chargebacks and reversals tracked separately with the right sign, and anything that doesn't add up flagged instead of hidden. An audit log in the WordPress admin shows what synced, what's pending, and exactly why anything didn't go through.

You control what gets synced and how. Set a minimum order amount, exclude a payment method or order status, or leave your own note text on what QuickBooks shows for a sale or a refund. Already have months of order history? Set a backfill date and BookFlow imports everything from that point forward through the same pipeline, not just new orders going ahead.

Setup is three steps: install the plugin, connect your QuickBooks account, and create a sync policy telling BookFlow what to sync and where. There's no chart of accounts to map by hand. BookFlow finds or creates the right QuickBooks items and accounts on its own as orders come in.

QuickBooks Online is supported today. Xero is built into the same architecture and is next.`,
  category: "plugin",
  platform: ["woocommerce", "quickbooks", "xero"],
  statusId: productStatuses.development.id,
  icon: "/products/bookflow/logo.png",
  accentColor: "#2563EB",
  version: "0.1.0",
  releaseDate: "----",
  pricing: {
    label: "Coming soon",
    kind: "coming-soon",
  },
  screenshots: [],
  features: [
    {
      title: "Syncs the moment an order happens",
      description:
        "No hourly or nightly batch. Orders, refunds, and payouts show up in QuickBooks as they occur, driven by WooCommerce webhooks.",
      icon: "zap",
    },
    {
      title: "One order, one document",
      description:
        "Every order becomes its own Sales Receipt or Invoice, and every refund its own Refund Receipt or Credit Memo. Nothing is folded into a summary entry you can't unpack.",
      icon: "file-search",
    },
    {
      title: "Refunds with the tax actually right",
      description:
        "A partial refund carries its fair share of tax automatically, even when WooCommerce itself didn't report a tax figure for it, instead of quietly showing up tax free.",
      icon: "receipt",
    },
    {
      title: "The real payment method, every time",
      description:
        "Sales, refunds, and payments show the customer's actual payment method on the document, not a generic default QuickBooks picked for you.",
      icon: "credit-card",
    },
    {
      title: "Payouts that reconcile themselves",
      description:
        "Every deposit is matched against what WooCommerce actually collected, with fees, chargebacks, and reversals broken out and anything unmatched flagged, not hidden.",
      icon: "refresh-ccw",
    },
    {
      title: "An audit log you can actually read",
      description:
        "See what's synced, what's pending, and the specific reason behind anything that didn't go through, right in your WordPress admin.",
      icon: "list-checks",
    },
    {
      title: "Rules for what should sync",
      description:
        "Skip orders under a set amount, exclude a payment method or order status, or leave your own note text on what QuickBooks shows. Pause a rule any time without losing it.",
      icon: "sliders-horizontal",
    },
    {
      title: "Brings your order history with it",
      description:
        "Set a start date and BookFlow imports everything from that point forward through the same sync pipeline, not just orders placed after you connect.",
      icon: "history",
    },
    {
      title: "Built to not lose an order under load",
      description:
        "A queue-based backend absorbs a flash sale's worth of orders and retries anything that fails on its own, so a busy day never means a missing document.",
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
