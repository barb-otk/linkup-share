import { LinkupEvent } from "@/types";

interface Props {
  event: LinkupEvent;
}

export default function LinkupMap({ event }: Props) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const locationName = event.googlePlace?.displayName?.text ?? event.city;
  const latitude = event.aproxLatitude;
  const longitude = event.aproxLongitude;

  const mapUrl = token
    ? `https://api.mapbox.com/styles/v1/linkupapp/cmo8zwa4y001e01s5hrmwavpj/static/pin-s+315aff(${longitude},${latitude})/${longitude},${latitude},11,0/600x270@2x?access_token=${token}`
    : null;

  return (
    <div className="rounded-[26px] border border-white/15 bg-white/5 px-5 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <img src="/icons/icon-pin.svg" alt="" className="w-[18px] h-6 shrink-0" />
        <span className="text-white text-[14px] font-medium">{locationName}</span>
      </div>

      <p className="text-white/50 text-[12px] leading-5 mb-3">
        Exact location available after joining
      </p>

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