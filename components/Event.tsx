import { calendar_v3 } from "googleapis";

import { format_event_date } from "@/scripts/format_date";

export default function Event({ key, event }: { key: string | null | undefined; event: calendar_v3.Schema$Event }) {
  return (
    <div className="mx-5 my-2" key={key} style={{ fontFamily: "Roboto", fontSize: "14px" }}>
      {format_event_date(event.start?.dateTime, event.end?.dateTime)} &nbsp; {event.summary}
    </div>
  );
}
