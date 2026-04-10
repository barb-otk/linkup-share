import { type PublicUserLinkup, UserProfile, calcAge } from "@/types";
import { DeviceType } from "@/lib/device";
import TopBanner from "@/components/shared/TopBanner";
import DynamicBackground from "@/components/shared/DynamicBackground";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileTags from "@/components/profile/ProfileTags";
import ProfileLinkups from "@/components/profile/ProfileLinkups";
import AddFriendButton from "@/components/profile/AddFriendButton";
import Footer from "@/components/shared/Footer";

interface Props {
  profile: UserProfile;
  device: DeviceType;
  linkups: PublicUserLinkup[];
  profileColor: [number, number, number];
}

export default function ProfilePageMobile({ profile, device, linkups, profileColor }: Readonly<Props>) {
  const age = !profile.hideAge && profile.dateOfBirth ? calcAge(profile.dateOfBirth) : null;
  const flagUrl = profile.nationality?.alpha2Code
    ? `https://flagcdn.com/w20/${profile.nationality.alpha2Code.toLowerCase()}.png`
    : null;
  const [r, g, b] = profileColor;

  return (
    <DynamicBackground color={profileColor} mobile>
      <TopBanner device={device} />

      <div className="flex flex-col gap-4 px-[22px] pt-6 pb-32">

        {/* Profile card */}
        <div className="relative h-[314px] rounded-[26px] overflow-hidden border border-white/15">
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

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, rgba(${r},${g},${b},0) 36%, rgb(${r},${g},${b}) 75%)` }}
          />

          {/* Overlaid content */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 flex flex-col gap-[7px] items-center">
            <h1 className="text-center text-white text-[28px] font-buckin-black tracking-[-0.4px] leading-[25px]">
              {profile.name}
              {age !== null && <span>, {age}</span>}
            </h1>

            {profile.nationality?.name && (
              <div className="flex items-center gap-1.5">
                <GlobeIcon />
                <span className="text-white/75 text-[12px] font-normal leading-[23px] tracking-[0.36px]">
                  {profile.nationality.name}
                  {flagUrl && <img src={flagUrl} alt="" className="inline w-5 h-auto ml-1 align-middle" />}
                </span>
              </div>
            )}

            {profile.occupation && (
              <div className="flex items-center gap-1.5">
                <BriefcaseIcon />
                <span className="text-white/75 text-[12px] font-normal leading-[23px] tracking-[0.36px]">{profile.occupation}</span>
              </div>
            )}
          </div>
        </div>

        {profile.bio && <ProfileAbout bio={profile.bio} />}
        <ProfileTags profile={profile} />
        <ProfileLinkups linkups={linkups} ownerName={profile.name} />
      </div>

      <Footer mobile />

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pt-4 pb-8">
        <AddFriendButton profileUsername={profile.userName} firstName={profile.firstName} device={device} />
      </div>
    </DynamicBackground>
  );
}

function GlobeIcon() {
  return <img src="/icons/icon-world.svg" alt="" className="w-4 h-4 shrink-0" />;
}

function BriefcaseIcon() {
  return <img src="/icons/icon-bag.svg" alt="" className="w-4 h-4 shrink-0" />;
}
