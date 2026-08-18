"use client";

import { useMemo, useState } from "react";

type Platform = "shopify" | "woocommerce";
type ShopifyPlanId = "basic" | "grow" | "advanced" | "plus";
type Processor = "shopify_payments" | "woocommerce_payments" | "stripe" | "paypal";
type CrossBorderType = "none" | "international" | "conversion";

const FLAT_FEE = 0.3;
const BASE_PROCESSOR_PCT = 2.9;

const CROSS_BORDER_OPTIONS: Record<CrossBorderType, { label: string; hint: string; pct: number }> = {
  none: { label: "No cross-border sales", hint: "", pct: 0 },
  international: {
    label: "International cards, same currency",
    hint: "Buyer's card is issued outside your store's country, but charged in your store currency.",
    pct: 1.5,
  },
  conversion: {
    label: "Currency conversion (different currency)",
    hint: "Shopify converts the charge into the buyer's local currency at checkout.",
    pct: 2.0,
  },
};

const SHOPIFY_PLANS: Record<ShopifyPlanId, { label: string; paymentsFeePct: number; surchargePct: number }> = {
  basic: { label: "Basic", paymentsFeePct: 2.9, surchargePct: 2.0 },
  grow: { label: "Grow", paymentsFeePct: 2.6, surchargePct: 1.0 },
  advanced: { label: "Advanced", paymentsFeePct: 2.4, surchargePct: 0.6 },
  plus: { label: "Plus", paymentsFeePct: 2.2, surchargePct: 0.2 },
};

const SHOPIFY_PROCESSORS: { id: Processor; label: string }[] = [
  { id: "shopify_payments", label: "Shopify Payments" },
  { id: "stripe", label: "Stripe" },
  { id: "paypal", label: "PayPal" },
];

const WOOCOMMERCE_PROCESSORS: { id: Processor; label: string }[] = [
  { id: "woocommerce_payments", label: "WooCommerce Payments" },
  { id: "stripe", label: "Stripe" },
  { id: "paypal", label: "PayPal" },
];

const processorLabel = (processor: Processor, options: { id: Processor; label: string }[]) =>
  options.find((option) => option.id === processor)?.label ?? processor;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const wholeCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function calculate(input: {
  platform: Platform;
  volume: number;
  aov: number;
  plan: ShopifyPlanId;
  processor: Processor;
  crossBorder: CrossBorderType;
}) {
  const { platform, volume, aov, plan, processor, crossBorder } = input;
  const safeVolume = Math.max(volume, 0);
  const transactionCount = aov > 0 ? safeVolume / aov : 0;

  const processorPct =
    processor === "shopify_payments" ? SHOPIFY_PLANS[plan].paymentsFeePct : BASE_PROCESSOR_PCT;

  const surchargeApplies = platform === "shopify" && processor === "stripe";
  const surchargePct = surchargeApplies ? SHOPIFY_PLANS[plan].surchargePct : 0;

  const currencyPct = platform === "shopify" ? CROSS_BORDER_OPTIONS[crossBorder].pct : 0;
  const currencyApplies = currencyPct > 0;

  const processorFee = safeVolume * (processorPct / 100);
  const flatFees = transactionCount * FLAT_FEE;
  const surchargeFee = safeVolume * (surchargePct / 100);
  const currencyFee = safeVolume * (currencyPct / 100);

  const totalFees = processorFee + flatFees + surchargeFee + currencyFee;
  const netPayout = safeVolume - totalFees;
  const effectivePct = safeVolume > 0 ? (totalFees / safeVolume) * 100 : 0;

  return {
    transactionCount,
    processorPct,
    processorFee,
    flatFees,
    surchargeApplies,
    surchargePct,
    surchargeFee,
    currencyApplies,
    currencyPct,
    currencyFee,
    totalFees,
    netPayout,
    effectivePct,
  };
}

export const FeeCalculatorWidget = () => {
  const [platform, setPlatform] = useState<Platform>("shopify");
  const [volume, setVolume] = useState(10000);
  const [aov, setAov] = useState(50);
  const [plan, setPlan] = useState<ShopifyPlanId>("grow");
  const [processor, setProcessor] = useState<Processor>("shopify_payments");
  const [crossBorder, setCrossBorder] = useState<CrossBorderType>("none");

  const processorOptions = platform === "shopify" ? SHOPIFY_PROCESSORS : WOOCOMMERCE_PROCESSORS;

  const handlePlatformChange = (next: Platform) => {
    setPlatform(next);
    const nextOptions = next === "shopify" ? SHOPIFY_PROCESSORS : WOOCOMMERCE_PROCESSORS;
    if (!nextOptions.some((option) => option.id === processor)) {
      setProcessor(nextOptions[0].id);
    }
    if (next === "woocommerce") {
      setCrossBorder("none");
    }
  };

  const result = useMemo(
    () => calculate({ platform, volume, aov, plan, processor, crossBorder }),
    [platform, volume, aov, plan, processor, crossBorder],
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <form className="bg-white brutalist-border brutalist-shadow p-6 md:p-8" aria-label="Fee calculator inputs">
        <h2 className="font-black text-xl mb-6">YOUR STORE</h2>

        <fieldset className="mb-6">
          <legend className="block font-bold text-sm mb-2">Platform</legend>
          <div className="flex gap-3" role="radiogroup" aria-label="Platform">
            {(["shopify", "woocommerce"] as const).map((option) => (
              <label
                key={option}
                className={`flex-1 text-center px-4 py-3 font-bold cursor-pointer transition-all ${
                  platform === option
                    ? "bg-black text-white brutalist-shadow-sm"
                    : "bg-white text-black brutalist-border hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="platform"
                  value={option}
                  checked={platform === option}
                  onChange={() => handlePlatformChange(option)}
                  className="sr-only"
                />
                {option === "shopify" ? "Shopify" : "WooCommerce"}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mb-6">
          <label htmlFor="volume" className="block font-bold text-sm mb-2">
            Monthly sales volume ($)
          </label>
          <input
            id="volume"
            type="number"
            inputMode="decimal"
            min={0}
            step={100}
            value={volume}
            onChange={(e) => setVolume(e.target.valueAsNumber || 0)}
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="aov" className="block font-bold text-sm mb-2">
            Average order value ($)
          </label>
          <input
            id="aov"
            type="number"
            inputMode="decimal"
            min={0.01}
            step={1}
            value={aov}
            onChange={(e) => setAov(e.target.valueAsNumber || 0)}
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Used to estimate your transaction count.</p>
        </div>

        {platform === "shopify" && (
          <div className="mb-6">
            <label htmlFor="plan" className="block font-bold text-sm mb-2">
              Shopify plan
            </label>
            <select
              id="plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value as ShopifyPlanId)}
              className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none"
            >
              {(Object.keys(SHOPIFY_PLANS) as ShopifyPlanId[]).map((id) => (
                <option key={id} value={id}>
                  {SHOPIFY_PLANS[id].label}
                </option>
              ))}
            </select>
            {plan === "plus" && (
              <p className="text-xs text-gray-500 mt-1">
                Plus rates are negotiated and typically run 2.15%–2.25%. We use 2.2% here.
              </p>
            )}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="processor" className="block font-bold text-sm mb-2">
            Payment processor
          </label>
          <select
            id="processor"
            value={processor}
            onChange={(e) => setProcessor(e.target.value as Processor)}
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none"
          >
            {processorOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="crossBorder" className="block font-bold text-sm mb-2">
            International / currency conversion sales
          </label>
          <select
            id="crossBorder"
            value={crossBorder}
            onChange={(e) => setCrossBorder(e.target.value as CrossBorderType)}
            disabled={platform === "woocommerce"}
            className="w-full bg-white brutalist-border px-4 py-3 font-bold focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {(Object.keys(CROSS_BORDER_OPTIONS) as CrossBorderType[]).map((id) => (
              <option key={id} value={id}>
                {CROSS_BORDER_OPTIONS[id].label}
                {CROSS_BORDER_OPTIONS[id].pct > 0 ? ` (+${CROSS_BORDER_OPTIONS[id].pct}%)` : ""}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {platform === "woocommerce"
              ? "Shopify-specific fee, doesn't apply to WooCommerce."
              : crossBorder === "none"
                ? "Assumes all sales are domestic, same currency."
                : CROSS_BORDER_OPTIONS[crossBorder].hint}
          </p>
        </div>
      </form>

      <div className="bg-black text-white brutalist-shadow p-6 md:p-8">
        <h2 className="font-black text-xl mb-6">ESTIMATED RESULT</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 p-4">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Effective fee rate</div>
            <div className="text-3xl font-black">{result.effectivePct.toFixed(2)}%</div>
          </div>
          <div className="bg-white/10 p-4">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">Total fees</div>
            <div className="text-3xl font-black">{wholeCurrency.format(result.totalFees)}</div>
          </div>
        </div>

        <div className="bg-green-600 p-5 mb-6">
          <div className="text-xs font-bold text-white/80 uppercase mb-1">Estimated net payout</div>
          <div className="text-4xl font-black">{wholeCurrency.format(Math.max(result.netPayout, 0))}</div>
        </div>

        <dl className="space-y-2 text-sm border-t border-white/20 pt-4 mb-6">
          <div className="flex justify-between">
            <dt className="text-gray-400">
              {processorLabel(processor, processorOptions)} fee ({result.processorPct.toFixed(2)}%)
            </dt>
            <dd className="font-mono">{currency.format(result.processorFee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-400">
              Per-transaction fees (~{Math.round(result.transactionCount)} orders × $0.30)
            </dt>
            <dd className="font-mono">{currency.format(result.flatFees)}</dd>
          </div>
          {result.surchargeApplies && (
            <div className="flex justify-between">
              <dt className="text-gray-400">Shopify third-party surcharge ({result.surchargePct.toFixed(1)}%)</dt>
              <dd className="font-mono">{currency.format(result.surchargeFee)}</dd>
            </div>
          )}
          {result.currencyApplies && (
            <div className="flex justify-between">
              <dt className="text-gray-400">
                {CROSS_BORDER_OPTIONS[crossBorder].label} ({result.currencyPct}%)
              </dt>
              <dd className="font-mono">{currency.format(result.currencyFee)}</dd>
            </div>
          )}
        </dl>

        <p className="text-xs text-gray-400 leading-relaxed">
          This is the number that should land in your QuickBooks/Xero deposit — if it doesn&apos;t
          match, that&apos;s a reconciliation problem, not a fee problem.
        </p>
        <p className="text-xs text-gray-500 leading-relaxed mt-3">
          Estimate only. Real fees vary by card type, negotiated rates, and chargebacks.
        </p>
      </div>
    </div>
  );
};
