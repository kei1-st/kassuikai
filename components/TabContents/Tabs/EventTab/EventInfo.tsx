import { calendar_v3 } from "googleapis";

import { format_event_date } from "@/scripts/format_date";

import MapLink from "./MapLink";

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
      {showMapLink && event.location && <MapLink placeName={event.location} />}
    </div>
  );
}
