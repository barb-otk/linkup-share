import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { fetchLinkupEvent } from "@/lib/api";
import { detectDevice, isMobile } from "@/lib/device";
import { getLinkupDeepLink } from "@/lib/deeplink";
import { extractProfileColor } from "@/lib/extractColor";
import { formatEventDate } from "@/lib/datetime";
import LinkupPageMobile from "@/components/linkup/LinkupPageMobile";
import LinkupPageDesktop from "@/components/linkup/LinkupPageDesktop";

// ─── Open Graph metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: event } = await fetchLinkupEvent(id);
  if (!event) return { title: "Linkup" };

  const { mainLine } = formatEventDate(
    event.startTime,
    event.endTime,
    event.timeZoneId,
    event.timeZoneName
  );
  const location = event.googlePlace?.displayName?.text ?? event.city ?? "";
  const ogDescription = `${mainLine} · ${location}`;

  return {
    title: event.title,
    description: ogDescription,
    openGraph: {
      title: `Check out '${event.title}' on Linkup`,
      description: ogDescription,
      images: event.picture ? [{ url: event.picture }] : [],
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