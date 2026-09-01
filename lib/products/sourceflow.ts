import type { Product } from "../data.type";
import { productStatuses } from "../data.type";
import { platformBadges } from "../platformBadges";

export const sourceFlow = {
  id: "sourceflow",
  name: "SourceFlow",
  shortDescription:
    "See which link, post, or campaign actually turned into revenue, inside WooCommerce, using your own order data. No Google Analytics, no tracking script, no cookie banner.",
  fullDescription: `Every WooCommerce store owner eventually asks the same question: of everything I do to bring people in, what actually made money? The honest answer is usually a shrug, because the tools that could tell you all have a catch.

WooCommerce has had native order attribution built in since version 8.5. It quietly records where each order came from, but the cookie behind it only lasts the browser session, so a click on Monday can't be credited to a purchase on Thursday. It has no idea what a trackable link is, it can't break revenue down by blog post, and the official Analytics extension is still single-currency and in beta. Google Analytics goes further, but it lives outside your store, gets blocked by ad blockers, and brings a consent banner with it. Shopify owners already pay for this kind of visibility because it plainly works. WooCommerce never had a proper version of it.

SourceFlow is that version, built as a real WooCommerce extension rather than a script you paste in. Make a trackable link for a campaign, an email, a podcast read, or a social bio, and SourceFlow follows it with a 30-day first-party cookie, long enough to credit a sale that lands days after the click. If the cookie is gone by checkout, because the shopper cleared it, switched devices, or their browser capped it, SourceFlow falls back to the last link that customer clicked while signed in, so the sale still gets credited to the right place instead of "Direct".

Open any link and you get the full picture: clicks over time, orders, revenue, conversion rate, and average order value, plus where the clicks came from by country, device, and browser, and the actual orders that link produced. Your best email and your worst social channel can bring in the same number of clicks and look nothing alike once you see the conversion rate next to them.

The Overview puts every channel side by side, SourceFlow links and WooCommerce's own attribution together, grouped by currency so a multi-currency store's numbers are never quietly added up. The Content tab takes the landing page WooCommerce already recorded against each order and resolves it back to the real blog post or product page that earned the sale, with nothing to install. The Customers tab shows repeat-purchase rate and the new-versus-returning split per source, because a channel that brings back loyal buyers is worth far more than one that brings one-time bargain hunters, even when this month's revenue looks identical. The Products tab shows what each channel actually sells, so you can match the offer to the audience.

When a SourceFlow link drives a sale that WooCommerce would have filed as "Direct", SourceFlow fills in WooCommerce's own Origin field too, so the native column, WooCommerce Analytics, and SourceFlow all agree instead of telling you three different stories.

All of it runs on WooCommerce's first-party order data. There is no external script slowing the storefront, no consent banner to manage, and no dependency on Google Analytics. It works correctly on stores using High-Performance Order Storage, captures attribution through both the classic checkout and the block checkout, and exports every report to CSV in one click. You control how long click data is kept, and you can wipe it whenever you want.`,
  category: "plugin",
  platform: ["woocommerce"],
  statusId: productStatuses.development.id,
  icon: "/products/sourceflow/logo.png",
  accentColor: "#C2410C",
  version: "0.1.0",
  releaseDate: "----",
  pricing: {
    label: "Coming soon",
    kind: "coming-soon",
  },
  screenshots: [
    "/products/sourceflow/bg-hero.png",
    "/products/sourceflow/screen-1.png",
    "/products/sourceflow/screen-2.png",
    "/products/sourceflow/screen-3.png",
    "/products/sourceflow/screen-4.png",
    "/products/sourceflow/screen-5.png",
    "/products/sourceflow/screen-6.png",
  ],
  features: [
    {
      title: "A 30-day window, not just a session",
      description:
        "Every trackable link carries a 30-day first-party cookie, so a click today still gets the credit when the order lands next week. WooCommerce's native attribution forgets the moment the browser session ends.",
      icon: "clock",
    },
    {
      title: "Credits the sale even when the cookie is gone",
      description:
        "If a shopper clears cookies, switches devices, or their browser caps the cookie early, SourceFlow falls back to the last link that customer clicked while signed in. The order still lands on the right source instead of Direct.",
      icon: "refresh-cw",
    },
    {
      title: "Every link, fully broken down",
      description:
        "Clicks over time, orders, revenue, conversion rate, and average order value for each link, plus the countries, devices, and browsers the clicks came from and the actual orders it produced.",
      icon: "link-2",
    },
    {
      title: "Revenue by channel, links and native together",
      description:
        "SourceFlow links and WooCommerce's own attribution (direct, organic, paid, referral) side by side, ranked by revenue, grouped by currency so multi-currency totals are never mixed.",
      icon: "trending-up",
    },
    {
      title: "Which post or page actually sells",
      description:
        "The landing page WooCommerce already records on every order, resolved back to the real blog post or product page behind it. See which piece of content quietly brings in paying customers, with nothing to add to your theme.",
      icon: "file-text",
    },
    {
      title: "Tell loyal channels from one-time ones",
      description:
        "Repeat-purchase rate and the new-versus-returning order split for every source, expandable to the individual customers behind the numbers. Two channels with the same revenue can be worth completely different amounts.",
      icon: "users",
    },
    {
      title: "Keeps WooCommerce's own Origin honest",
      description:
        "When a link drives a sale WooCommerce would have called Direct, SourceFlow fills in the native Origin field too, so WooCommerce Analytics and SourceFlow stop disagreeing. Turn it off with a filter if you would rather it didn't.",
      icon: "git-merge",
    },
    {
      title: "First-party, no banner, no third party",
      description:
        "Runs entirely on WooCommerce order data. No external tracking script, no cookie-consent banner, no Google Analytics account. Country lookup uses WooCommerce's own local geolocation and never leaves your server.",
      icon: "shield-check",
    },
    {
      title: "Built for current WooCommerce",
      description:
        "Works with High-Performance Order Storage, captures attribution through the classic checkout and the block checkout, and never touches orders except through HPOS-safe WooCommerce APIs.",
      icon: "layers",
    },
    {
      title: "Export the lot to CSV",
      description:
        "One click downloads every report as a bundled set of CSV files: orders, revenue by source, top pages, customer quality, and top products. Ready for a spreadsheet or an accountant.",
      icon: "download",
    },
  ],
  techStack: ["WooCommerce", "PHP", "React", "Vite", "MySQL", "WordPress REST API"],
  storeLinks: {
    woocommerce: platformBadges.woocommerce,
  },
  videoDemo: "/products/sourceflow/demo.mp4",
  testimonials: [],
  featured: true,
  glossary: {
    eyebrow: "Before you dive in",
    heading: "A FEW TERMS",
    headingAccent: "WORTH KNOWING",
    intro:
      "SourceFlow builds on WooCommerce's own attribution system, so a few terms are worth having straight before you look at the screenshots.",
    terms: [
      {
        term: "Native attribution",
        definition:
          "The source tracking WooCommerce has had built in since version 8.5. It works out of the box, but the cookie behind it only lasts one browser session and it has no concept of a trackable link.",
      },
      {
        term: "Trackable link",
        definition:
          "A short link you create in SourceFlow, of the form /sourceflow/your-slug, that points at any page on your store. Every click and every order it leads to is credited back to that exact link.",
      },
      {
        term: "Attribution window",
        definition:
          "How long a click stays credited to a visitor before it expires. SourceFlow uses a 30-day first-party cookie, well past WooCommerce's session-only default.",
      },
      {
        term: "Signed-in fallback",
        definition:
          "When the click cookie is missing at checkout but the shopper is logged in, SourceFlow credits the order to the last link that account clicked. It rescues attribution that a cleared cookie or a second device would otherwise lose.",
      },
      {
        term: "Landing page attribution",
        definition:
          "Taking the entry page WooCommerce already stored on an order and matching it back to the real WordPress post or product page, so revenue can be traced to actual content.",
      },
      {
        term: "Repeat-purchase rate",
        definition:
          "Of the customers a source first brought in, the share who came back and bought again from anywhere. A truer read on channel quality than revenue on its own.",
      },
      {
        term: "Native attribution sync",
        definition:
          "SourceFlow writing its link back into WooCommerce's own Origin field when WooCommerce would otherwise have recorded the sale as Direct, so the two never contradict each other.",
      },
      {
        term: "HPOS",
        definition:
          "WooCommerce's High-Performance Order Storage. Stores on it keep order data outside the standard posts table, which SourceFlow reads and writes correctly.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    heading: "FROM CLICK TO",
    headingAccent: "CREDITED SALE",
    intro:
      "Create a link, share it, and watch the clicks and the orders that follow line up against every other channel, all inside your WordPress admin.",
    steps: [
      {
        tag: "See every channel at once",
        title: "The Overview, in one screen",
        description:
          "Revenue, orders, average order value, and the share driven by trackable links up top. Below that, every source that produced a paid order this period, ranked by revenue, with your recent orders and top landing pages next to it. Change the date range and everything follows.",
        images: [
          {
            src: "/products/sourceflow/overview.png",
            width: 1760,
            height: 2313,
            alt: "SourceFlow Overview: revenue by source, recent orders, top pages",
          },
        ],
      },
      {
        tag: "Make a trackable link",
        title: "Name it, point it at a page, share it",
        description:
          "Give the link a name only you see, and point it at any page on your store by typing the path. Leave the destination empty and it goes to your home page. SourceFlow builds the short URL for you.",
        images: [
          {
            src: "/products/sourceflow/new-link.png",
            width: 1056,
            height: 1306,
            alt: "Creating a new trackable link",
          },
        ],
      },
      {
        tag: "Watch the links perform",
        title: "Clicks, orders, revenue, conversion, per link",
        description:
          "Every link with its click count, orders, revenue, and conversion rate, sortable by any column. The chart ranks them by revenue so the winners and the money pits are obvious at a glance.",
        images: [
          {
            src: "/products/sourceflow/links.png",
            width: 1760,
            height: 1831,
            alt: "The Links tab: trackable links ranked by revenue",
          },
        ],
      },
      {
        tag: "Open a link",
        title: "The full story behind one link",
        description:
          "Clicks over the last 30 days, the countries, devices, and browsers they came from, the conversion rate and average order value, and the actual orders that link produced, with customer names and dates.",
        images: [
          {
            src: "/products/sourceflow/link-detail.png",
            width: 1760,
            height: 2698,
            alt: "A single link's breakdown: clicks, countries, devices, browsers, orders",
          },
        ],
      },
      {
        tag: "Trace revenue to content",
        title: "Which blog post or page earned the sale",
        description:
          "SourceFlow takes the entry page WooCommerce already recorded on each order and resolves it to the real post or product behind it. See which article is quietly doing the selling, ranked by revenue.",
        images: [
          {
            src: "/products/sourceflow/content.png",
            width: 1760,
            height: 2899,
            alt: "Top pages by revenue, resolved from WooCommerce attribution data",
          },
        ],
      },
      {
        tag: "Judge channels on loyalty",
        title: "Who brings customers back",
        description:
          "Repeat-purchase rate and the new-versus-returning order split for every source, expandable to the individual customers, with how many orders and how much each has spent.",
        images: [
          {
            src: "/products/sourceflow/customers.png",
            width: 1760,
            height: 2201,
            alt: "Customer quality by source: repeat rate, new vs returning",
          },
        ],
      },
      {
        tag: "Match offer to audience",
        title: "What each channel actually sells",
        description:
          "The top products for every source, so the podcast audience and the Pinterest audience stop getting the same landing page when they clearly want different things.",
        images: [
          {
            src: "/products/sourceflow/products.png",
            width: 1760,
            height: 3581,
            alt: "Top products by source",
          },
        ],
      },
    ],
    closing: {
      title: "Your own order data, finally readable.",
      description:
        "No tracking script, no consent banner, no Analytics account. SourceFlow reads what WooCommerce already knows and shows you which marketing paid for itself.",
      badges: [
        "30-day first-party window",
        "Links and native side by side",
        "Revenue by post and page",
        "Repeat-rate by channel",
        "HPOS and block checkout",
      ],
    },
  },

} satisfies Product;
