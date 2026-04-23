import { PublicUserLinkup, PublicUserLinkupParticipant } from "@/types";

interface Props {
  readonly linkups: PublicUserLinkup[];
  readonly ownerName: string;
  readonly profileId: string;
}

export default function ProfileLinkups({ linkups, ownerName, profileId }: Props) {
  if (!linkups || linkups.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <span className="text-white text-[13px] font-bold leading-[23.5px] tracking-[0.39px]">
        Linkups{" "}
        <span className="text-white/50">{linkups.length}</span>
      </span>

      <div className="flex flex-col gap-4">
        {linkups.map((linkup) => (
          <LinkupCard key={linkup.id} linkup={linkup} ownerName={ownerName} profileId={profileId} />
        ))}
      </div>
    </div>
  );
}

function LinkupCard({ linkup, ownerName, profileId }: { readonly linkup: PublicUserLinkup; readonly ownerName: string; readonly profileId: string }) {
  const date = formatLinkupDate(linkup.startTime);
  const location = extractCity(linkup.sortAddress);
  const avatars = linkup.firstParticipants.slice(0, 4);
  const totalCount = linkup.participantsCount;
  const isProfileHost = linkup.ownerId === profileId;
  const hostName = isProfileHost ? ownerName.split(" ")[0] : null;

  return (
    <a href={`/linkup/${linkup.id}`} className="relative flex items-center gap-4 rounded-[34px] border border-white/15 bg-white/5 pl-[14px] py-[14px] cursor-pointer">

      {/* Thumbnail */}
      <div className="relative w-[108px] h-[108px] shrink-0 rounded-[21px] overflow-hidden">
        <img
          src={linkup.pictureThumbnailUrl || linkup.picture}
          alt={linkup.title}
          className="w-full h-full object-cover"
        />
        {/* Crown chip */}
        {hostName && (
          <div className="absolute top-[6px] left-[6px] flex items-center gap-[6px] bg-black/45 backdrop-blur-[50px] border border-white/5 rounded-[25px] px-[6px] py-[5px]">
            <div className="w-[20px] h-[20px] rounded-full bg-white/15 border-[0.5px] border-white/25 flex items-center justify-center shrink-0 p-[2px]">
              <img src="/icons/icon-crown.svg" alt="" className="w-full h-full rotate-[-40deg]" />
            </div>
            <span className="text-white text-[10px] font-medium tracking-[0.5px] leading-none max-w-[58px] truncate">
              {hostName}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[8px] w-[165px] shrink-0">
        {/* Title */}
        <p className="text-white text-[14px] font-extrabold tracking-[-0.21px] leading-[17px] line-clamp-2" style={{ fontFeatureSettings: "'case' 1" }}>
          {linkup.title}
        </p>

        {/* Date · Location */}
        <div className="flex items-center gap-[6px] min-w-0">
          <span className="text-white text-[12px] font-normal tracking-[-0.18px] leading-[20px] whitespace-nowrap shrink-0">{date}</span>
          {location && <span className="w-[2px] h-[2px] rounded-full bg-white/50 shrink-0" />}
          {location && <span className="text-white/50 text-[12px] font-light tracking-[0.36px] leading-[16px] truncate">{location}</span>}
        </div>

        {/* Avatars */}
        <div className="flex items-center">
          {avatars.map((p, i) => (
            <div
              key={p.id ?? i}
              className="relative w-[25px] h-[25px] rounded-full overflow-hidden shrink-0 -ml-[9px] first:ml-0"
            >
              <ParticipantAvatar participant={p} />
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px #FFFFFF0D" }} />
            </div>
          ))}
          {totalCount > avatars.length && (
            <div
              className="w-[25px] h-[25px] rounded-full -ml-[9px] flex items-center justify-center shrink-0 backdrop-blur-[10px]"
              style={{ backgroundColor: "rgba(75,72,115,0.25)" }}
            >
              <span className="text-white text-[9px] font-semibold tracking-[-0.135px]">
                +{Math.min(totalCount - avatars.length, 99)}
              </span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

function ParticipantAvatar({ participant }: { readonly participant: PublicUserLinkupParticipant }) {
  const src = participant.profilePhotoThumbnailUrl ?? participant.profilePhoto;
  if (src) {
    return <img src={src} alt={participant.name} className="w-full h-full object-cover" />;
  }
  return (
    <div className="w-full h-full bg-white/20 flex items-center justify-center text-white font-semibold text-[10px]">
      {participant.name?.[0] ?? "?"}
    </div>
  );
}

function formatLinkupDate(startTime: string): string {
  const start = new Date(startTime);
  const now = new Date();
  const diffDays = Math.floor((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const timeStr = start.toLocaleTimeString("en-GB", {
    hour: "numeric",
    ...(start.getMinutes() !== 0 && { minute: "2-digit" }),
    hour12: true,
  }).replace(" ", "");

  if (diffDays === 0) return `Today, ${timeStr}`;
  if (diffDays === 1) return `Tomorrow, ${timeStr}`;
  if (diffDays > 1 && diffDays < 7) return `${start.toLocaleDateString("en-GB", { weekday: "long" })}, ${timeStr}`;
  return `${start.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}, ${timeStr}`;
}

// Skip Plus Codes (e.g. "94GJ+5H2") and street-level parts, return first city-like segment
function extractCity(sortAddress: string): string {
  if (!sortAddress) return "";
  const parts = sortAddress.split(",").map((p) => p.trim());
  for (const part of parts) {
    if (!part.includes("+") && !/^\d/.test(part) && !/^(jl|jln|jalan|st|rd|blk|no)\b/i.test(part) && part.length > 2) {
      return part;
    }
  }
  return parts[0];
}

function ArrowIcon() {
  return <img src="/icons/icon-share.svg" alt="" className="w-[14px] h-[12px]" />;
}
