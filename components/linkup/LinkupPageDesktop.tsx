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
          <div className="flex flex-col gap-3 flex-1">
            {/* Host */}
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-[25px] h-[25px] rounded-full overflow-hidden shrink-0 bg-white/20 flex items-center justify-center text-white text-[10px] font-semibold"
                style={{ border: "1.5px solid #FFFFFF" }}
              >
                {event.ownerPictureUrl ? (
                  <img src={event.ownerPictureUrl} alt={event.ownerName} className="w-full h-full object-cover" />
                ) : (
                  event.ownerName?.[0]
                )}
              </div>
              <span className="text-white/50 text-[13px]">
                Hosted by{" "}
                <span className="text-white font-semibold">{event.ownerName}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-white text-[32px] font-black tracking-[-0.48px] leading-tight">
              {event.title}
            </h1>

            <LinkupInfoRow event={event} />
            <LinkupDescription description={event.description} />
            <LinkupMap event={event} />
            <LinkupAttendees event={event} />
          </div>

          {/* Right column — Hero card */}
          <div className="w-[315px] shrink-0 sticky top-12">
            <LinkupHero event={event} device={device} />
          </div>

        </div>
      </div>
      <Footer />
    </DynamicBackground>
  );
}