import { UserProfile } from "@/types";

interface Props {
  profile: UserProfile;
}

export default function ProfileTags({ profile }: Props) {
  const interests = profile.userInterests ?? [];
  const languages = profile.userLanguages ?? [];

  if (interests.length === 0 && languages.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      {interests.length > 0 && (
        <div>
          <span className="block text-white text-[15px] font-bold mb-3">
            Interests
          </span>
          <div className="flex flex-wrap gap-2">
            {interests.map(({ interest }) => (
              <span
                key={interest.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.10] border border-white/[0.10] text-white text-[13px] font-medium"
              >
                <span>{interest.emoji}</span>
                <span>{interest.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div>
          <span className="block text-white text-[15px] font-bold mb-3">
            Languages
          </span>
          <div className="flex flex-wrap gap-2">
            {languages.map(({ language }) => {
              const flagUrl = language.countryCode
                ? `https://flagcdn.com/w20/${language.countryCode.toLowerCase()}.png`
                : null;
              return (
                <span
                  key={language.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.10] border border-white/[0.10] text-white text-[13px] font-medium"
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
