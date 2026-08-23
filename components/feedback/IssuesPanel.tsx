"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Heart, Loader2, MessageCircle, Plus, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { getVisitorId } from "@/lib/visitorId";
import type { FeedbackIssueType, FeedbackItem } from "@/lib/feedback.type";
import { formatRelativeTime, issueTypeMeta, statusMeta } from "./feedbackUi";
import { CommentsThread } from "./CommentsThread";

type LoadState = "loading" | "ready" | "error";

export const IssuesPanel = ({ productId }: { productId: string }) => {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [formOpen, setFormOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentsOpenId, setCommentsOpenId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [pendingLikeIds, setPendingLikeIds] = useState<Set<string>>(new Set());

  const loadIssues = async () => {
    if (!supabase) {
      setLoadState("error");
      return;
    }
    setLoadState("loading");

    const visitorId = getVisitorId();
    const [issuesResult, likesResult] = await Promise.all([
      supabase
        .from("feedback_public")
        .select(
          "id, product_id, type, title, description, status, created_at, like_count, comment_count"
        )
        .eq("product_id", productId)
        .order("created_at", { ascending: false })
        .limit(50),
      visitorId
        ? supabase.rpc("feedback_my_likes", { p_visitor_id: visitorId })
        : Promise.resolve({ data: [], error: null }),
    ]);

    if (issuesResult.error || !issuesResult.data) {
      setLoadState("error");
      return;
    }
    setItems(issuesResult.data as FeedbackItem[]);
    const likedRows = (likesResult.data ?? []) as Array<{ feedback_id: string }>;
    setLikedIds(new Set(likedRows.map((row) => row.feedback_id)));
    setLoadState("ready");
  };

  useEffect(() => {
    loadIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const toggleLike = async (item: FeedbackItem) => {
    if (!supabase || pendingLikeIds.has(item.id)) return;
    const visitorId = getVisitorId();
    if (!visitorId) return;

    setPendingLikeIds((current) => new Set(current).add(item.id));

    // The RPC does the exists-check-then-insert-or-delete atomically and
    // hands back the authoritative liked state + count, so there's no
    // optimistic math to roll back here — just apply what it returns.
    const { data, error } = await supabase
      .rpc("feedback_toggle_like", { p_feedback_id: item.id, p_visitor_id: visitorId })
      .single();
    const result = data as { liked: boolean; like_count: number } | null;

    if (!error && result) {
      setLikedIds((current) => {
        const next = new Set(current);
        if (result.liked) next.add(item.id);
        else next.delete(item.id);
        return next;
      });
      setItems((current) =>
        current.map((i) =>
          i.id === item.id ? { ...i, like_count: Number(result.like_count) } : i
        )
      );
    }

    setPendingLikeIds((current) => {
      const next = new Set(current);
      next.delete(item.id);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b-4 border-black shrink-0">
        <button
          onClick={() => setFormOpen((open) => !open)}
          className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-2 font-bold brutalist-hover brutalist-shadow-sm"
        >
          {formOpen ? <X size={18} /> : <Plus size={18} />}
          {formOpen ? "Cancel" : "New Issue"}
        </button>
        {formOpen && (
          <NewIssueForm
            productId={productId}
            onSubmitted={(item) => {
              setItems((current) => [item, ...current]);
              setFormOpen(false);
            }}
          />
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loadState === "loading" && (
          <div className="flex items-center justify-center gap-2 text-gray-500 py-12">
            <Loader2 size={18} className="animate-spin" />
            Loading issues…
          </div>
        )}

        {loadState === "error" && (
          <div className="text-center py-12">
            <AlertCircle size={28} className="mx-auto mb-3 text-red-500" />
            <p className="text-gray-600 mb-4">Couldn&apos;t load issues right now.</p>
            <button
              onClick={loadIssues}
              className="bg-white brutalist-border px-4 py-2 font-bold text-sm hover:bg-gray-50"
            >
              Try again
            </button>
          </div>
        )}

        {loadState === "ready" && items.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="font-bold text-black mb-1">No issues yet</p>
            <p className="text-sm">Be the first to report a bug or share an idea.</p>
          </div>
        )}

        {loadState === "ready" && items.length > 0 && (
          <ul className="space-y-3">
            {items.map((item) => {
              const type = issueTypeMeta[item.type];
              const status = statusMeta[item.status];
              const expanded = expandedId === item.id;
              const liked = likedIds.has(item.id);
              return (
                <li key={item.id} className="brutalist-border bg-white p-4">
                  <button
                    onClick={() => setExpandedId(expanded ? null : item.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
                        style={{ color: type.color }}
                      >
                        <type.icon size={14} />
                        {type.label}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${status.bg} ${status.text} ${status.border}`}
                      >
                        <status.icon size={12} />
                        {status.label}
                      </span>
                    </div>
                    <p className="font-bold leading-snug">{item.title}</p>
                    {item.description && (
                      <p
                        className={`text-sm text-gray-600 mt-1 whitespace-pre-wrap ${expanded ? "" : "line-clamp-2"}`}
                      >
                        {item.description}
                      </p>
                    )}
                  </button>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLike(item)}
                        disabled={pendingLikeIds.has(item.id)}
                        aria-pressed={liked}
                        className={`flex items-center gap-1.5 px-2 py-1 text-xs font-bold border-2 disabled:opacity-50 ${
                          liked
                            ? "bg-red-50 border-red-300 text-red-600"
                            : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                        }`}
                      >
                        <Heart size={13} fill={liked ? "currentColor" : "none"} />
                        {item.like_count}
                      </button>

                      <button
                        onClick={() =>
                          setCommentsOpenId((current) => (current === item.id ? null : item.id))
                        }
                        aria-pressed={commentsOpenId === item.id}
                        className={`flex items-center gap-1.5 px-2 py-1 text-xs font-bold border-2 ${
                          commentsOpenId === item.id
                            ? "bg-blue-50 border-blue-300 text-blue-600"
                            : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                        }`}
                      >
                        <MessageCircle size={13} />
                        {item.comment_count}
                      </button>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                      {formatRelativeTime(item.created_at)}
                    </span>
                  </div>

                  {commentsOpenId === item.id && (
                    <CommentsThread
                      feedbackId={item.id}
                      onPostedAction={() =>
                        setItems((current) =>
                          current.map((i) =>
                            i.id === item.id ? { ...i, comment_count: i.comment_count + 1 } : i
                          )
                        )
                      }
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

const NewIssueForm = ({
  productId,
  onSubmitted,
}: {
  productId: string;
  onSubmitted: (item: FeedbackItem) => void;
}) => {
  const [type, setType] = useState<FeedbackIssueType>("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (honeypot) {
      // Bot filled the trap field. Pretend it worked, insert nothing.
      onSubmitted({
        id: crypto.randomUUID(),
        product_id: productId,
        type,
        title,
        description,
        status: "under_review",
        created_at: new Date().toISOString(),
        like_count: 0,
        comment_count: 0,
      });
      return;
    }

    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3) {
      setError("Title needs to be at least 3 characters.");
      return;
    }
    if (!supabase) {
      setError("Feedback is temporarily unavailable.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const trimmedDescription = description.trim() || null;

    // Goes through an RPC (not a plain insert) specifically so it can
    // hand back the real row — anon still has no general SELECT on the
    // base table (that's what keeps reporter emails private), but this
    // function returns only the one row it just created. Without the
    // real id, liking/commenting on it would fail until a refetch.
    const { data, error: insertError } = await supabase
      .rpc("feedback_create_issue", {
        p_product_id: productId,
        p_type: type,
        p_title: trimmedTitle,
        p_description: trimmedDescription,
      })
      .single();

    setSubmitting(false);

    if (insertError || !data) {
      setError("Something went wrong submitting that. Try again.");
      return;
    }

    setTitle("");
    setDescription("");
    onSubmitted(data as FeedbackItem);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div className="flex gap-2">
        {(["bug", "idea"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex-1 px-3 py-2 text-sm font-bold brutalist-border ${
              type === t ? "bg-black text-white" : "bg-white text-black hover:bg-gray-50"
            }`}
          >
            {issueTypeMeta[t].label}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Short, specific title"
        maxLength={120}
        required
        className="w-full px-3 py-2 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What happened, or what would this do for you? (optional)"
        maxLength={2000}
        rows={3}
        className="w-full px-3 py-2 brutalist-border text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
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
        {submitting ? "Submitting…" : "Submit Issue"}
      </button>
      <p className="text-xs text-gray-400">Issues are public. Don&apos;t include personal info.</p>
    </form>
  );
};
