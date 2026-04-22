"use client";

import { useEffect, useRef, useState } from "react";
import { DeviceType } from "@/lib/device";
import { getLinkupDeepLink, getStoreUrl } from "@/lib/deeplink";

interface Props {
  eventId: string;
  device: DeviceType;
  eventColor: [number, number, number];
}

export default function JoinButton({ eventId, device, eventColor }: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const isDesktop = device === "desktop";
  const deepLink = getLinkupDeepLink(eventId);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=201x201&data=${encodeURIComponent(deepLink)}`;
  const [r, g, b] = eventColor;

  useEffect(() => {
    if (isDesktop) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFixed(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (anchorRef.current) observer.observe(anchorRef.current);
    return () => observer.disconnect();
  }, []);

  function openModal() {
    setShowModal(true);
    setTimeout(() => setModalVisible(true), 10);
  }

  function closeModal() {
    setModalVisible(false);
    setTimeout(() => setShowModal(false), 300);
  }

  function handleJoin() {
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
      onClick={handleJoin}
      className={`w-full rounded-full text-white text-[18px] font-buckin-black text-center cursor-pointer ${isDesktop ? "h-[41px]" : "h-[50px]"}`}
      style={{
        background: "linear-gradient(135deg, #8325FF 0%, #6B40FF 50%, #4993FF 100%)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 4px 11.9px rgba(0,0,0,0.15)",
      }}
    >
      Ask to join 👋
    </button>
  );

  const modal = showModal && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[62.5px] bg-black/10"
      style={{ opacity: modalVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
      onClick={closeModal}
    >
      <div
        className="relative backdrop-blur-[100px] bg-white/[0.14] border border-white/15 rounded-[27px] px-[59px] py-[35px] w-[319px] flex flex-col gap-[26px] items-center shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.05)]"
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
          join this linkup
        </p>
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-white p-3">
          <img src={qrUrl} alt="QR Code" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div className="flex justify-center">
        {buttonEl}
        {modal}
      </div>
    );
  }

  return (
    <>
      <div ref={anchorRef} className="h-px w-full mt-3" />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 pt-6 pb-8 flex justify-center"
        style={{
          opacity: isFixed ? 1 : 0,
          pointerEvents: isFixed ? "auto" : "none",
          transition: "opacity 0.5s ease",
          background: `linear-gradient(to top, rgb(${r},${g},${b}) 0%, transparent 100%)`,
        }}
      >
        <div className="w-[183px]">{buttonEl}</div>
      </div>
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