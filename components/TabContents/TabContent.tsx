import { calendar_v3 } from "googleapis";

import ComingSoonTab from "./Tabs/ComingSoonTab";
import EventTab from "./Tabs/EventTab/EventTab";

export default function TabContent({
  buttonId,
  events,
}: {
  buttonId: number;
  events: calendar_v3.Schema$Event[] | null | undefined;
}) {
  if (buttonId === 0) {
    return <EventTab events={events} />;
  } else {
    return <ComingSoonTab />;
  }
}
