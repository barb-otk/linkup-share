import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { fetchUserProfile } from "@/lib/api";
import { detectDevice, isMobile } from "@/lib/device";

// ── UI (implemented by Dev B) ─────────────────────────────────────────────────
// import ProfilePageMobile  from "@/components/profile/ProfilePageMobile";
// import ProfilePageDesktop from "@/components/profile/ProfilePageDesktop";

// ─── Open Graph metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ self?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { self } = await searchParams;
  const { data: profile } = await fetchUserProfile(id);
  if (!profile) return { title: "Linkup Profile" };

  const isSelf = self === "true";
  const title = isSelf
    ? `Check out my Linkup profile!`
    : `${profile.name} is on Linkup`;

  return {
    title,
    description: profile.bio,
    openGraph: {
      title,
      description: profile.bio,
      images: [{ url: profile.avatarUrl }],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ self?: string }>;
}) {
  const { id } = await params;
  const { data: profile, error } = await fetchUserProfile(id);
  if (!profile || error) notFound();

  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";
  const device = detectDevice(ua);
  const mobile = isMobile(device);

  // Dev B wires up these components:
  // if (mobile) return <ProfilePageMobile profile={profile} device={device} />;
  // return <ProfilePageDesktop profile={profile} />;

  return (
    <pre className="p-8 text-sm">
      {JSON.stringify({ profile, device }, null, 2)}
    </pre>
  );
}