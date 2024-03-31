import { calendar_v3 } from "googleapis";

import { format_event_date } from "@/scripts/format_date";
import { notojp } from "@/utils/fonts";

export default function Event({ event }: { event: calendar_v3.Schema$Event }) {
  return (
    <div className={`mx-5 my-2 ${notojp.className} text-[min(3vw,150px)`}>
      {format_event_date(event.start?.dateTime, event.end?.dateTime)} &nbsp; {event.summary}
    </div>
  );
}
