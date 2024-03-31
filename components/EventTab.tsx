import { calendar_v3 } from "googleapis";

import { notojp } from "@/utils/fonts";

import EventGroup from "./EventGroup";

export default function EventTab({ events }: { events: calendar_v3.Schema$Event[] | null | undefined }) {
  if (events) {
    return (
      <div
        className={`flex flex-wrap justify-center shadow-contents h-3vh pb-10 rounded-b-lg place-content-center ${notojp.className} text-[min(3vw,15px)] px-3 py-10 space-y-5 md:space-y-0`}
      >
        <div className="w-full md:w-1/2 md:px-8">
          <EventGroup title="練習日程" events={events} />
        </div>
        <div className="w-full md:w-1/2">
          <EventGroup title="新歓日程" events={events} />
        </div>
      </div>
    );
  } else {
    return <p className="justify-center shadow-contents h-96 rounded-b-lg place-content-center">No events upcoming.</p>;
  }
}
