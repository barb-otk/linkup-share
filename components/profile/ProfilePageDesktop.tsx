import { UserProfile, LinkupEvent, calcAge } from "@/types";
import { DeviceType } from "@/lib/device";
import DynamicBackground from "@/components/shared/DynamicBackground";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileTags from "@/components/profile/ProfileTags";
import ProfileLinkups from "@/components/profile/ProfileLinkups";
import AddFriendButton from "@/components/profile/AddFriendButton";
import Footer from "@/components/shared/Footer";

interface Props {
  profile: UserProfile;
  device: DeviceType;
  linkups: LinkupEvent[];
}

export default function ProfilePageDesktop({ profile, device, linkups }: Props) {
  const age = !profile.hideAge && profile.dateOfBirth ? calcAge(profile.dateOfBirth) : null;
  const flagUrl = profile.nationality?.alpha2Code
    ? `https://flagcdn.com/w20/${profile.nationality.alpha2Code.toLowerCase()}.png`
    : null;

  return (
    <DynamicBackground imageUrl={profile.profilePhotoThumbnailUrl ?? profile.profilePhoto ?? ""}>
      <div className="max-w-[856px] mx-auto px-10 py-12">
        <div className="flex gap-10 items-start">

          {/* ── Left column ───────────────────────────────────── */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">

            {/* Name, age, location, occupation */}
            <div className="flex flex-col gap-1.5">
              <h1 className="font-buckin-black text-white text-[36px] tracking-[-0.5px] leading-tight">
                {profile.name}
                {age !== null && <span>, {age}</span>}
              </h1>


              {profile.nationality?.name && (
                <div className="flex items-center gap-2">
                  <GlobeIcon />
                  <span className="text-white/70 text-[14px]">
                    {profile.nationality.name}
                    {flagUrl && <img src={flagUrl} alt="" className="inline w-5 h-auto ml-1 align-middle" />}
                  </span>
                </div>
              )}

              {profile.occupation && (
                <div className="flex items-center gap-2">
                  <BriefcaseIcon />
                  <span className="text-white/70 text-[14px]">{profile.occupation}</span>
                </div>
              )}
            </div>

            {profile.bio && <ProfileAbout bio={profile.bio} />}
            <ProfileTags profile={profile} />
            <ProfileLinkups linkups={linkups} />
          </div>

          {/* ── Right column — sticky profile card ────────────── */}
          <div className="w-[280px] shrink-0 sticky top-12 flex flex-col gap-3">
            <div className="rounded-[26px] overflow-hidden border border-white/15 bg-white/[0.07]">

              {/* Photo with gradient + first name overlay */}
              <div className="relative w-full aspect-[315/399]">
                {profile.profilePhotoThumbnailUrl ?? profile.profilePhoto ? (
                  <img
                    src={profile.profilePhotoThumbnailUrl ?? profile.profilePhoto}
                    alt={profile.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center text-white text-[64px] font-semibold">
                    {profile.firstName?.[0] ?? "?"}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[50%] to-black/70" />
                <h2 className="absolute bottom-4 left-0 right-0 text-center text-white text-[26px] font-buckin-black tracking-[-0.3px]">
                  {profile.firstName || profile.name}
                </h2>
              </div>

              {/* Location + occupation + button */}
              <div className="px-5 py-4 flex flex-col gap-3">
                {profile.nationality?.name && (
                  <div className="flex items-center gap-2">
                    <GlobeIcon />
                    <span className="text-white/70 text-[13px]">
                      {profile.nationality.name}
                      {flagUrl && <img src={flagUrl} alt="" className="inline w-5 h-auto ml-1 align-middle" />}
                    </span>
                  </div>
                )}

                {profile.occupation && (
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon />
                    <span className="text-white/70 text-[13px]">{profile.occupation}</span>
                  </div>
                )}

                <AddFriendButton profileId={profile.id} device={device} />
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </DynamicBackground>
  );
}

function GlobeIcon() {
  return <img src="/icons/icon-world.svg" alt="" className="w-4 h-4 shrink-0" />;
}

function BriefcaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/50">
      <rect x="1.5" y="5.5" width="11" height="7" rx="1.25" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.75 5.5V4.25C4.75 3.56 5.31 3 6 3H8C8.69 3 9.25 3.56 9.25 4.25V5.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 9H12.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
