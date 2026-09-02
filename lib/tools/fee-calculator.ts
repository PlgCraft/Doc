import type { Tool } from "../tools.type";

export const feeCalculator = {
  id: "shopify-woocommerce-fee-calculator",
  name: "Shopify & WooCommerce Payment Fee Calculator",
  shortDescription:
    "A free Shopify payment fee calculator and WooCommerce payment fee calculator in one: see your real processing costs and net payout, including the third-party surcharge Shopify adds when you skip Shopify Payments.",
  fullDescription: `Most fee calculators only show you the processor's headline rate, 2.9% + $0.30, and stop there. That's not what actually lands in your bank account.

If you run Shopify and use Stripe or PayPal instead of Shopify Payments, Shopify quietly adds its own "third-party payment provider" surcharge on top of the processor's fee, anywhere from 0.2% to 2% depending on your plan. It's disclosed in Shopify's pricing page, but it isn't shown anywhere in your checkout or payouts screen, so most merchants never notice it until they sit down and reconcile.

WooCommerce doesn't have an equivalent platform surcharge. Whatever your processor charges (Stripe, PayPal, or WooCommerce Payments) is the whole story.

This calculator plugs in your platform, plan, and processor, and gives you an effective fee percentage and estimated net payout, so you know roughly what should be hitting your deposit before you go looking for a missing few hundred dollars.`,
  category: "calculator",
  keywords: [
    "shopify payment fee calculator",
    "woocommerce payment fee calculator",
    "shopify vs stripe fees calculator",
    "shopify third party payment fee",
    "payment processing fee calculator",
    "shopify payments fees",
    "woocommerce payments fees",
    "net payout calculator",
  ],
  icon: "credit-card",
  accentColor: "#16A34A",
  statusId: "live",
  releaseDate: "2026-08-18",
  howItWorks: [
    {
      title: "Pick your platform and plan",
      description:
        "Choose Shopify or WooCommerce. For Shopify, pick your plan tier, Basic, Grow, Advanced, or Plus, since the surcharge and Shopify Payments rate both depend on it.",
    },
    {
      title: "Choose your payment processor",
      description:
        "Select Shopify Payments, Stripe, PayPal, or WooCommerce Payments. Only the processors relevant to your platform are shown.",
    },
    {
      title: "Enter your monthly volume and average order value",
      description:
        "These estimate your transaction count, since the flat $0.30-per-transaction fee adds up differently for a store with 100 orders versus 10,000.",
    },
    {
      title: "Read your effective rate and net payout",
      description:
        "See the full fee breakdown, processor fee, platform surcharge if any, and currency fees, plus the estimated amount that should hit your deposit.",
    },
  ],
  faqs: [
    {
      question: "What is Shopify's third-party payment provider surcharge?",
      answer:
        "If you use Shopify but process payments through Stripe, PayPal, or another processor instead of Shopify Payments, Shopify adds an extra fee on top of whatever that processor charges. It ranges from 2.0% on the Basic plan down to 0.2% on Plus. Switching to Shopify Payments removes it, but that isn't always the right call if you need a processor Shopify Payments doesn't support in your region.",
    },
    {
      question: "Why is PayPal exempt from the Shopify surcharge?",
      answer:
        "Shopify carves out PayPal specifically, it does not apply the third-party provider surcharge to PayPal transactions, even though PayPal is technically a third-party processor. Stripe and other gateways are not exempt.",
    },
    {
      question: "Does WooCommerce have anything similar?",
      answer:
        "No. WooCommerce is self-hosted, so there's no platform taking a cut on top of your processor. Whatever Stripe, PayPal, or WooCommerce Payments charges is the entire fee.",
    },
    {
      question: "Shopify Payments vs Stripe: which actually costs less?",
      answer:
        "On a Basic Shopify plan, Stripe effectively costs 2.9% + $0.30 plus a 2.0% surcharge, versus 2.9% + $0.30 flat on Shopify Payments, so Shopify Payments wins by 2 points. That gap shrinks fast as you move up plans: on Plus it's only a 0.2% difference. If you need a feature Shopify Payments doesn't support in your market, Stripe on a higher-tier plan may still make sense.",
    },
    {
      question: "Is this calculator exact to the penny?",
      answer:
        "No, and nothing that doesn't see your actual transaction-level data can be. Real rates vary by card type, negotiated volume discounts, chargebacks, and currency mix. Treat this as a fast estimate to sanity-check your numbers, not a substitute for your actual payout reports.",
    },
  ],
  featured: true,
} satisfies Tool;
