"use client";

import { type CSSProperties, useState } from "react";
import { appData } from "@/lib/data";
import { supabase } from "@/lib/supabase/client";
import { GENERAL_CONTACT_PRODUCT_ID, contactTopics, type ContactTopic } from "@/lib/feedback.type";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, Send, Twitter } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
          <span className="inline-block bg-white text-black px-4 py-2 text-sm font-bold mb-6">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            {"LET'S "}
            <span className="text-stroke-white text-transparent">Talk</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Got an app idea, found a bug, or just want to say hello? Send it over. It lands
            straight in my inbox, no ticket system, no auto-reply, just me reading it.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div
            className="md:col-span-3 reveal-up"
            style={{ ["--delay" as never]: "120ms" } as CSSProperties}
          >
            <ContactForm />
          </div>

          <div className="md:col-span-2 flex flex-col gap-8">
            <a
              href={`mailto:${appData.info.email}`}
              className="reveal-up bg-white text-black p-8 brutalist-hover group"
              style={{ ["--delay" as never]: "220ms" } as CSSProperties}
            >
              <Mail size={40} className="mb-4" />
              <h3 className="font-black text-xl mb-2">EMAIL</h3>
              <p className="text-gray-600 group-hover:text-red-500 transition-colors break-all">
                {appData.info.email}
              </p>
            </a>

            <div
              className="reveal-up bg-red-500 p-8"
              style={{ ["--delay" as never]: "320ms" } as CSSProperties}
            >
              <h3 className="font-black text-xl mb-6">FOLLOW ME</h3>
              <div className="flex gap-4">
                <a
                  href={appData.info.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-4 hover:bg-white hover:text-black transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href={appData.info.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-4 hover:bg-white hover:text-black transition-colors"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href={appData.info.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-4 hover:bg-white hover:text-black transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<ContactTopic>("general");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="bg-white text-black brutalist-border brutalist-shadow p-8 h-full flex flex-col items-center justify-center text-center">
        <CheckCircle2 size={44} className="text-green-600 mb-4" />
        <h3 className="font-black text-2xl mb-2">Message sent</h3>
        <p className="text-gray-600 mb-6 max-w-sm">
          Thanks for reaching out. I read everything myself, and I&apos;ll get back to you if you
          left an email.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setName("");
            setEmail("");
            setTopic("general");
            setMessage("");
          }}
          className="bg-black text-white px-5 py-3 font-bold brutalist-hover brutalist-shadow-sm"
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

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 5) {
      setError("Add a bit more detail so I know what you need.");
      return;
    }
    if (!supabase) {
      setError("The contact form is temporarily unavailable, email me directly instead.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const topicLabel = contactTopics.find((t) => t.id === topic)?.label ?? "General question";

    const { error: insertError } = await supabase.from("feedback").insert({
      product_id: GENERAL_CONTACT_PRODUCT_ID,
      type: "message",
      title: topicLabel,
      description: trimmedMessage,
      name: name.trim() || null,
      topic,
      email: email.trim() || null,
    });

    setSubmitting(false);

    if (insertError) {
      console.log("Contact form insert failed:", insertError);
      setError("Something went wrong sending that. Try again, or email me directly.");
      return;
    }

    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black brutalist-border brutalist-shadow p-8 h-full flex flex-col gap-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          maxLength={80}
          className="w-full px-4 py-3 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email (so I can reply)"
          maxLength={254}
          className="w-full px-4 py-3 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
          What&apos;s this about?
        </label>
        <div className="flex flex-wrap gap-2">
          {contactTopics.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTopic(t.id)}
              className={`px-3 py-2 text-sm font-bold brutalist-border ${
                topic === t.id ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell me what's on your mind..."
        maxLength={2000}
        rows={5}
        required
        className="w-full px-4 py-3 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none flex-1"
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
        className="w-full bg-red-500 text-white px-4 py-3 font-bold brutalist-hover brutalist-shadow-sm disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
};
