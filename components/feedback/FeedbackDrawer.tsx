"use client";

import { useEffect, useState } from "react";
import { MessageSquareText, X } from "lucide-react";
import { IssuesPanel } from "./IssuesPanel";
import { MessageForm } from "./MessageForm";

type Tab = "issues" | "message";

export const FeedbackDrawer = ({
  productId,
  productName,
  accentColor,
}: {
  productId: string;
  productName: string;
  accentColor: string;
}) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("issues");

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open feedback panel"
          className="hidden md:flex fixed top-1/2 right-0 -translate-y-1/2 z-70 items-center gap-2 bg-black text-white px-3 py-2 font-bold text-sm brutalist-hover border-4 border-black border-r-0"
          style={{ writingMode: "vertical-rl" }}
        >
          <MessageSquareText size={16} style={{ transform: "rotate(90deg)" }} />
          FEEDBACK
        </button>
      )}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open feedback panel"
          className="md:hidden fixed bottom-6 right-4 z-70 flex items-center justify-center w-14 h-14 bg-black text-white brutalist-border brutalist-shadow-sm"
        >
          <MessageSquareText size={22} />
        </button>
      )}

      <div
        className={`fixed inset-0 bg-black/50 z-70 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Feedback for ${productName}`}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l-4 border-black z-71 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b-4 border-black flex items-start justify-between gap-3 shrink-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Feedback</p>
            <h2 className="font-black text-xl leading-tight" style={{ color: accentColor }}>
              {productName}
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close feedback panel"
            className="shrink-0 p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b-4 border-black shrink-0">
          <button
            onClick={() => setTab("issues")}
            className={`flex-1 px-4 py-2 font-bold text-sm ${
              tab === "issues" ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            Issues
          </button>
          <button
            onClick={() => setTab("message")}
            className={`flex-1 px-4 py-2 font-bold text-sm border-l-4 border-black ${
              tab === "message" ? "bg-black text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            Message
          </button>
        </div>

        {open && tab === "issues" && <IssuesPanel productId={productId} />}
        {open && tab === "message" && (
          <MessageForm productId={productId} productName={productName} />
        )}
      </div>
    </>
  );
};
