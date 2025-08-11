"use client";

import { useState } from "react";

import type { CalendarEvent } from "@/scripts/calendar_auth";

import TabButton from "./TabContents/TabButton";
import TabContent from "./TabContents/TabContent";

export default function Contents({ events }: { events: CalendarEvent[] | null | undefined }) {
  const [clickedButton, setButtonClicked] = useState(0);

  function clickHandler(id: number) {
    setButtonClicked(id);
    console.log("clickedButton: ", clickedButton);
  }

  const tabNames = ["にってい", "にゅーす", "しゃしん", "りんく集"];

  return (
    <section className="flex flex-col w-full">
      <div className="flex">
        {tabNames.map((name, idx) => (
          <TabButton
            key={idx}
            id={idx}
            clickHandler={() => {
              clickHandler(idx);
            }}
            isClicked={clickedButton == idx}
          >
            {name}
          </TabButton>
        ))}
      </div>
      <TabContent buttonId={clickedButton} events={events} />
    </section>
  );
}
