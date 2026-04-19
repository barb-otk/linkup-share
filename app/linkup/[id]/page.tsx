import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { fetchLinkupEvent } from "@/lib/api";
import { detectDevice, isMobile } from "@/lib/device";
import { extractProfileColor } from "@/lib/extractColor";
import LinkupPageMobile from "@/components/linkup/LinkupPageMobile";
import LinkupPageDesktop from "@/components/linkup/LinkupPageDesktop";

function formatOgDate(startTime: string, timeZoneId: string): string {
  const start = new Date(startTime);
  const now = new Date();
  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: timeZoneId, ...opts }).format(d);
  const dateOpts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const isToday = fmt(start, dateOpts) === fmt(now, dateOpts);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = fmt(start, dateOpts) === fmt(tomorrow, dateOpts);
  const diffMs = start.getTime() - now.getTime();
  const isThisWeek = diffMs > 0 && diffMs < 6 * 24 * 60 * 60 * 1000;
  const dayLabel = isToday ? "Today"
    : isTomorrow ? "Tomorrow"
    : isThisWeek ? fmt(start, { weekday: "long" })
    : fmt(start, dateOpts);
  const timeStr = fmt(start, { hour: "2-digit", minute: "2-digit" });
  return `${dayLabel} at ${timeStr}`;
}

// ─── Open Graph metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: event } = await fetchLinkupEvent(id);
  if (!event) return { title: "Linkup" };

  const ogDescription = formatOgDate(event.startTime, event.timeZoneId);

  return {
    title: event.title,
    description: ogDescription,
    openGraph: {
      title: `Check out \u201C${event.title}\u201D on Linkup`,
      description: ogDescription,
      images: event.picture ? [{ url: `/og/linkup?photo=${encodeURIComponent(event.picture)}` }] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LinkupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: event, error } = await fetchLinkupEvent(id);
  if (!event || error) notFound();

  const [headersList, eventColor] = await Promise.all([
    headers(),
    extractProfileColor(event.picture ?? ""),
  ]);

  console.log("eventColor:", eventColor);

  const ua = headersList.get("user-agent") ?? "";
  const device = detectDevice(ua);
  const mobile = isMobile(device);

  if (mobile) return <LinkupPageMobile event={event} device={device} eventColor={eventColor} />;
  return <LinkupPageDesktop event={event} device={device} eventColor={eventColor} />;
}