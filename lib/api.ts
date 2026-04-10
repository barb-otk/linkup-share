import { LinkupEvent, UserProfile, PublicUserLinkup, ApiResponse } from "@/types";

const IDENTITY_BASE_URL = process.env.NEXT_PUBLIC_IDENTITY_API_URL!;
const LINKUP_BASE_URL   = process.env.NEXT_PUBLIC_LINKUP_API_URL!;

const DEFAULT_HEADERS = { Accept: "text/plain" };


export async function fetchUserProfile(
  username: string
): Promise<ApiResponse<UserProfile>> {
  try {
    const res = await fetch(
      `${IDENTITY_BASE_URL}/api/v1.0/User/profile/${username}`,
      { headers: DEFAULT_HEADERS, next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return { data: json.records as UserProfile, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

// ─── Linkup Event ─────────────────────────────────────────────────────────────
// GET /api/v2.0/Linkups/GetBySlug/{slug}?Longitude=X&Latitude=Y
// Response: { records: { ... } }
// Longitude/Latitude are optional — used for distance calc; pass 0,0 if unknown

export async function fetchLinkupEvent(
  slug: string,
  coords?: { lat: number; lng: number }
): Promise<ApiResponse<LinkupEvent>> {
  try {
    const lat = coords?.lat ?? 0;
    const lng = coords?.lng ?? 0;
    const res = await fetch(
      `${LINKUP_BASE_URL}/api/v2.0/Linkups/GetBySlug/${slug}?Longitude=${lng}&Latitude=${lat}`,
      { headers: DEFAULT_HEADERS, next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return { data: json.records as LinkupEvent, error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}

// ─── User Linkups (profile page) ──────────────────────────────────────────────
// GET /api/v2.0/Linkups/PublicUserLinkups?ProfileId=...&Page=1&PageSize=10
// Response: { records: [...], paginationInfo: { ... } }

export async function fetchUserLinkups(
  profileId: string,
  pageSize = 10
): Promise<ApiResponse<PublicUserLinkup[]>> {
  try {
    const res = await fetch(
      `${LINKUP_BASE_URL}/api/v2.0/Linkups/PublicUserLinkups?Page=1&PageSize=${pageSize}&ProfileId=${profileId}&Latitude=0&Longitude=0`,
      { headers: DEFAULT_HEADERS, next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return { data: json.records as PublicUserLinkup[], error: null };
  } catch (err) {
    return { data: null, error: (err as Error).message };
  }
}
