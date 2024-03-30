import { calendar_v3 } from "googleapis";

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
        <div key={event.id}>
          {event.start?.dateTime}
          {event.summary}
        </div>
      ));
  } else {
    content = <p className="text-center">Maybe coming soon.</p>;
  }
  return <div className="justify-center shadow-contents h-96 rounded-b-lg place-content-center">{content}</div>;
}
