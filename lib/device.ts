export type DeviceType = "mobile-ios" | "mobile-android" | "mobile-other" | "desktop";

export function detectDevice(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "mobile-ios";
  if (/android/.test(ua)) return "mobile-android";
  if (/mobile|tablet/.test(ua)) return "mobile-other";
  return "desktop";
}

export function isMobile(device: DeviceType): boolean {
  return device !== "desktop";
}
