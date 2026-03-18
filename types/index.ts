// ─── Shared ───────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// ─── Profile ──────────────────────────────────────────────────────────────────
// Matches GET {{IDBaseUrl}}/api/v1.0/User/profile/{username}
// Actual response shape: { records: UserProfile }

export interface UserProfile {
  id: string;
  email: string;
  chatUserId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  name: string;
  userName: string;              // this is the ID used in the URL
  bio: string;
  occupation: string;
  dateOfBirth: string;           // ISO 8601 — use calcAge() to derive age
  verified: boolean;
  verificationInReview: boolean;
  profileCompletion: number;
  pushDisabled: boolean;
  friendStatus: string;          // "none" | "friend" | "pending" | etc.
  blocked: boolean;
  linkupsAttended: number;
  linkupsCreated: number;
  gender: string;
  hasRyftAccount: boolean;
  isStaff: boolean;
  hideAge: boolean;
  nationality: {
    id: number;
    name: string;
    abbreviation: string;
    alpha2Code: string;
    alpha3Code: string;
    phoneCode: string;
  };
  userLanguages: {
    language: {
      id: number;
      name: string;
      code: string;
      nativeName: string;
      countryCode: string;
    };
  }[];
  userSocialMedia: {
    username: string;
    platform: {
      id: number;
      name: string;
      urlFormat: string;         // e.g. "https://instagram.com/{0}" — replace {0} with username
    };
  }[];
  userInterests: {
    interest: {
      id: number;
      name: string;
      categoryId: number;
      emoji: string;
    };
  }[];
  // ⚠️ Avatar field name not confirmed yet — check with backend team
  // Likely: profilePictureUrl | avatarUrl | imageUrl
  profilePictureUrl?: string;
}

// ─── Linkup Event ─────────────────────────────────────────────────────────────
// Matches GET {{LinkupBaseUrl}}/api/v2.0/Linkups/GetBySlug/{slug}
// Actual response shape: { records: LinkupEvent }
// ⚠️ Backend hasn't shared a sample response yet — fields below are best-guess
//    Update once backend confirms the actual shape

export interface Attendee {
  id: string;
  name: string;
  profilePictureUrl?: string;
}

export interface LinkupEvent {
  id: string;
  slug: string;                  // used in the URL: /linkup/{slug}
  title: string;
  description: string;
  coverImageUrl?: string;
  type: string;                  // e.g. "Public" | "Private"
  startDate: string;             // ISO 8601
  endDate: string;               // ISO 8601
  timezone: string;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  host: Attendee;
  attendees: Attendee[];
  attendeeCount: number;
  capacity?: number;
  distance?: number;             // populated when coords are passed to the API
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Calculate age from ISO 8601 date of birth */
export function calcAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

/** Build a social media URL from the platform urlFormat */
export function buildSocialUrl(urlFormat: string, username: string): string {
  return urlFormat.replace("{0}", username);
}
