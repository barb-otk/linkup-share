"use client";

import { useState } from "react";
import { DeviceType } from "@/lib/device";
import { getProfileDeepLink, getStoreUrl } from "@/lib/deeplink";

interface Props {
  readonly profileUsername: string;
  readonly firstName?: string;
  readonly device: DeviceType;
}

export default function AddFriendButton({ profileUsername, firstName, device }: Props) {
  const [showModal, setShowModal] = useState(false);
  const isDesktop = device === "desktop";
  const deepLink = getProfileDeepLink(profileUsername);

  function handleClick() {
    if (isDesktop) {
      setShowModal(true);
      return;
    }
    window.location.href = deepLink;
    setTimeout(() => {
      window.location.href = getStoreUrl(device === "mobile-ios" ? "ios" : "android");
    }, 2000);
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=201x201&data=${encodeURIComponent(deepLink)}`;

  return (
    <>
      <button
        onClick={handleClick}
        className="w-[183px] text-white text-center font-buckin-black text-[17px] cursor-pointer"
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

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[62.5px] bg-black/10"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative backdrop-blur-[100px] bg-white/[0.14] border border-white/15 rounded-[27px] px-[59px] py-[35px] w-[319px] flex flex-col gap-[26px] items-center shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.05)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 w-[21px] h-[21px] rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
            >
              <CloseIcon />
            </button>

            {/* Title */}
            <p className="text-white text-[20px] font-buckin-black tracking-[-0.3px] text-center" style={{ lineHeight: "21px" }}>
              Scan with your phone to{" "}
              <br />
              download Linkup and
              <br />
              connect with {firstName ?? "them"}
            </p>

            {/* QR Code */}
            <div className="w-full aspect-square rounded-lg overflow-hidden">
              <img src={qrUrl} alt="QR Code" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
