"use client";

import { useState } from "react";

const CHAR_LIMIT = 130;

interface Props {
  description: string;
}

export default function LinkupDescription({ description }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > CHAR_LIMIT;

  // Cut at last space before limit to avoid cutting words
  const truncated = isLong
    ? description.slice(0, description.lastIndexOf(" ", CHAR_LIMIT))
    : description;

  return (
    <div className="rounded-[26px] border border-white/15 bg-white/[0.07] backdrop-blur-[31.8px] px-5 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <img src="/icons/icon-edit.svg" alt="" className="w-[17px] h-[18px] shrink-0" />
        <span className="text-white text-[14px] font-bold">Description</span>
      </div>

      {/* Body */}
      <p className="text-white/80 text-[14px] leading-6">
        {expanded || !isLong ? description : <>{truncated}…{" "}</>}
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-white font-semibold inline cursor-pointer"
          >
            See more
          </button>
        )}
      </p>
    </div>
  );
}