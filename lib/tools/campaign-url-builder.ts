import type { Tool } from "../tools.type";

export const campaignUrlBuilder = {
  id: "campaign-url-builder",
  name: "Campaign URL Builder for WooCommerce & Google Ads",
  shortDescription:
    "Build a properly tagged campaign link so WooCommerce can tell your traffic sources apart, instead of flattening every Google Ads order into one generic google_cpc label.",
  fullDescription: `Most stores tag a handful of links by hand, get the format slightly wrong, and end up with reports that can't actually separate one campaign from another.

This builder appends the five standard UTM parameters (source, medium, campaign, term, and content) to any destination URL, with live validation so you can't accidentally ship a link missing a required field.

Turn on "Auto-fill for Google Ads" and Campaign, Term, and Content switch to Google Ads' own ValueTrack placeholders instead of text you'd type once and forget to update. Google replaces those placeholders with the real campaign ID, keyword, and ad group the moment someone clicks the ad, so every link stays accurate without any manual upkeep per campaign.`,
  category: "generator",
  keywords: [
    "utm builder",
    "campaign url builder",
    "google ads utm parameters",
    "woocommerce utm tracking",
    "utm_source utm_medium utm_campaign",
    "google ads valuetrack",
    "google ads url builder",
    "campaign tracking url generator",
  ],
  icon: "link-2",
  accentColor: "#2A52D6",
  statusId: "live",
  releaseDate: "2026-09-02",
  howItWorks: [
    {
      title: "Paste your destination URL",
      description:
        "The page you're sending traffic to, your homepage, a product, or a landing page built for this campaign.",
    },
    {
      title: "Fill in Source, Medium, and Campaign",
      description:
        "The three required parameters. Source is where the click came from, Medium is the traffic type, Campaign is the specific initiative this link belongs to.",
    },
    {
      title: "Turn on auto-fill for Google Ads (optional)",
      description:
        "Swaps Campaign, Term, and Content for Google Ads' own ValueTrack placeholders, so they populate with your real campaign ID, keyword, and ad group automatically at click time.",
    },
    {
      title: "Copy the tagged link",
      description:
        "Use it in your ad, email, or social post. WooCommerce (with a UTM-aware plugin like SourceFlow) can now attribute the resulting order to this exact campaign.",
    },
  ],
  faqs: [
    {
      question: "What's the difference between Source, Medium, and Campaign?",
      answer:
        "Source is where the click came from (google, facebook, newsletter), Medium is the general category of that traffic (cpc for paid search, email, social, referral), and Campaign is the specific initiative the link belongs to, whatever name or ID ties this push together in your own records.",
    },
    {
      question: "What are Google Ads' ValueTrack parameters?",
      answer:
        "ValueTrack parameters, like {campaignid} and {keyword}, are placeholders Google Ads replaces with real values the instant someone clicks your ad. Using them for Campaign, Term, and Content means every ad reports its actual campaign, keyword, and ad group with zero manual upkeep, instead of a name you'd have to keep in sync by hand across every ad.",
    },
    {
      question: "Why do all my Google Ads orders show up as google / cpc in WooCommerce?",
      answer:
        "WooCommerce only sees a generic Google Ads click, not the click ID (gclid) attached to it, unless something on your store is set up to read and store it. Untagged links collapse into one bucket. Read the full breakdown in \"Why Every Google Ads Order in WooCommerce Says google_cpc\" for how to actually fix it.",
    },
    {
      question: "Do I need Term and Content?",
      answer:
        "No, both are optional. Term is the keyword that triggered the ad (usually left to auto-fill for search campaigns), and Content distinguishes between two ad variants or placements running inside the same campaign, useful for A/B testing creative.",
    },
    {
      question: "Will this tag actually show up correctly in WooCommerce?",
      answer:
        "The link itself is standards-compliant UTM tagging, so it works with WooCommerce, Google Analytics, and any tool that reads UTM parameters. Whether WooCommerce turns that into per-order attribution depends on what's tracking it, plain WooCommerce doesn't store UTMs on the order by default, which is exactly the gap a plugin like SourceFlow closes.",
    },
  ],
  featured: true,
} satisfies Tool;
