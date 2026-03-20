import { LinkupEvent, Attendee } from "@/types";
import { formatEventDate } from "@/lib/datetime";
import AttendeeAvatarStack from "@/components/shared/AttendeeAvatarStack";

interface Props {
  linkups: LinkupEvent[];
}

export default function ProfileLinkups({ linkups }: Props) {
  if (!linkups || linkups.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Section header */}
      <span className="text-white text-[15px] font-bold">
        Linkups{" "}
        <span className="text-white/50 font-normal">{linkups.length}</span>
      </span>

      {/* Vertical list */}
      <div className="flex flex-col gap-3">
        {linkups.map((linkup) => (
          <LinkupCard key={linkup.id} linkup={linkup} />
        ))}
      </div>
    </div>
  );
}

function LinkupCard({ linkup }: { readonly linkup: LinkupEvent }) {
  const { mainLine } = formatEventDate(
    linkup.startTime,
    linkup.endTime,
    linkup.timeZoneId,
    linkup.timeZoneName
  );

  const location = linkup.city || linkup.area || linkup.sortAddress;

  const allAttendees: Attendee[] = [
    { id: linkup.ownerId, name: linkup.ownerName },
    ...linkup.attendees,
  ];

  return (
    <div className="flex rounded-[16px] overflow-hidden border border-white/[0.10] bg-white/[0.07]">
      {/* Thumbnail */}
      <div className="relative w-[130px] shrink-0">
        <img
          src={linkup.pictureThumbnailUrl || linkup.picture}
          alt={linkup.title}
          className="w-full h-full object-cover"
        />
        {/* Host chip */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-0.5 max-w-[calc(100%-12px)]">
          <div className="w-[18px] h-[18px] rounded-full bg-white/20 flex items-center justify-center text-white text-[9px] font-semibold shrink-0 overflow-hidden">
            {linkup.ownerName?.[0] ?? "?"}
          </div>
          <span className="text-white text-[11px] font-medium truncate">
            {linkup.ownerName?.split(" ")[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 px-3 py-3 min-w-0">
        {/* Title */}
        <p className="text-white text-[14px] font-semibold leading-tight line-clamp-2 mb-1.5">
          {linkup.title}
        </p>

        {/* Date + Location */}
        <p className="text-white/50 text-[12px] mb-2 line-clamp-1">
          {mainLine}
          {location && (
            <span> · {location}</span>
          )}
        </p>

        {/* Attendees + Share */}
        <div className="flex items-center justify-between">
          <AttendeeAvatarStack
            attendees={allAttendees}
            totalCount={linkup.attendeeTotalCount + 1}
            size="sm"
          />
          <button className="text-white/50 hover:text-white transition-colors">
            <ShareIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M6.5 5H5C4.17 5 3.5 5.67 3.5 6.5V13C3.5 13.83 4.17 14.5 5 14.5H13C13.83 14.5 14.5 13.83 14.5 13V6.5C14.5 5.67 13.83 5 13 5H11.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M9 3.5V10.5M9 3.5L6.5 6M9 3.5L11.5 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
