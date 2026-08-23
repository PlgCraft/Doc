import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Feedback is a client-only feature (no accounts, no server round trip),
// so a single browser-side singleton is all this needs. If env vars are
// missing (e.g. a preview deploy without them configured), callers should
// treat this as unavailable rather than crash the page.
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
