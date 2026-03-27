import { UserProfile, PublicUserLinkup, calcAge } from "@/types";
import { DeviceType } from "@/lib/device";
import DynamicBackground from "@/components/shared/DynamicBackground";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileTags from "@/components/profile/ProfileTags";
import ProfileLinkups from "@/components/profile/ProfileLinkups";
import AddFriendButton from "@/components/profile/AddFriendButton";
import Footer from "@/components/shared/Footer";

interface Props {
  readonly profile: UserProfile;
  readonly device: DeviceType;
  readonly linkups: PublicUserLinkup[];
  readonly profileColor: [number, number, number];
}

export default function ProfilePageDesktop({ profile, device, linkups, profileColor }: Props) {
  const age = !profile.hideAge && profile.dateOfBirth ? calcAge(profile.dateOfBirth) : null;
  const flagUrl = profile.nationality?.alpha2Code
    ? `https://flagcdn.com/w20/${profile.nationality.alpha2Code.toLowerCase()}.png`
    : null;
  const [r, g, b] = profileColor;

  return (
    <DynamicBackground color={profileColor}>
      <div className="max-w-[856px] mx-auto px-10 py-12">
        <div className="flex gap-[55px] items-start">

          {/* ── Left column ───────────────────────────────────── */}
          <div className="flex flex-col gap-3 w-[324px] shrink-0">

            {/* Name, age, location, occupation */}
            <div className="flex flex-col gap-1.5">
              <h1 className="font-buckin-black text-white text-[33px] tracking-[-0.495px] leading-[32px]" style={{ fontFeatureSettings: "'case' on, 'liga' off, 'clig' off" }}>
                {profile.name}
                {age !== null && <span>, {age}</span>}
              </h1>


              {profile.nationality?.name && (
                <div className="flex items-center gap-2">
                  <GlobeIcon />
                  <span className="text-white/75 text-[12px] font-normal leading-[23px] tracking-[0.36px]">
                    {profile.nationality.name}
                    {flagUrl && <img src={flagUrl} alt="" className="inline w-5 h-auto ml-1 align-middle" />}
                  </span>
                </div>
              )}

              {profile.occupation && (
                <div className="flex items-center gap-2">
                  <BriefcaseIcon />
                  <span className="text-white/75 text-[12px] font-normal leading-[23px] tracking-[0.36px]">{profile.occupation}</span>
                </div>
              )}
            </div>

            {profile.bio && <ProfileAbout bio={profile.bio} />}
            <ProfileTags profile={profile} />
            <ProfileLinkups linkups={linkups} ownerName={profile.name} />
          </div>

          {/* ── Right column — sticky profile card ────────────── */}
          <div className="w-[315px] shrink-0 sticky top-12">
            <div className="relative w-[315px] h-[399px] rounded-[26px] overflow-hidden border border-white/15">

              {/* Photo */}
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

              {/* Gradient overlay — matches page background color */}
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(${r},${g},${b},0) 36%, rgb(${r},${g},${b}) 75%)` }} />

              {/* Overlaid content */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 flex flex-col gap-[7px] items-center">
                <h2 className="text-center text-white text-[27px] font-buckin-black tracking-[-0.405px]" style={{ fontFeatureSettings: "'case' 1" }}>
                  {profile.firstName || profile.name}
                </h2>

                {profile.nationality?.name && (
                  <div className="flex items-center justify-center gap-2">
                    <GlobeIcon />
                    <span className="text-white/75 text-[12px] font-normal leading-[23px] tracking-[0.36px]">
                      {profile.nationality.name}
                      {flagUrl && <img src={flagUrl} alt="" className="inline w-5 h-auto ml-1 align-middle" />}
                    </span>
                  </div>
                )}

                {profile.occupation && (
                  <div className="flex items-center justify-center gap-2">
                    <BriefcaseIcon />
                    <span className="text-white/75 text-[12px] font-normal leading-[23px] tracking-[0.36px]">{profile.occupation}</span>
                  </div>
                )}

                <AddFriendButton profileUsername={profile.userName} firstName={profile.firstName} device={device} />
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
  return <img src="/icons/icon-bag.svg" alt="" className="w-4 h-4 shrink-0" />;
}
