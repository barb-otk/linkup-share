import { LinkupEvent } from "@/types";
import { DeviceType } from "@/lib/device";
import { getAttendeeDisplay } from "@/lib/attendees";
import AttendeeAvatarStack from "@/components/shared/AttendeeAvatarStack";
import JoinButton from "@/components/linkup/JoinButton";

interface Props {
  event: LinkupEvent;
  device: DeviceType;
}

export default function LinkupHero({ event, device }: Props) {
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
    <div className="relative w-full rounded-[26px] overflow-hidden border border-white/15">
      <div className="relative w-full aspect-[315/399]">
        <img
          src={event.picture}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[36%] to-black/80 to-[100%]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-5 px-4">
        <AttendeeAvatarStack
          attendees={avatars}
          totalCount={totalCount}
          size="md"
        />
        <h1 className="text-white text-[28px] font-black tracking-[-0.42px] text-center">
          {event.title}
        </h1>
        {isDesktop && (
          <div className="w-[70%]">
            <JoinButton eventId={event.id} device={device} />
          </div>
        )}
      </div>
    </div>
  );
}