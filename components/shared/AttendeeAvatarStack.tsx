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

  const pillClass = `bg-white/10 border border-white backdrop-blur-[20px]`;

  return (
    <div className="flex items-center">
      {visible.map((attendee, i) => (
        <div
          key={attendee.userId ?? attendee.id ?? `attendee-${i}`}
          className={`relative ${dim} rounded-full overflow-hidden -ml-2 first:ml-0`}
          style={{ zIndex: visible.length - i }}
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
        </div>
      ))}

      {overflowCount > 0 && (
        <div className={`relative ${dim} rounded-full flex items-center justify-center -ml-2 ${pillClass}`}>
          <span className={`text-white ${text} font-semibold tracking-[-0.15px]`}>
            {overflowCount}+
          </span>
        </div>
      )}
    </div>
  );
}