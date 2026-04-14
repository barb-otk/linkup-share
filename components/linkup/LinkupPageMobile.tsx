import { LinkupEvent } from "@/types";
import { DeviceType } from "@/lib/device";
import TopBanner from "@/components/shared/TopBanner";
import LinkupHero from "@/components/linkup/LinkupHero";
import LinkupInfoRow from "@/components/linkup/LinkupInfoRow";
import LinkupDescription from "@/components/linkup/LinkupDescription";
import LinkupMap from "@/components/linkup/LinkupMap";
import LinkupAttendees from "@/components/linkup/LinkupAttendees";
import JoinButton from "@/components/linkup/JoinButton";
import DynamicBackground from "@/components/shared/DynamicBackground";

interface Props {
  event: LinkupEvent;
  device: DeviceType;
  eventColor: [number, number, number];
}

export default function LinkupPageMobile({ event, device, eventColor }: Props) {
  return (
    <DynamicBackground color={eventColor} mobile>
      <TopBanner device={device} />
      <div className="flex flex-col gap-3 px-4 py-4">
        <LinkupHero event={event} device={device} eventColor={eventColor} />
        <LinkupInfoRow event={event} />
        <LinkupDescription description={event.description} />
        <LinkupMap event={event} />
        <LinkupAttendees event={event} />
      </div>
      <JoinButton eventId={event.id} device={device} eventColor={eventColor} />
    </DynamicBackground>
  );
}