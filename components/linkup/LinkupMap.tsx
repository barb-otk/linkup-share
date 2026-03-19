import { LinkupEvent } from "@/types";

interface Props {
  event: LinkupEvent;
}

export default function LinkupMap({ event }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const locationName = event.googlePlace?.displayName?.text ?? event.city;
  const latitude = event.aproxLatitude;
  const longitude = event.aproxLongitude;

  const mapUrl = apiKey
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=600x270&scale=2&markers=color:orange|${latitude},${longitude}&key=${apiKey}`
    : null;

  return (
    <div className="rounded-[26px] border border-white/15 bg-white/[0.07] backdrop-blur-[31.8px] px-5 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <img src="/icons/icon-pin.svg" alt="" className="w-[18px] h-6 shrink-0" />
        <span className="text-white text-[14px] font-medium">{locationName}</span>
      </div>

      {/* Subtext — only for paid events */}
      {!event.isFree && (
        <p className="text-white/50 text-[12px] leading-5 mb-3 pl-[26px]">
          Exact location available after joining
        </p>
      )}

      {/* Map */}
      <div className="rounded-xl overflow-hidden w-full aspect-[300/135]">
        {mapUrl ? (
          <img
            src={mapUrl}
            alt={`Map of ${locationName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white/10 flex items-center justify-center">
            <span className="text-white/30 text-sm">Map unavailable</span>
          </div>
        )}
      </div>
    </div>
  );
}