import { LinkupEvent } from "@/types";
import { DeviceType } from "@/lib/device";
import { getAttendeeDisplay } from "@/lib/attendees";
import JoinButton from "@/components/linkup/JoinButton";
import AttendeeAvatarStack from "@/components/shared/AttendeeAvatarStack";

interface Props {
  event: LinkupEvent;
  device: DeviceType;
}

export default function LinkupHero({ event, device }: Props) {
  const allAttendees = [
    { id: event.ownerId, name: event.ownerName, profilePictureUrl: undefined },
    ...event.attendees,
  ];

  const { avatars, totalCount } = getAttendeeDisplay(
    event.ownerName,
    allAttendees,
    allAttendees.length
  );

  const overflowCount = totalCount > avatars.length ? totalCount - avatars.length : 0;

  return (
    <div className="relative w-full rounded-[26px] overflow-hidden border border-white/15">
      {/* Cover image */}
      <div className="relative w-full aspect-[315/399]">
        <img
          src={event.picture}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[36%] to-black/80 to-[100%]" />
      </div>

      {/* Avatar stack + title + button */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-5 px-4">
        <AttendeeAvatarStack
          attendees={avatars}
          totalCount={totalCount}
          size="md"
        />

        {/* Event title */}
        <h1 className="text-white text-[28px] font-black tracking-[-0.42px] text-center">
          {event.title}
        </h1>

        {/* CTA button */}
        <div className="w-full flex justify-center">
          <JoinButton eventId={event.id} device={device} />
        </div>
      </div>
    </div>
  );
}