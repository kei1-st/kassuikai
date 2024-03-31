import { calendar_v3 } from "googleapis";

import Event from "./Event";

export default function EventTab({ events }: { events: calendar_v3.Schema$Event[] | null | undefined }) {
  if (events) {
    return (
      <div className="justify-center shadow-contents h-96 rounded-b-lg place-content-center">
        {events.map((event) => {
          return event.id && <Event key={event.id} event={event} />;
        })}
      </div>
    );
  } else {
    return <p className="justify-center shadow-contents h-96 rounded-b-lg place-content-center">No events upcoming.</p>;
  }
}
