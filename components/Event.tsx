import { calendar_v3 } from "googleapis";

import { format_event_date } from "@/scripts/format_date";
import { notojp } from "@/utils/fonts";

export default function Event({ key, event }: { key: string; event: calendar_v3.Schema$Event }) {
  return (
    <div className={`mx-5 my-2 ${notojp.className}`} key={key}>
      {format_event_date(event.start?.dateTime, event.end?.dateTime)} &nbsp; {event.summary}
    </div>
  );
}
