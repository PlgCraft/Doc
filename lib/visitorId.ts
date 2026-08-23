const STORAGE_KEY = "plgcraft_visitor_id";

// Falls back to an in-memory id for the lifetime of the page if storage
// is blocked (private browsing, storage-access settings, etc.) so likes
// still work for that visit — they just won't persist across reloads.
let inMemoryId: string | null = null;

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  try {
    let id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    if (!inMemoryId) inMemoryId = crypto.randomUUID();
    return inMemoryId;
  }
}
