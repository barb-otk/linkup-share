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
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-white/50">
      <rect x="1.5" y="5.5" width="11" height="7" rx="1.25" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.75 5.5V4.25C4.75 3.56 5.31 3 6 3H8C8.69 3 9.25 3.56 9.25 4.25V5.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 9H12.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
