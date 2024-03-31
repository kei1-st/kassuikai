import { calendar_v3 } from "googleapis";

import { format_event_date } from "@/scripts/format_date";

export default function EventInfo({ event }: { event: calendar_v3.Schema$Event }) {
  return (
    <div className={`mx-5 my-2`}>
      {format_event_date(event.start?.dateTime, event.end?.dateTime)} &nbsp; {event.summary}
    </div>
  );
}
