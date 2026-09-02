"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Wand2 } from "lucide-react";

// Matches the accentColor set on this tool's entry in lib/tools/campaign-url-builder.ts.
const ACCENT = "#2A52D6";

type FieldKey = "campaign" | "term" | "content";

// Google Ads' own placeholders — replaced with real values by Google at click
// time, so filling these in requires no manual upkeep per campaign.
const VALUETRACK: Record<FieldKey, string> = {
  campaign: "{campaignid}",
  term: "{keyword}",
  content: "{adgroupid}",
};

const SEGMENTS: { key: string; label: string; colorClass: string; dotClass: string }[] = [
  { key: "utm_source", label: "source", colorClass: "text-blue-400", dotClass: "bg-blue-400" },
  { key: "utm_medium", label: "medium", colorClass: "text-orange-400", dotClass: "bg-orange-400" },
  { key: "utm_campaign", label: "campaign", colorClass: "text-emerald-400", dotClass: "bg-emerald-400" },
  { key: "utm_term", label: "term", colorClass: "text-fuchsia-400", dotClass: "bg-fuchsia-400" },
  { key: "utm_content", label: "content", colorClass: "text-amber-400", dotClass: "bg-amber-400" },
];

const segmentFor = (key: string) => SEGMENTS.find((s) => s.key === key)!;

export const CampaignUrlBuilderWidget = () => {
  const [baseUrl, setBaseUrl] = useState("https://yourstore.com/shop/");
  const [source, setSource] = useState("google");
  const [medium, setMedium] = useState("cpc");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [valuetrack, setValuetrack] = useState(false);
  const [manualValues, setManualValues] = useState<Record<FieldKey, string>>({
    campaign: "",
    term: "",
    content: "",
  });
  const [copied, setCopied] = useState(false);

  const toggleValuetrack = (checked: boolean) => {
    setValuetrack(checked);
    if (checked) {
      setManualValues({ campaign, term, content });
      setCampaign(VALUETRACK.campaign);
      setTerm(VALUETRACK.term);
      setContent(VALUETRACK.content);
    } else {
      setCampaign(manualValues.campaign);
      setTerm(manualValues.term);
      setContent(manualValues.content);
    }
  };

  const { base, separator, params, plainUrl, error } = useMemo(() => {
    const trimmedBase = baseUrl.trim();
    const trimmedSource = source.trim();
    const trimmedMedium = medium.trim();
    const trimmedCampaign = campaign.trim();
    const trimmedTerm = term.trim();
    const trimmedContent = content.trim();

    if (!trimmedBase || !trimmedSource || !trimmedMedium || !trimmedCampaign) {
      return {
        base: "",
        separator: "",
        params: [] as { key: string; value: string }[],
        plainUrl: "",
        error: "Destination URL, Source, Medium, and Campaign are required to build a valid link.",
      };
    }

    const sep = trimmedBase.includes("?") ? "&" : "?";
    const list = [
      { key: "utm_source", value: trimmedSource },
      { key: "utm_medium", value: trimmedMedium },
      { key: "utm_campaign", value: trimmedCampaign },
    ];
    if (trimmedTerm) list.push({ key: "utm_term", value: trimmedTerm });
    if (trimmedContent) list.push({ key: "utm_content", value: trimmedContent });

    const plain = `${trimmedBase}${sep}${list
      .map((p) => `${p.key}=${encodeURIComponent(p.value)}`)
      .join("&")}`;

    return { base: trimmedBase, separator: sep, params: list, plainUrl: plain, error: "" };
  }, [baseUrl, source, medium, campaign, term, content]);

  const handleCopy = async () => {
    if (!plainUrl) return;
    try {
      await navigator.clipboard.writeText(plainUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (permissions/insecure context) — button just won't flip.
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <form
        className="bg-white brutalist-border brutalist-shadow p-6 md:p-8"
        aria-label="Campaign URL builder inputs"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="font-black text-xl mb-6">BUILD YOUR LINK</h2>

        <label
          className="flex items-start gap-3 p-4 mb-6 brutalist-border cursor-pointer"
          style={{ backgroundColor: `${ACCENT}12` }}
        >
          <input
            type="checkbox"
            checked={valuetrack}
            onChange={(e) => toggleValuetrack(e.target.checked)}
            style={{ accentColor: ACCENT }}
            className="w-[18px] h-[18px] mt-0.5 shrink-0"
          />
          <span>
            <span className="block font-bold text-sm">Auto-fill for Google Ads</span>
            <span className="block text-xs text-gray-600 mt-1">
              Fills Campaign, Term, and Content with Google Ads&apos; own ValueTrack parameters, so
              every ad reports its real campaign, keyword, and ad group automatically.
            </span>
          </span>
        </label>

        <div className="mb-5">
          <label htmlFor="base-url" className="flex items-baseline justify-between font-bold text-sm mb-2">
            Destination URL <span className="font-normal text-xs text-gray-500">required</span>
          </label>
          <input
            id="base-url"
            type="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://yourstore.com/shop/"
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="source" className="flex items-baseline justify-between font-bold text-sm mb-2">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 inline-block ${segmentFor("utm_source").dotClass}`} /> Source
            </span>
            <span className="font-normal text-xs text-gray-500">required</span>
          </label>
          <input
            id="source"
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="google"
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="medium" className="flex items-baseline justify-between font-bold text-sm mb-2">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 inline-block ${segmentFor("utm_medium").dotClass}`} /> Medium
            </span>
            <span className="font-normal text-xs text-gray-500">required</span>
          </label>
          <input
            id="medium"
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="cpc"
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="campaign" className="flex items-baseline justify-between font-bold text-sm mb-2">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 inline-block ${segmentFor("utm_campaign").dotClass}`} /> Campaign
            </span>
            <span className="font-normal text-xs text-gray-500">required</span>
          </label>
          <input
            id="campaign"
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="spring_sale"
            disabled={valuetrack}
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            With auto-fill on, this becomes Google Ads&apos; own campaign ID automatically.
          </p>
        </div>

        <div className="mb-5">
          <label htmlFor="term" className="flex items-center gap-2 font-bold text-sm mb-2">
            <span className={`w-2 h-2 inline-block ${segmentFor("utm_term").dotClass}`} /> Term
          </label>
          <input
            id="term"
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="running shoes"
            disabled={valuetrack}
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            The keyword that triggered the ad. Usually left to auto-fill for search campaigns.
          </p>
        </div>

        <div>
          <label htmlFor="content" className="flex items-center gap-2 font-bold text-sm mb-2">
            <span className={`w-2 h-2 inline-block ${segmentFor("utm_content").dotClass}`} /> Content
          </label>
          <input
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="carousel_ad_2"
            disabled={valuetrack}
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Distinguishes ad variants or placements within the same campaign.
          </p>
        </div>
      </form>

      <div className="bg-black text-white brutalist-shadow p-6 md:p-8 flex flex-col h-full">
        <h2 className="font-black text-xl mb-6">YOUR TAGGED URL</h2>

        <div
          className="font-mono text-sm leading-7 break-all bg-white/10 p-4 flex-grow min-h-35"
          aria-live="polite"
        >
          {params.length > 0 ? (
            <>
              <span>{base}</span>
              <span className="text-white/40">{separator}</span>
              {params.map((p, i) => (
                <span key={p.key}>
                  {i > 0 && <span className="text-white/40">&amp;</span>}
                  <span className="text-white/40">{p.key}=</span>
                  <span className={segmentFor(p.key).colorClass}>{encodeURIComponent(p.value)}</span>
                </span>
              ))}
            </>
          ) : (
            <span className="text-white/40">Fill in the required fields to see your link here.</span>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-4 text-xs text-white/50">
          {SEGMENTS.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 inline-block ${s.dotClass}`} /> {s.label}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!plainUrl}
          style={{ backgroundColor: copied ? "#16A34A" : ACCENT }}
          className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-3 font-bold text-white transition-[filter] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied" : "Copy link"}
        </button>

        <p className="text-xs text-red-300 mt-3 min-h-4.5">{error}</p>
      </div>

      <div
        className="md:col-span-2 brutalist-border p-5 flex flex-wrap items-center justify-between gap-4"
        style={{ backgroundColor: `${ACCENT}0D` }}
      >
        <p className="text-sm text-gray-700 max-w-2xl">
          Building the link is the easy part. Knowing which one actually turned into revenue is the
          harder question — that&apos;s what <strong>SourceFlow</strong> does natively inside
          WooCommerce, no separate script or Analytics headache required.
        </p>
        <Link
          href="/project/sourceflow"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 font-bold brutalist-shadow-sm brutalist-hover whitespace-nowrap"
        >
          <Wand2 size={16} /> SEE HOW IT WORKS
        </Link>
      </div>
    </div>
  );
};
