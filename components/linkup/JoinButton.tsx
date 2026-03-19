"use client";

import { DeviceType } from "@/lib/device";
import { getLinkupDeepLink, getStoreUrl } from "@/lib/deeplink";

interface Props {
  eventId: string;
  device: DeviceType;
}

export default function JoinButton({ eventId, device }: Props) {
  function handleJoin() {
    window.location.href = getLinkupDeepLink(eventId);

    setTimeout(() => {
      window.location.href = getStoreUrl(
        device === "mobile-ios" ? "ios" : "android"
      );
    }, 2000);
  }

  return (
    <button
      onClick={handleJoin}
      className="rounded-full text-white text-[16px] font-semibold py-4 px-[43px] text-center"
      style={{
        background: "linear-gradient(to right, #8325FF, #6B40FF, #4993FF)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 4px 11.9px rgba(0,0,0,0.15)",
      }}
    >
      Ask to join 👋
    </button>
  );
}