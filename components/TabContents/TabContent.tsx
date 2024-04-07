import { calendar_v3 } from "googleapis";

import ComingSoonTab from "./Tabs/ComingSoonTab";
import EventTab from "./Tabs/EventTab/EventTab";
import LinkTab from "./Tabs/LinkTab/LinkTab";
import QATab from "./Tabs/QATab/QATab";

export default function TabContent({
  buttonId,
  events,
}: {
  buttonId: number;
  events: calendar_v3.Schema$Event[] | null | undefined;
}) {
  if (buttonId === 0) {
    return <EventTab events={events} />;
  } else if (buttonId === 2) {
    return <QATab />;
  } else if (buttonId === 3) {
    return <LinkTab />;
  } else {
    return <ComingSoonTab />;
  }
}
