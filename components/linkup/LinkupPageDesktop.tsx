import { LinkupEvent } from "@/types";
import { DeviceType } from "@/lib/device";
import LinkupHero from "@/components/linkup/LinkupHero";
import LinkupInfoRow from "@/components/linkup/LinkupInfoRow";
import LinkupDescription from "@/components/linkup/LinkupDescription";
import LinkupMap from "@/components/linkup/LinkupMap";
import LinkupAttendees from "@/components/linkup/LinkupAttendees";
import DynamicBackground from "@/components/shared/DynamicBackground";
import Footer from "@/components/shared/Footer";

interface Props {
  event: LinkupEvent;
  device: DeviceType;
  eventColor: [number, number, number];
}

export default function LinkupPageDesktop({ event, device, eventColor }: Props) {
  if (!event) return null;
  return (
    <DynamicBackground color={eventColor}>
      <div className="max-w-[856px] mx-auto px-10 py-12">
        <div className="flex gap-8 items-start">

          {/* Left column */}
          <div className="flex flex-col flex-1">
            {/* Host */}
            <div className="flex items-center gap-2 mb-[16px]">
              <div className="relative w-[25px] h-[25px] rounded-full overflow-hidden shrink-0 bg-white/20 flex items-center justify-center text-white text-[10px] font-semibold">
                {event.ownerPictureUrl ? (
                  <img src={event.ownerPictureUrl} alt={event.ownerName} className="w-full h-full object-cover" />
                ) : (
                  event.ownerName?.[0]
                )}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: "inset 0 0 0 1px #FFFFFF0D" }}
                />
              </div>
              <span className="text-white/50 text-[13px]">
                Hosted by{" "}
                <span className="text-white font-semibold">{event.ownerName}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-white text-[32px] font-buckin-black font-black tracking-[-0.48px] leading-tight mb-[29px]">
              {event.title}
            </h1>

            <div className="flex flex-col gap-[13px]">
              <LinkupInfoRow event={event} />
              <LinkupDescription description={event.description} />
              <LinkupMap event={event} />
              <LinkupAttendees event={event} />
            </div>

          </div>

          {/* Right column — Hero card */}
          <div className="w-[315px] shrink-0 sticky top-12">
            <LinkupHero event={event} device={device} eventColor={eventColor} />
          </div>

        </div>
      </div>
      <Footer />
    </DynamicBackground>
  );
}