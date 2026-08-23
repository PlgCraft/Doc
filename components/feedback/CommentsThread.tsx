"use client";

import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { FeedbackComment } from "@/lib/feedback.type";
import { formatRelativeTime } from "./feedbackUi";

type LoadState = "loading" | "ready" | "error";

export const CommentsThread = ({
  feedbackId,
  onPostedAction,
}: {
  feedbackId: string;
  onPostedAction?: () => void;
}) => {
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!supabase) {
      setLoadState("error");
      return;
    }
    setLoadState("loading");
    const { data, error: loadError } = await supabase
      .from("feedback_comments")
      .select("id, feedback_id, author_name, body, created_at")
      .eq("feedback_id", feedbackId)
      .order("created_at", { ascending: true })
      .limit(200);

    if (loadError || !data) {
      setLoadState("error");
      return;
    }
    setComments(data as FeedbackComment[]);
    setLoadState("ready");
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (honeypot) return; // bot trap — silently drop, no need to fake success here

    const trimmedBody = body.trim();
    if (!trimmedBody) {
      setError("Comment can't be empty.");
      return;
    }
    if (!supabase) {
      setError("Comments are temporarily unavailable.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const trimmedName = name.trim() || null;
    const { error: insertError } = await supabase.from("feedback_comments").insert({
      feedback_id: feedbackId,
      author_name: trimmedName,
      body: trimmedBody,
    });

    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong posting that. Try again.");
      return;
    }

    setComments((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        feedback_id: feedbackId,
        author_name: trimmedName,
        body: trimmedBody,
        created_at: new Date().toISOString(),
      },
    ]);
    setBody("");
    onPostedAction?.();
  };

  return (
    <div className="mt-3 pt-3 border-t-2 border-gray-200">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
        Comments{loadState === "ready" && comments.length > 0 ? ` (${comments.length})` : ""}
      </p>

      {loadState === "loading" && (
        <div className="flex items-center gap-2 text-sm text-gray-500 py-2">
          <Loader2 size={14} className="animate-spin" /> Loading…
        </div>
      )}

      {loadState === "error" && (
        <p className="text-sm text-gray-500 py-1">Couldn&apos;t load comments right now.</p>
      )}

      {loadState === "ready" && comments.length === 0 && (
        <p className="text-sm text-gray-400 py-1">No comments yet.</p>
      )}

      {loadState === "ready" && comments.length > 0 && (
        <ul className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-gray-50 border-2 border-gray-200 p-2 text-sm">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold">{comment.author_name || "Anonymous"}</span>
                <span className="text-xs text-gray-400 font-mono shrink-0">
                  {formatRelativeTime(comment.created_at)}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          maxLength={60}
          className="w-full px-2 py-1.5 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a comment…"
          maxLength={1000}
          rows={2}
          className="w-full px-2 py-1.5 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
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

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 text-sm font-bold hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none"
        >
          {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          Post
        </button>
      </form>
    </div>
  );
};
