"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export const MessageForm = ({ productId, productName }: { productId: string; productName: string }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="p-6 text-center flex-1 flex flex-col items-center justify-center">
        <CheckCircle2 size={40} className="text-green-600 mb-3" />
        <p className="font-black text-xl mb-1">Message sent</p>
        <p className="text-gray-600 text-sm mb-6">
          Thanks — this goes straight to me, not a public board.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setSubject("");
            setMessage("");
            setEmail("");
          }}
          className="bg-white brutalist-border px-4 py-2 font-bold text-sm hover:bg-gray-50"
        >
          Send another message
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (honeypot) {
      setSent(true);
      return;
    }

    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    if (trimmedSubject.length < 3) {
      setError("Give it a short subject line.");
      return;
    }
    if (trimmedMessage.length < 5) {
      setError("Add a bit more detail in the message.");
      return;
    }
    if (!supabase) {
      setError("Messaging is temporarily unavailable.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("feedback").insert({
      product_id: productId,
      type: "message",
      title: trimmedSubject,
      description: trimmedMessage,
      email: email.trim() || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong sending that. Try again.");
      return;
    }

    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 flex-1 overflow-y-auto">
      <div className="flex items-start gap-2 bg-gray-50 brutalist-border p-3 text-sm text-gray-600">
        <Mail size={16} className="shrink-0 mt-0.5" />
        <span>
          Private message about <span className="font-bold text-black">{productName}</span> —
          only I see this, it&apos;s never shown publicly.
        </span>
      </div>

      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        maxLength={120}
        required
        className="w-full px-3 py-2 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
        maxLength={2000}
        rows={6}
        required
        className="w-full px-3 py-2 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email (optional — only if you want a reply)"
        maxLength={254}
        className="w-full px-3 py-2 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Honeypot: hidden from real users, often filled by bots. */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-2499.75 w-px h-px opacity-0"
        aria-hidden="true"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-red-500 text-white px-4 py-2 font-bold brutalist-hover brutalist-shadow-sm disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {submitting && <Loader2 size={16} className="animate-spin" />}
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
};
