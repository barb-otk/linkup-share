"use client";

import { useState } from "react";
import { DeviceType } from "@/lib/device";
import { getProfileDeepLink, getStoreUrl } from "@/lib/deeplink";

interface Props {
  readonly profileUsername: string;
  readonly firstName?: string;
  readonly device: DeviceType;
  readonly isSelf?: boolean;
}

export default function AddFriendButton({ profileUsername, firstName, device, isSelf }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isDesktop = device === "desktop";
  const deepLink = getProfileDeepLink(profileUsername, isSelf);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=201x201&data=${encodeURIComponent(deepLink)}`;

  function openModal() {
    setShowModal(true);
    setTimeout(() => setModalVisible(true), 10);
  }

  function closeModal() {
    setModalVisible(false);
    setTimeout(() => setShowModal(false), 300);
  }

  function handleClick() {
    if (isDesktop) {
      openModal();
      return;
    }
    window.location.href = deepLink;
    setTimeout(() => {
      window.location.href = getStoreUrl(device === "mobile-ios" ? "ios" : "android");
    }, 2000);
  }

  const buttonEl = (
    <button
      onClick={handleClick}
      className="w-[183px] h-[45px] text-white text-center font-buckin-black text-[18px] cursor-pointer"
      style={{
        borderRadius: "999px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        background: "linear-gradient(135deg, #8325FF 0%, #6B40FF 50%, #4993FF 100%)",
        boxShadow: "0 4px 11.9px 0 rgba(0, 0, 0, 0.15)",
        lineHeight: "41px",
      }}
    >
      Add friend
    </button>
  );

  const modal = showModal && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[62.5px] bg-black/10"
      style={{ opacity: modalVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
      onClick={closeModal}
    >
      <div
        className="relative backdrop-blur-[100px] bg-white/[0.14] border border-white/15 rounded-[27px] px-[59px] py-[35px] w-[319px] flex flex-col gap-[26px] items-center"
        style={{
          transform: modalVisible ? "scale(1)" : "scale(0.95)",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          opacity: modalVisible ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 w-[28px] h-[28px] rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
        >
          <CloseIcon />
        </button>
        <p className="text-white text-[20px] font-buckin-black tracking-[-0.3px] text-center" style={{ lineHeight: "21px" }}>
          Scan with your phone to
          <br />
          download Linkup and
          <br />
          connect with {firstName ?? "them"}
        </p>
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-white p-3">
          <img src={qrUrl} alt="QR Code" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <>
        {buttonEl}
        {modal}
      </>
    );
  }

  return (
    <>
      {buttonEl}
      {modal}
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