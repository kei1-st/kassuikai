import { calendar_v3 } from "googleapis";

import { format_event_date } from "@/scripts/format_date";

export default function TabContent({
  buttonId,
  events,
}: {
  buttonId: number;
  events: calendar_v3.Schema$Event[] | null | undefined;
}) {
  let content;
  if (buttonId === 0) {
    content =
      events &&
      events.map((event) => (
        <div className="mx-5 my-2" key={event.id} style={{ fontFamily: 'Roboto', fontSize: '14px' }}>
          {format_event_date(event.start?.dateTime, event.end?.dateTime)} &nbsp; {event.summary}
        </div>
      ));
  } else {
    content = <p className="text-center">Maybe coming soon.</p>;
  }
  return <div className="justify-center shadow-contents h-96 rounded-b-lg place-content-center">{content}</div>;
}
