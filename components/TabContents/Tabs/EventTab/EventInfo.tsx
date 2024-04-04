import { calendar_v3 } from "googleapis";
import Image from "next/image";

import { format_event_date } from "@/scripts/format_date";
import formatLocation from "@/scripts/format_location";

export default function EventInfo({
  event,
  showEndTime,
  showMapLink,
}: {
  event: calendar_v3.Schema$Event;
  showEndTime: boolean;
  showMapLink: boolean;
}) {
  return (
    <div className={`ml-5 my-2 flex`}>
      <p className="mr-2 md:mr-8">
        {format_event_date(event.start?.dateTime, event.end?.dateTime, showEndTime)} &nbsp; {event.summary}
      </p>
      {showMapLink && event.location && (
        <a
          href={`http://maps.google.com/?q=${event.location}`}
          className="flex text-[min(1.5vw,10px)] items-center shadow-nps px-1.5 rounded-lg"
        >
          <p>＠{formatLocation(event.location)} &nbsp;</p>
          <Image src="/googleMapsOfficialIcon.png" alt="Link Icon to Google Maps" width={8} height={8} />
        </a>
      )}
    </div>
  );
}
