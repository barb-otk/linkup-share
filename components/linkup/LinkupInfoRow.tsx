import { LinkupEvent } from "@/types";
import { formatEventDate } from "@/lib/datetime";
import { getAttendeeDisplay } from "@/lib/attendees";
import AttendeeAvatarStack from "@/components/shared/AttendeeAvatarStack";

interface Props {
  event: LinkupEvent;
}

export default function LinkupInfoRow({ event }: Props) {
  const host = { id: event.ownerId, name: event.ownerName, picture: event.ownerPictureUrl };
  const hostAlreadyInList = event.attendees.some((a) => (a.userId ?? a.id) === event.ownerId);
  const allAttendees = hostAlreadyInList ? event.attendees : [...event.attendees, host];

  const { label: attendeeSubLabel } = getAttendeeDisplay(
    event.ownerName,
    allAttendees,
    allAttendees.length
  );

  const { mainLine, subLine } = formatEventDate(
    event.startTime,
    event.endTime,
    event.timeZoneId,
    event.timeZoneName
  );

  const locationName = event.googlePlace?.displayName?.text ?? event.city;

  const countryName = event.country
    ? new Intl.DisplayNames(["en"], { type: "region" }).of(event.country) ?? event.country
    : null;

  const locationSub = event.isFree
    ? countryName
    : "Exact location available after joining";

  const total = allAttendees.length;
  const attendeeCountLabel = total === 1 ? "1 attendee" : `${total} attendees`;

  return (
    <div className="rounded-[26px] border border-white/15 bg-white/[0.07] backdrop-blur-[31.8px] px-5 py-4 flex flex-col gap-4">

      {/* Attendees */}
      <div className="flex items-center gap-3">
        <img src="/icons/icon-hand.svg" alt="" className="w-6 h-6 shrink-0" />
        <div className="flex flex-col flex-1">
          <span className="text-white text-[14px] font-medium leading-5">
            {attendeeCountLabel}
          </span>
          <span className="text-white/50 text-[12px] leading-5">
            {attendeeSubLabel}
          </span>
        </div>
        <AttendeeAvatarStack
          attendees={allAttendees}
          totalCount={total}
          size="sm"
        />
      </div>

      {/* Date / time */}
      <div className="flex items-start gap-3">
        <img src="/icons/icon-calendar.svg" alt="" className="w-6 h-6 mt-0.5 shrink-0" />
        <div className="flex flex-col">
          <span className="text-white text-[14px] font-medium leading-5">
            {mainLine}
          </span>
          <span className="text-white/50 text-[12px] leading-5">
            {subLine}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-3">
        <img src="/icons/icon-pin.svg" alt="" className="w-6 h-6 mt-0.5 shrink-0" />
        <div className="flex flex-col">
          <span className="text-white text-[14px] font-medium leading-5">
            {locationName}
          </span>
          {locationSub && (
            <span className="text-white/50 text-[12px] leading-5">
              {locationSub}
            </span>
          )}
        </div>
      </div>

      {/* Price — only for paid events */}
      {!event.isFree && (
        <div className="flex items-start gap-3">
          <img src="/icons/icon-price.svg" alt="" className="w-6 h-6 mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-white text-[14px] font-medium leading-5">
              ${event.price} to join
            </span>
            <span className="text-white/50 text-[12px] leading-5">
              This is a paid linkup
            </span>
          </div>
        </div>
      )}

    </div>
  );
}