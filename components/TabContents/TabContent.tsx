import type { CalendarEvent } from "@/scripts/calendar_auth";

import ComingSoonTab from "./Tabs/ComingSoonTab";
import EventTab from "./Tabs/EventTab/EventTab";
import LinkTab from "./Tabs/LinkTab/LinkTab";

export default function TabContent({
  buttonId,
  events,
}: {
  buttonId: number;
  events: CalendarEvent[] | null | undefined;
}) {
  if (buttonId === 0) {
    return <EventTab events={events} />;
  } else if (buttonId === 3) {
    return <LinkTab />;
  } else {
    return <ComingSoonTab />;
  }
}
