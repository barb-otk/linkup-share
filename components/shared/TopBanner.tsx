"use client";

import { useState, useEffect } from "react";
import { getStoreUrl } from "@/lib/deeplink";
import { DeviceType } from "@/lib/device";

interface Props {
  device: DeviceType;
  deepLink: string;
}

export default function TopBanner({ device, deepLink }: Props) {
  const [attempted, setAttempted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const storeUrl = device === "mobile-ios" ? getStoreUrl("ios") : getStoreUrl("android");
  const isDesktop = device === "desktop";

  function handleClick() {
    if (isDesktop) return;
    window.location.href = deepLink;
    setAttempted(true);
    setTimeout(() => {
      window.location.href = storeUrl;
    }, 2000);
  }

  return (
    <div
      className={`sticky top-0 z-50 flex items-center gap-3 px-4 py-2 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/40 backdrop-blur-[20px] backdrop-saturate-[180%]"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="shrink-0 w-[38px] h-[38px]">
        <img src="/linkup-logo.svg" alt="Linkup" className="w-full h-full object-contain" />
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-white text-[13px] font-medium tracking-[-0.195px] leading-5">
          Linkup: Do more together
        </span>
        <span className="text-white/50 text-[12px] font-normal tracking-[-0.18px] leading-5">
          Open in the linkup app
        </span>
      </div>

      {/* CTA button */}
      {isDesktop ? null : (
        <button
          onClick={handleClick}
          className="shrink-0 bg-[#315aff] text-white text-[13px] font-semibold uppercase px-4 py-1.5 rounded-full whitespace-nowrap"
        >
          {attempted ? "Opening..." : "Download"}
        </button>
      )}
    </div>
  );
}
