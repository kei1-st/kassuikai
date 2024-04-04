import { calendar_v3 } from "googleapis";

import EventInfo from "./EventInfo";
import MapLink from "./MapLink";

export default function EventGroup({ title, events }: { title: string; events: calendar_v3.Schema$Event[] }) {
  return (
    <>
      <div className="flex">
        <h1 className="mx-5"> 直近の{title} </h1>
        {title == "練習日程" && <MapLink placeName="屋内プール,筑波大学屋内プール" />}
      </div>
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
