import { LinkupEvent } from "@/types";

interface Props {
  event: LinkupEvent;
}

export default function LinkupAttendees({ event }: Props) {
  const { attendees, ownerId, ownerName } = event;

  const host = { userId: ownerId, id: ownerId, name: ownerName, userName: event.ownerUsername, picture: event.ownerPictureUrl, verified: false };
  const hostAlreadyInList = attendees.some((a) => (a.userId ?? a.id) === ownerId);
  const allAttendees = hostAlreadyInList ? attendees : [...attendees, host];
  const total = allAttendees.length;

  return (
    <div id="attendees-section" className="rounded-[26px] border border-white/15 bg-white/5 px-5 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <img src="/icons/icon-friends.svg" alt="" className="w-[22px] h-[22px] shrink-0" />
        <span className="text-white text-[14px] font-bold">
          Attendees{" "}
          <span className="text-white/50 font-normal">({total})</span>
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-x-3 gap-y-6">
        {allAttendees.map((attendee, i) => {
          const isHost = (attendee.userId ?? attendee.id) === ownerId;

          return (
            <div key={attendee.userId ?? attendee.id ?? `attendee-${i}`} className="flex flex-col items-center">
              {/* Avatar with badges */}
              <div
                className="relative w-[59px] h-[59px] mb-[10px] rounded-full bg-cover bg-center bg-white/10"
                style={attendee.picture ? { backgroundImage: `url(${attendee.picture})` } : {}}
              >
                {!attendee.picture && (
                  <div className="w-full h-full rounded-full flex items-center justify-center text-white text-lg font-semibold">
                    {attendee.name?.[0] ?? "?"}
                  </div>
                )}
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px #FFFFFF0D" }} />

                {/* Crown badge — host, top right */}
                {isHost && (
                  <div className="absolute top-[-6px] right-[-6px] w-[24px] h-[24px] rounded-[999px] backdrop-blur-[5px] bg-white/10 border border-white/5 flex flex-col items-center justify-center py-[3px]">
                    <img src="/icons/icon-crown.svg" alt="Host" className="w-[13.5px] h-[11.6px]" />
                  </div>
                )}

                {/* Verified badge — bottom right */}
                {attendee.verified && (
                  <img
                    src="/icons/icon-verified.svg"
                    alt="Verified"
                    className="absolute bottom-0 right-0 w-4 h-4"
                  />
                )}
              </div>

              <span className="text-white text-[12px] font-medium text-center leading-4 line-clamp-1 w-full">
                {attendee.name?.split(" ")[0] ?? "?"}
              </span>

              <span className="text-white/50 font-normal text-[9px] leading-[16px] tracking-[0.03em] text-center line-clamp-1 w-full">
                @{attendee.userName ?? attendee.name?.toLowerCase().replace(/\s+/g, "") ?? ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}