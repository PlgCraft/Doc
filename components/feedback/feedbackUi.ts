import { Bug, CheckCircle2, Eye, Hammer, Lightbulb, ListTodo, XCircle } from "lucide-react";
import type { FeedbackIssueType, FeedbackStatus } from "@/lib/feedback.type";

export const issueTypeMeta: Record<
  FeedbackIssueType,
  { label: string; icon: typeof Bug; color: string }
> = {
  bug: { label: "Bug", icon: Bug, color: "#DC2626" },
  idea: { label: "Idea", icon: Lightbulb, color: "#CA8A04" },
};

// Every issue starts "under_review" (set server-side, see the insert
// trigger in supabase/migrations) and moves through these by hand, from
// the Supabase Table Editor — there's no admin UI for it yet.
export const statusMeta: Record<
  FeedbackStatus,
  { label: string; icon: typeof Bug; bg: string; text: string; border: string }
> = {
  under_review: {
    label: "Under Review",
    icon: Eye,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  planned: {
    label: "Planned",
    icon: ListTodo,
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  in_progress: {
    label: "In Progress",
    icon: Hammer,
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  done: {
    label: "Done",
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  closed: {
    label: "Closed",
    icon: XCircle,
    bg: "bg-gray-100",
    text: "text-gray-500",
    border: "border-gray-300",
  },
};

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelativeTime(isoDate: string): string {
  const seconds = (Date.parse(isoDate) - Date.now()) / 1000;
  for (const [unit, secondsInUnit] of UNITS) {
    if (Math.abs(seconds) >= secondsInUnit) {
      return rtf.format(Math.round(seconds / secondsInUnit), unit);
    }
  }
  return "just now";
}
