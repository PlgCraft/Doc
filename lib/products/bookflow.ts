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

Setup is three steps: install the plugin, connect your QuickBooks account, and create a policy, which is just the rule that tells BookFlow what to sync and where. A policy always points at one destination and reacts to whichever events you turn on for it: new orders, updated orders, refunds, or payouts. Nothing syncs until a policy says so, and BookFlow won't let two policies fight over the same event for the same destination. There's no chart of accounts to map by hand either. BookFlow finds or creates the right QuickBooks items and accounts on its own as orders come in.

Once it's running, everything lives in three tabs inside your WordPress admin: Connections for your accounting platform, Policies for the rules you've set, and an Audit Log that shows every order's sync status, every discrepancy and chargeback on your payouts, and the reason behind anything that didn't go through.

QuickBooks Online is supported today. Xero is built into the same architecture and is next.`,
  category: "plugin",
  platform: ["woocommerce", "quickbooks"],
  statusId: productStatuses.development.id,
  icon: "/products/bookflow/logo.png",
  accentColor: "#2563EB",
  version: "0.1.0",
  releaseDate: "----",
  pricing: {
    label: "Coming soon",
    kind: "coming-soon",
  },
  screenshots: [
    "/products/bookflow/bg-hero.png",
    "/products/bookflow/step1-connect.png",
    "/products/bookflow/step2-platform.png",
    "/products/bookflow/step3-policy.png",
    "/products/bookflow/step3c-advanced.png",
    "/products/bookflow/step3d-advanced.png",
    "/products/bookflow/step4-orders.png",
    "/products/bookflow/step5-discrepancies.png",
    "/products/bookflow/step6-payouts.png",
  ],
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
  glossary: {
    eyebrow: "Before you dive in",
    heading: "A FEW TERMS",
    headingAccent: "WORTH KNOWING",
    intro:
      "BookFlow uses a handful of words a little differently than plain WooCommerce or plain QuickBooks do. Here's what each one actually means once, so the rest of this page (and the plugin itself) makes sense.",
    terms: [
      {
        term: "Policy",
        definition:
          "The rule that tells BookFlow what to sync and where. Every policy points at one destination and reacts to whichever events you've turned on for it. Nothing syncs without a policy behind it.",
      },
      {
        term: "Destination",
        definition:
          "Where a policy sends your data. QuickBooks Online works today. Xero is built the same way underneath and is coming next.",
      },
      {
        term: "Event",
        definition:
          "What a policy reacts to: order created, order updated, order refunded, or payout changed. Turn on only the ones you actually want synced.",
      },
      {
        term: "Sales Receipt vs. Invoice",
        definition:
          "BookFlow creates a Sales Receipt for an order that's already paid, or an Invoice for one that isn't yet. If that invoice gets paid later, BookFlow applies a payment to it instead of creating a second document.",
      },
      {
        term: "Refund Receipt vs. Credit Memo",
        definition:
          "A refund becomes a Refund Receipt if the original sale was a Sales Receipt, or a Credit Memo if it was a paid Invoice. If the invoice was never paid, the refund just reduces its balance directly.",
      },
      {
        term: "Discrepancy",
        definition:
          "A payout transaction BookFlow couldn't cleanly match to a WooCommerce order. It gets flagged with the specific reason instead of being silently dropped or guessed at.",
      },
      {
        term: "Chargeback",
        definition:
          "A dispute filed against an order. BookFlow tracks it as its own line with the money taken out, and tracks the reversal separately if the dispute is later won.",
      },
      {
        term: "Backfill",
        definition:
          "Importing order history from before you connected BookFlow. Set a start date on a policy and it pulls everything from that point forward through the same sync pipeline as a live order.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    heading: "FROM ORDER TO",
    headingAccent: "RECONCILED",
    intro:
      "Every sale, refund, and payout becomes a real, itemized QuickBooks document, linked back to its WooCommerce order, with every discrepancy and chargeback accounted for instead of buried in a batch summary.",
    steps: [
      {
        tag: "Connect your store",
        title: "One click, right inside WooCommerce",
        description:
          "BookFlow lives under the WooCommerce menu in your WordPress admin. Connect your store to BookFlow first, no API keys to copy, no separate dashboard to log into, then pick an accounting platform next.",
        images: [
          {
            src: "/products/bookflow/step1-connect.png",
            width: 1821,
            height: 838,
            alt: "Connecting BookFlow from the WooCommerce menu",
          },
        ],
      },
      {
        tag: "Pick your accounting platform",
        title: "QuickBooks today, Xero on the way",
        description:
          "Connect QuickBooks Online with your real credentials. No manual mapping required to get started.",
        images: [
          {
            src: "/products/bookflow/step2-platform.png",
            width: 1821,
            height: 838,
            alt: "Choosing QuickBooks Online or Xero as the accounting platform",
          },
        ],
      },
      {
        tag: "Set your sync policy",
        title: "A policy is just: this destination, these events",
        description:
          "Turn on the events this policy should react to (orders, refunds, payouts) and it starts working with sensible defaults. Open Advanced Settings when you want a backfill date, order exclusions, or your own memo text on what QuickBooks shows. None of it is required to get started.",
        images: [
          {
            src: "/products/bookflow/step3a-policy.png",
            width: 1832,
            height: 891,
            alt: "Creating a synchronization policy",
          },
          {
            src: "/products/bookflow/step3c-advanced.png",
            width: 1832,
            height: 891,
            alt: "Advanced filtering and memo overrides",
          },
          {
            src: "/products/bookflow/step3d-advanced.png",
            width: 1832,
            height: 891,
            alt: "Advanced filtering and memo overrides",
          },
        ],
      },
      {
        tag: "Watch it reconcile itself",
        title: "Every order, every reason, in one place",
        description:
          "A running count of synced, pending, excluded, and failed orders up top, then the full order list below with the specific reason behind anything that didn't sync clean, not just synced or failed.",
        images: [
          {
            src: "/products/bookflow/step4-orders.png",
            width: 535,
            height: 831,
            alt: "Order level audit log with sync status and reasons",
          },
        ],
      },
      {
        tag: "Nothing left unaccounted for",
        title: "Discrepancies and chargebacks, traced to the order",
        description:
          "Every order a payout touched shows up here, matched cleanly or not. Disputes, reversals, and unmatched transactions each carry their own reason and amount, traced straight back to the source order.",
        images: [
          {
            src: "/products/bookflow/step5-discrepancies.png",
            width: 518,
            height: 692,
            alt: "Discrepancies and chargebacks table",
          },
        ],
      },
      {
        tag: "Payouts, reconciled",
        title: "Every deposit, matched to its QuickBooks entry",
        description:
          "See every WooCommerce Payments payout next to the exact QuickBooks deposit it created, and what, if anything, is still unresolved.",
        images: [
          {
            src: "/products/bookflow/step6-payouts.png",
            width: 511,
            height: 570,
            alt: "Payouts reconciliation table",
          },
        ],
      },
    ],
    closing: {
      title: "Real documents. Real reasons. Always traceable.",
      description:
        "BookFlow doesn't summarize your sales into a lump entry at the end of the month. Every order becomes its own QuickBooks document, the moment it happens.",
      badges: ["Instant sync", "Per order documents", "Payout reconciliation", "Full audit trail"],
    },
  },
} satisfies Product;
