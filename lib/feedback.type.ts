export const feedbackIssueTypes = ["bug", "idea"] as const;
export type FeedbackIssueType = (typeof feedbackIssueTypes)[number];

export type FeedbackType = FeedbackIssueType | "message";

export const feedbackStatuses = [
  "under_review",
  "planned",
  "in_progress",
  "done",
  "closed",
] as const;
export type FeedbackStatus = (typeof feedbackStatuses)[number];

// Shape returned by the public.feedback_public view — no email, and
// "message" type rows are excluded server-side, never sent to the client.
export type FeedbackItem = {
  id: string;
  product_id: string;
  type: FeedbackIssueType;
  title: string;
  description: string | null;
  status: FeedbackStatus;
  created_at: string;
  like_count: number;
  comment_count: number;
};

export type FeedbackComment = {
  id: string;
  feedback_id: string;
  author_name: string | null;
  body: string;
  created_at: string;
};

export type NewIssueInput = {
  productId: string;
  type: FeedbackIssueType;
  title: string;
  description: string;
};

export type NewMessageInput = {
  productId: string;
  title: string;
  description: string;
  email: string;
};

// The homepage contact form isn't about any one product, so its
// messages use this as their product_id.
export const GENERAL_CONTACT_PRODUCT_ID = "general";

export const contactTopics = [
  { id: "general", label: "General question" },
  { id: "idea", label: "An app or tool idea" },
  { id: "report", label: "Something's broken" },
  { id: "custom", label: "Custom work or hiring" },
  { id: "other", label: "Something else" },
] as const;
export type ContactTopic = (typeof contactTopics)[number]["id"];
