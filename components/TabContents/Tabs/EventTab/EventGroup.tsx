import { calendar_v3 } from "googleapis";

import EventInfo from "./EventInfo";

export default function EventGroup({ title, events }: { title: string; events: calendar_v3.Schema$Event[] }) {
  return (
    <>
      <h1 className="mx-5"> 直近の{title} </h1>
      {events.map((event) => {
        return (
          event.id &&
          event.organizer?.displayName === title && (
            <EventInfo
              key={event.id}
              event={event}
              showEndTime={title === "練習日程"}
              showMapLink={title === "新歓日程"}
            />
          )
        );
      })}
    </>
  );
}
