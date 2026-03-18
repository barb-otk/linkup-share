export type DateStatus = "happening_now" | "already_happened" | "upcoming";

export function getDateStatus(start: string, end: string): DateStatus {
  const now = Date.now();
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (now >= s && now <= e) return "happening_now";
  if (now > e) return "already_happened";
  return "upcoming";
}

export function formatEventDate(start: string, end: string, timezone: string): string {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { timeZone: timezone, ...opts }).format(d);

  const sameDay = startDate.toDateString() === endDate.toDateString();

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = startDate.toDateString() === now.toDateString();
  const isTomorrow = startDate.toDateString() === tomorrow.toDateString();
  const diffMs = startDate.getTime() - now.getTime();
  const isThisWeek = diffMs > 0 && diffMs < 6 * 24 * 60 * 60 * 1000;

  const timeRange = sameDay
    ? `${fmt(startDate, { hour: "numeric", minute: "2-digit" })} – ${fmt(endDate, { hour: "numeric", minute: "2-digit", timeZoneName: "short" })}`
    : `${fmt(startDate, { month: "short", day: "numeric" })} – ${fmt(endDate, { month: "short", day: "numeric", timeZoneName: "short" })}`;

  if (isToday) return `Today · ${timeRange}`;
  if (isTomorrow) return `Tomorrow · ${timeRange}`;
  if (isThisWeek) return `${fmt(startDate, { weekday: "long" })} · ${timeRange}`;
  return `${fmt(startDate, { month: "long", day: "numeric" })} · ${timeRange}`;
}
