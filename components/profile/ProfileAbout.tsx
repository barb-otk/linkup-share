"use client";

import { useState } from "react";

const CHAR_LIMIT = 130;

interface Props {
  bio: string;
}

export default function ProfileAbout({ bio }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!bio) return null;

  const isLong = bio.length > CHAR_LIMIT;
  const truncated = isLong
    ? bio.slice(0, bio.lastIndexOf(" ", CHAR_LIMIT))
    : bio;

  return (
    <div className="rounded-[26px] border border-white/15 bg-white/[0.07] backdrop-blur-[31.8px] px-5 py-4">
      <span className="block text-white text-[14px] font-bold mb-2">
        About me
      </span>
      <p className="text-white/80 text-[14px] leading-[1.6]">
        {expanded || !isLong ? bio : <>{truncated}…{" "}</>}
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-white font-bold inline"
          >
            Read more
          </button>
        )}
      </p>
    </div>
  );
}
