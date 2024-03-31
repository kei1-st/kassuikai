import { calendar_v3 } from "googleapis";

import Event from "./Event";

export default function TabContent({
  buttonId,
  events,
}: {
  buttonId: number;
  events: calendar_v3.Schema$Event[] | null | undefined;
}) {
  let content;
  if (buttonId === 0) {
    if(events){
      content = events.map((event) => <Event key={String(event.id)} event={event} />);
    } else {
      content = <p className="text-center">No events upcoming.</p>;
    }
  } else {
    content = <p className="text-center">Maybe coming soon.</p>;
  }
  return <div className="justify-center shadow-contents h-96 rounded-b-lg place-content-center">{content}</div>;
}
