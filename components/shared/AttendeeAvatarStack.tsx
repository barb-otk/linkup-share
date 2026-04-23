import { Attendee } from "@/types";

interface Props {
  attendees: Attendee[];
  totalCount: number;
  size?: "sm" | "md";
}

export default function AttendeeAvatarStack({
  attendees,
  totalCount,
  size = "md",
}: Props) {
  const dim = size === "sm" ? "w-[25px] h-[25px]" : "w-[29px] h-[29px]";
  const text = size === "sm" ? "text-[9px]" : "text-[10px]";

  const showAll = totalCount <= 5;
  const visible = showAll ? attendees.slice(0, 5) : attendees.slice(0, 4);
  const overflowCount = showAll ? 0 : totalCount - 4;

  const pillClass = `bg-white/10 backdrop-blur-[20px]`;

  return (
    <div className="flex items-center">
      {visible.map((attendee, i) => (
        <div
          key={attendee.userId ?? attendee.id ?? `attendee-${i}`}
          className={`relative ${dim} rounded-full overflow-hidden shrink-0 -ml-[9px] first:ml-0`}
        >
          {attendee.picture ? (
            <img
              src={attendee.picture}
              alt={attendee.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full rounded-full flex items-center justify-center text-white font-semibold ${text} ${pillClass}`}>
              {attendee.name?.[0] ?? "?"}
            </div>
          )}
          <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px #FFFFFF0D" }} />
        </div>
      ))}

      {overflowCount > 0 && (
        <div
          className={`${dim} rounded-full flex items-center justify-center shrink-0 -ml-[9px] backdrop-blur-[10px]`}
          style={{ backgroundColor: "rgba(75,72,115,0.25)" }}
        >
          <span className={`text-white ${text} font-semibold tracking-[-0.135px]`}>
            +{Math.min(overflowCount, 99)}
          </span>
        </div>
      )}
    </div>
  );
}