const BASE_URL = "https://linkupapp.io";
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#";
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "#";

export const getLinkupDeepLink = (slug: string) => `${BASE_URL}/l/${slug}`;
export const getProfileDeepLink = (userName: string, self?: boolean) =>
  `${BASE_URL}/@${userName}${self ? "?self=true" : ""}`;
export const getStoreUrl = (platform: "ios" | "android") =>
  platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
