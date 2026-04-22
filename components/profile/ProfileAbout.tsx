"use client";

import { useState } from "react";

const CHAR_LIMIT = 130;

interface Props {
  readonly bio: string;
}

export default function ProfileAbout({ bio }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!bio) return null;

  const isLong = bio.length > CHAR_LIMIT;
  const truncated = isLong
    ? bio.slice(0, bio.lastIndexOf(" ", CHAR_LIMIT))
    : bio;

  return (
    <div className="rounded-[26px] border border-white/15 bg-white/[0.07] px-[21px] py-[15px] flex flex-col gap-1">
      <span className="block text-white text-[13px] font-bold leading-[23.5px] tracking-[0.39px]">
        About me
      </span>
      <p className="text-white text-[12px] font-light leading-[23.5px] tracking-[0.36px]">
        {expanded || !isLong ? bio : <>{truncated}…{" "}</>}
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-white font-extrabold inline"
          >
            Read more
          </button>
        )}
        {isLong && expanded && (
          <>{" "}<button
            onClick={() => setExpanded(false)}
            className="text-white font-extrabold inline"
          >
            Read less
          </button></>
        )}
      </p>
    </div>
  );
}
