"use client";

import { DeviceType } from "@/lib/device";
import { getProfileDeepLink, getStoreUrl } from "@/lib/deeplink";

interface Props {
  profileId: string;
  device: DeviceType;
}

export default function AddFriendButton({ profileId, device }: Props) {
  function handleClick() {
    window.location.href = getProfileDeepLink(profileId);

    if (device !== "desktop") {
      setTimeout(() => {
        window.location.href = getStoreUrl(
          device === "mobile-ios" ? "ios" : "android"
        );
      }, 2000);
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-full text-white text-[16px] font-semibold py-4 text-center"
      style={{
        background: "linear-gradient(to right, #8325FF, #6B40FF, #4993FF)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 4px 11.9px rgba(0,0,0,0.15)",
      }}
    >
      Add Friend 👋
    </button>
  );
}
