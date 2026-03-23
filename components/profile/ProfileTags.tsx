import { UserProfile } from "@/types";

interface Props {
  profile: UserProfile;
}

export default function ProfileTags({ profile }: Props) {
  const interests = profile.userInterests ?? [];
  const languages = profile.userLanguages ?? [];

  if (interests.length === 0 && languages.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {interests.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="block text-white text-[13px] font-bold leading-[23.5px] tracking-[0.39px]">
            Interests
          </span>
          <div className="flex flex-wrap gap-[9px]">
            {interests.map(({ interest }) => (
              <span
                key={interest.id}
                className="flex items-center gap-1.5 px-[26px] py-[4px] rounded-[24px] bg-white/[0.10] border-[0.5px] border-white/15 backdrop-blur-[8px] text-white text-[12px] font-light tracking-[0.36px] leading-[20px]"
              >
                <span>{interest.emoji}</span>
                <span>{interest.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="block text-white text-[13px] font-bold leading-[23.5px] tracking-[0.39px]">
            Languages
          </span>
          <div className="flex flex-wrap gap-[9px]">
            {languages.map(({ language }) => {
              const flagUrl = language.countryCode
                ? `https://flagcdn.com/w20/${language.countryCode.toLowerCase()}.png`
                : null;
              return (
                <span
                  key={language.id}
                  className="flex items-center gap-1.5 px-[16px] py-[4px] rounded-[24px] bg-white/[0.10] border-[0.5px] border-white/15 backdrop-blur-[8px] text-white text-[12px] font-light tracking-[0.36px] leading-[20px]"
                >
                  {flagUrl && <img src={flagUrl} alt="" className="w-4 h-auto shrink-0" />}
                  <span>{language.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
