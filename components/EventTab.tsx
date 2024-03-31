import { calendar_v3 } from "googleapis";

import { notojp } from "@/utils/fonts";

import EventGroup from "./EventGroup";

export default function EventTab({ events }: { events: calendar_v3.Schema$Event[] | null | undefined }) {
  if (events) {
    return (
      <div
        className={`justify-center shadow-contents h-96 rounded-b-lg place-content-center ${notojp.className} text-[min(3vw,15px)]`}
      >
        <EventGroup title="練習日程" events={events} />
        <EventGroup title="新歓日程" events={events} />
      </div>
    );
  } else {
    return <p className="justify-center shadow-contents h-96 rounded-b-lg place-content-center">No events upcoming.</p>;
  }
}
