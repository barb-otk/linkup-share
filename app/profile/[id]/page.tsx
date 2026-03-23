import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { fetchUserProfile, fetchUserLinkups } from "@/lib/api";
import { detectDevice, isMobile } from "@/lib/device";
import { extractProfileColor } from "@/lib/extractColor";
import ProfilePageMobile from "@/components/profile/ProfilePageMobile";
import ProfilePageDesktop from "@/components/profile/ProfilePageDesktop";

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
      images: (profile.profilePhotoThumbnailUrl ?? profile.profilePhoto)
        ? [{ url: (profile.profilePhotoThumbnailUrl ?? profile.profilePhoto)! }]
        : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ self?: string }>;
}) {
  const { id } = await params;
  const { data: profile, error } = await fetchUserProfile(id);
  if (!profile || error) notFound();

  const imageUrl = profile.profilePhotoThumbnailUrl ?? profile.profilePhoto ?? "";

  const [headersList, { data: linkups }, profileColor] = await Promise.all([
    headers(),
    fetchUserLinkups(profile.id),
    extractProfileColor(imageUrl),
  ]);

  const ua = headersList.get("user-agent") ?? "";
  const device = detectDevice(ua);
  const mobile = isMobile(device);

  if (mobile) {
    return (
      <ProfilePageMobile
        profile={profile}
        device={device}
        linkups={linkups ?? []}
        profileColor={profileColor}
      />
    );
  }

  return (
    <ProfilePageDesktop
      profile={profile}
      device={device}
      linkups={linkups ?? []}
      profileColor={profileColor}
    />
  );
}
