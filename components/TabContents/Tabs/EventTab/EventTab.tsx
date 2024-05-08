import { calendar_v3 } from "googleapis";

import EventGroup from "./EventGroup";

const DISPLAY_SHINKAN_EVENTS = 0; // 新歓情報を非表示にするときはここを １ にする

export default function EventTab({ events }: { events: calendar_v3.Schema$Event[] | null | undefined }) {
  if (events) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (DISPLAY_SHINKAN_EVENTS) {
      return (
        <div className="flex flex-wrap justify-center shadow-contents h-3vh pb-10 rounded-b-lg place-content-center text-[min(3vw,15px)] px-3 py-10 font-light space-y-5 md:space-y-0">
          <div className="w-full md:w-1/2 md:px-8">
            <EventGroup title="練習日程" events={events} />
          </div>
          <div className="w-full md:w-1/2">
            <EventGroup title="新歓日程" events={events} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center shadow-contents h-3vh pb-10 rounded-b-lg place-content-center text-[min(3vw,16px)] px-3 py-10 font-light space-y-5">
          <EventGroup title="練習日程" events={events} />
        </div>
      );
    }
  } else {
    return <p className="justify-center shadow-contents h-96 rounded-b-lg place-content-center">No events upcoming.</p>;
  }
}
