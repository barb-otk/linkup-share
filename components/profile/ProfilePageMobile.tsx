import { UserProfile, LinkupEvent, calcAge } from "@/types";
import { DeviceType } from "@/lib/device";
import { getProfileDeepLink } from "@/lib/deeplink";
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
  linkups: LinkupEvent[];
}

export default function ProfilePageMobile({ profile, device, linkups }: Props) {
  const age = !profile.hideAge && profile.dateOfBirth ? calcAge(profile.dateOfBirth) : null;
  const flagUrl = profile.nationality?.alpha2Code
    ? `https://flagcdn.com/w20/${profile.nationality.alpha2Code.toLowerCase()}.png`
    : null;

  return (
    <DynamicBackground imageUrl={profile.profilePhotoThumbnailUrl ?? profile.profilePhoto ?? ""}>
      <TopBanner device={device} deepLink={getProfileDeepLink(profile.id)} />

      <div className="flex flex-col gap-5 px-4 pt-6 pb-4">

        {/* Profile photo */}
        <div className="flex justify-center">
          <div className="w-[96px] h-[96px] rounded-full overflow-hidden border-2 border-white/20">
            {profile.profilePhotoThumbnailUrl ?? profile.profilePhoto ? (
              <img
                src={profile.profilePhotoThumbnailUrl ?? profile.profilePhoto}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center text-white text-[36px] font-semibold">
                {profile.firstName?.[0] ?? "?"}
              </div>
            )}
          </div>
        </div>

        {/* Name + age */}
        <div className="flex flex-col items-center gap-1.5 -mt-1">
          <h1 className="font-buckin-black text-white text-[28px] tracking-[-0.4px] text-center">
            {profile.name}
            {age !== null && <span>, {age}</span>}
          </h1>

          {profile.nationality?.name && (
            <div className="flex items-center gap-1.5">
              <GlobeIcon />
              <span className="text-white/70 text-[13px]">
                {profile.nationality.name}
                {flagUrl && <img src={flagUrl} alt="" className="inline w-5 h-auto ml-1 align-middle" />}
              </span>
            </div>
          )}

          {profile.occupation && (
            <div className="flex items-center gap-1.5">
              <BriefcaseIcon />
              <span className="text-white/70 text-[13px]">{profile.occupation}</span>
            </div>
          )}
        </div>

        {profile.bio && <ProfileAbout bio={profile.bio} />}
        <ProfileTags profile={profile} />
        <ProfileLinkups linkups={linkups} />
        <AddFriendButton profileId={profile.id} device={device} />
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
