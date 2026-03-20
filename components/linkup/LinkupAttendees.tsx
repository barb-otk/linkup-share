import { LinkupEvent } from "@/types";

interface Props {
  event: LinkupEvent;
}

export default function LinkupAttendees({ event }: Props) {
  const { attendees, ownerId, ownerName } = event;

  const host = { userId: ownerId, id: ownerId, name: ownerName, picture: event.ownerPictureUrl };
  const hostAlreadyInList = attendees.some((a) => (a.userId ?? a.id) === ownerId);
  const allAttendees = hostAlreadyInList ? attendees : [...attendees, host];
  const total = allAttendees.length;

  return (
    <div className="rounded-[26px] border border-white/15 bg-white/[0.07] backdrop-blur-[31.8px] px-5 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <img src="/icons/icon-friends.svg" alt="" className="w-[22px] h-[22px] shrink-0" />
        <span className="text-white text-[14px] font-medium">
          Attendees{" "}
          <span className="text-white/50">({total})</span>
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-x-3 gap-y-6">
        {allAttendees.map((attendee, i) => (
          <div key={attendee.userId ?? attendee.id ?? `attendee-${i}`} className="flex flex-col items-center gap-1">
            <div className="w-[59px] h-[59px] rounded-full border-1.5 border-white/15 p-[1px]">
              <div className="w-full h-full rounded-full overflow-hidden">
                {attendee.picture ? (
                  <img
                    src={attendee.picture}
                    alt={attendee.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/10 backdrop-blur-[20px] flex items-center justify-center text-white text-lg font-semibold">
                    {attendee.name?.[0] ?? "?"}
                  </div>
                )}
              </div>
            </div>
            <span className="text-white text-[12px] font-medium text-center leading-4 line-clamp-1 w-full">
              {attendee.name?.split(" ")[0] ?? "?"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}