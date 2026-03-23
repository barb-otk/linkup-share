import { UserProfile, calcAge, countryCodeToFlag } from "@/types";

interface Props {
  profile: UserProfile;
}

export default function ProfileHeader({ profile }: Props) {
  const age =
    !profile.hideAge && profile.dateOfBirth
      ? calcAge(profile.dateOfBirth)
      : null;

  const flag = profile.nationality?.alpha2Code
    ? countryCodeToFlag(profile.nationality.alpha2Code)
    : null;

  return (
    <div className="flex flex-col items-center gap-2 pt-6 pb-5 px-4">
      {/* Profile photo */}
      <div className="w-[88px] h-[88px] rounded-full overflow-hidden border-2 border-white/20 shrink-0">
        {profile.profilePhotoThumbnailUrl ?? profile.profilePhoto ? (
          <img
            src={profile.profilePhotoThumbnailUrl ?? profile.profilePhoto}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white/10 flex items-center justify-center text-white text-[34px] font-semibold">
            {profile.firstName?.[0] ?? "?"}
          </div>
        )}
      </div>

      {/* Name + age */}
      <h1 className="text-white text-[24px] font-black tracking-[-0.36px] text-center">
        {profile.name}
        {age !== null && (
          <span className="font-black">, {age}</span>
        )}
      </h1>

      {/* Location */}
      {profile.nationality?.name && (
        <div className="flex items-center gap-1.5">
          <GlobeIcon />
          <span className="text-white/70 text-[13px]">
            {profile.nationality.name}
            {flag && <> {flag}</>}
          </span>
        </div>
      )}

      {/* Occupation */}
      {profile.occupation && (
        <div className="flex items-center gap-1.5">
          <BriefcaseIcon />
          <span className="text-white/70 text-[13px]">{profile.occupation}</span>
        </div>
      )}
    </div>
  );
}

function GlobeIcon() {
  return <img src="/icons/icon-world.svg" alt="" className="w-4 h-4 shrink-0" />;
}

function BriefcaseIcon() {
  return <img src="/icons/icon-bag.svg" alt="" className="w-4 h-4 shrink-0" />;
}
