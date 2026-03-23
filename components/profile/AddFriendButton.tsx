"use client";

import { DeviceType } from "@/lib/device";
import { getProfileDeepLink, getStoreUrl } from "@/lib/deeplink";

interface Props {
  readonly profileId: string;
  readonly device: DeviceType;
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
      className="w-[183px] text-white text-center font-buckin-black text-[17px]"
      style={{
        borderRadius: "999px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        background: "linear-gradient(135deg, #8325FF 0%, #6B40FF 50%, #4993FF 100%)",
        boxShadow: "0 4px 11.9px 0 rgba(0, 0, 0, 0.15)",
        lineHeight: "45px",
      }}
    >
      Add friend
    </button>
  );
}
