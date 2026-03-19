import { LinkupEvent } from "@/types";
import { DeviceType } from "@/lib/device";
import TopBanner from "@/components/shared/TopBanner";
import LinkupHero from "@/components/linkup/LinkupHero";
import LinkupInfoRow from "@/components/linkup/LinkupInfoRow";
import LinkupDescription from "@/components/linkup/LinkupDescription";
import LinkupMap from "@/components/linkup/LinkupMap";
import LinkupAttendees from "@/components/linkup/LinkupAttendees";
import DynamicBackground from "@/components/shared/DynamicBackground";
import { getLinkupDeepLink } from "@/lib/deeplink";

interface Props {
  event: LinkupEvent;
  device: DeviceType;
}

export default function LinkupPageMobile({ event, device }: Props) {
  return (
    <DynamicBackground imageUrl={event.picture}>
      <TopBanner device={device} deepLink={getLinkupDeepLink(event.id)} />
      <div className="flex flex-col gap-3 px-4 py-4">
        <LinkupHero event={event} device={device} />
        <LinkupInfoRow event={event} />
        <LinkupDescription description={event.description} />
        <LinkupMap event={event} />
        <LinkupAttendees event={event} />
      </div>
    </DynamicBackground>
  );
}