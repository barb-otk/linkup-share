import { LinkupEvent } from "@/types";
import { DeviceType } from "@/lib/device";
import { getAttendeeDisplay } from "@/lib/attendees";
import AttendeeAvatarStack from "@/components/shared/AttendeeAvatarStack";
import JoinButton from "@/components/linkup/JoinButton";

interface Props {
  event: LinkupEvent;
  device: DeviceType;
  eventColor: [number, number, number];
}

export default function LinkupHero({ event, device, eventColor }: Props) {
  const host = { id: event.ownerId, name: event.ownerName, picture: event.ownerPictureUrl };
  const hostAlreadyInList = event.attendees.some((a) => (a.userId ?? a.id) === event.ownerId);
  const allAttendees = hostAlreadyInList ? event.attendees : [...event.attendees, host];

  const { avatars, totalCount } = getAttendeeDisplay(
    event.ownerName,
    allAttendees,
    allAttendees.length
  );

  const isDesktop = device === "desktop";

  return (
    <div className="relative w-full rounded-[26px] overflow-hidden">
      <div className="relative w-full aspect-[315/399]">
        <img
          src={event.picture}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(${eventColor[0]},${eventColor[1]},${eventColor[2]},0) 36%, rgb(${eventColor[0]},${eventColor[1]},${eventColor[2]}) 75%)` }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 p-8">
        <AttendeeAvatarStack
          attendees={avatars}
          totalCount={totalCount}
          size="md"
        />
        <h1 className="text-white text-[28px] font-black tracking-[-0.42px] leading-[1.2] text-center mb-2">
          {event.title}
        </h1>
        {isDesktop && (
          <div className="w-[70%]">
            <JoinButton eventId={event.id} device={device} eventColor={eventColor} />
          </div>
        )}
      </div>
    </div>
  );
}