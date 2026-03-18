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
  params: { id: string };
  searchParams: { self?: string };
}): Promise<Metadata> {
  const { data: profile } = await fetchUserProfile(params.id);
  if (!profile) return { title: "Linkup Profile" };

  const isSelf = searchParams.self === "true";
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
  params: { id: string };
  searchParams: { self?: string };
}) {
  const { data: profile, error } = await fetchUserProfile(params.id);
  if (!profile || error) notFound();

  const headersList = headers();
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
