import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { fetchLinkupEvent } from "@/lib/api";
import { detectDevice, isMobile } from "@/lib/device";

// ── UI (implemented by Dev B) ─────────────────────────────────────────────────
// import LinkupPageMobile  from "@/components/linkup/LinkupPageMobile";
// import LinkupPageDesktop from "@/components/linkup/LinkupPageDesktop";

// ─── Open Graph metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: event } = await fetchLinkupEvent(id);
  if (!event) return { title: "Linkup" };

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
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

  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";
  const device = detectDevice(ua);
  const mobile = isMobile(device);

  // Dev B wires up these components:
  // if (mobile) return <LinkupPageMobile event={event} device={device} />;
  // return <LinkupPageDesktop event={event} />;

  return (
    <pre className="p-8 text-sm">
      {JSON.stringify({ event, device }, null, 2)}
    </pre>
  );
}