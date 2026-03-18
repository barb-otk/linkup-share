// ─── Shared ───────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// ─── Profile ──────────────────────────────────────────────────────────────────
// GET {{IDBaseUrl}}/api/v1.0/User/profile/{username}

export interface UserProfile {
  id: string;
  email: string;
  chatUserId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  name: string;
  userName: string;
  bio: string;
  occupation: string;
  dateOfBirth: string;
  verified: boolean;
  verificationInReview: boolean;
  profileCompletion: number;
  pushDisabled: boolean;
  friendStatus: string;
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
      urlFormat: string;
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
  profilePictureUrl?: string;
}

// ─── Linkup Event ─────────────────────────────────────────────────────────────
// GET {{LinkupBaseUrl}}/api/v2.0/Linkups/GetBySlug/{slug}

export interface Attendee {
  id: string;
  name: string;
  profilePictureUrl?: string;
}

export interface GooglePlace {
  id: string;
  name: string;
  formattedAddress: string;
  rating?: number;
  userRatingCount?: number;
  displayName: {
    text: string;
    languageCode: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  imageUrl?: string;
}

export interface LinkupEvent {
  id: string;
  title: string;
  description: string;

  picture: string;
  pictureThumbnailUrl: string;

  ownerId: string;
  ownerName: string;
  ownerVerified: boolean;

  startTime: string;
  endTime: string;
  formattedStartTime: string;
  formattedEndTime: string;
  timeZoneId: string;
  timeZoneName: string;
  gmtOffset: string;

  googlePlace: GooglePlace;
  sortAddress: string;
  aproxLatitude: number;
  aproxLongitude: number;
  city: string;
  area: string;
  country: string;

  attendees: Attendee[];
  attendeeTotalCount: number;
  coHosts: Attendee[];

  isFree: boolean;
  price: number;

  started: boolean;
  ended: boolean;
  expired: boolean;
  open: boolean;
  isPrivate: boolean;
  requiresApproval: boolean;
  flagged: boolean;

  categoryId: number;
  category: {
    id: number;
    name: string;
    emoji: string;
  };

  isOwner: boolean;
  isCoHost: boolean;
  isAttending: boolean;
  isInvited: boolean;
  requestToJoinSent: boolean;
  pendingRequests: number;

  capacity: number; // 0 = unlimited
  distance?: number;
  distanceKM?: number;
  channelName: string;
  slug?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function calcAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

export function buildSocialUrl(urlFormat: string, username: string): string {
  return urlFormat.replace("{0}", username);
}