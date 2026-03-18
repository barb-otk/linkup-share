const SCHEME = "linkup://";
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#";
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "#";

export const getLinkupDeepLink = (id: string) => `${SCHEME}linkup/${id}`;
export const getProfileDeepLink = (id: string) => `${SCHEME}profile/${id}`;
export const getStoreUrl = (platform: "ios" | "android") =>
  platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
