export type DateStatus = "happening_now" | "already_happened" | "upcoming";

export function getDateStatus(startTime: string, endTime: string): DateStatus {
  const now = Date.now();
  const s = new Date(startTime).getTime();
  const e = new Date(endTime).getTime();
  if (now >= s && now <= e) return "happening_now";
  if (now > e) return "already_happened";
  return "upcoming";
}

export function formatEventDate(
  startTime: string,
  endTime: string,
  timeZoneId: string,
  timeZoneName?: string
): { mainLine: string; subLine: string } {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  const status = getDateStatus(startTime, endTime);

  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: timeZoneId, ...opts }).format(d);

  const timeOpts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  const dateOpts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const weekdayOpts: Intl.DateTimeFormatOptions = { weekday: "long" };

  const startTimeStr = fmt(start, timeOpts);
  const endTimeStr = fmt(end, timeOpts);
  // Use timeZoneName if provided, stripping the GMT offset part
  // e.g. "Central Indonesia Time (GMT+8)" → "Central Indonesia Time"
  const timeZoneShort = timeZoneName
    ? timeZoneName.replace(/\s*\(.*?\)/, "").trim()
    : fmt(start, { timeZoneName: "long" }).split(", ").pop()?.trim() ?? timeZoneId;

  const isSameDay =
    fmt(start, { day: "numeric", month: "numeric", year: "numeric" }) ===
    fmt(end, { day: "numeric", month: "numeric", year: "numeric" });

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = fmt(start, dateOpts) === fmt(now, dateOpts);
  const isTomorrow = fmt(start, dateOpts) === fmt(tomorrow, dateOpts);
  const diffMs = start.getTime() - now.getTime();
  const isLaterThisWeek = diffMs > 0 && diffMs < 6 * 24 * 60 * 60 * 1000;

  // Already happened
  if (status === "already_happened") {
    const mainLine = isSameDay
      ? `Happened – ${fmt(start, dateOpts)}, ${startTimeStr} – ${endTimeStr}`
      : `Happened – ${fmt(start, dateOpts)}, ${startTimeStr} – ${fmt(end, dateOpts)}, ${endTimeStr}`;
    const subLine = isSameDay
      ? `${fmt(start, weekdayOpts)} · ${timeZoneShort}`
      : `${fmt(start, weekdayOpts)} – ${fmt(end, weekdayOpts)} · ${timeZoneShort}`;
    return { mainLine, subLine };
  }

  // Happening now
  if (status === "happening_now") {
    const mainLine = isSameDay
      ? `Happening now – ${endTimeStr}`
      : `Happening now – ${fmt(end, dateOpts)}, ${endTimeStr}`;
    const subLine = isSameDay
      ? `${fmt(start, weekdayOpts)} · ${timeZoneShort}`
      : `${fmt(start, weekdayOpts)} – ${fmt(end, weekdayOpts)} · ${timeZoneShort}`;
    return { mainLine, subLine };
  }

  // Upcoming
  let dayLabel: string;
  if (isToday) dayLabel = "Today";
  else if (isTomorrow) dayLabel = "Tomorrow";
  else if (isLaterThisWeek) dayLabel = fmt(start, weekdayOpts);
  else dayLabel = fmt(start, dateOpts);

  const mainLine = isSameDay
    ? `${dayLabel}, ${startTimeStr} – ${endTimeStr}`
    : `${dayLabel}, ${startTimeStr} – ${fmt(end, dateOpts)}, ${endTimeStr}`;

  const subLine = isSameDay
    ? `${fmt(start, weekdayOpts)} · ${timeZoneShort}`
    : `${fmt(start, weekdayOpts)} – ${fmt(end, weekdayOpts)} · ${timeZoneShort}`;

  return { mainLine, subLine };
}