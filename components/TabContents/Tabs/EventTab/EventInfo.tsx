import type { CalendarEvent } from "@/scripts/calendar_auth";
import { format_event_date } from "@/scripts/format_date";

import MapLink from "./MapLink";

export default function EventInfo({
  event,
  showEndTime,
  showMapLink,
}: {
  event: CalendarEvent;
  showEndTime: boolean;
  showMapLink: boolean;
}) {
  return (
    <div className={`ml-5 my-2 flex`}>
      <p className="mr-2 lg:mr-8">
        {format_event_date(event.start?.dateTime, event.end?.dateTime, showEndTime)} &nbsp; {event.summary}
      </p>
      {showMapLink && event.location && <MapLink placeName={event.location} />}
    </div>
  );
}
