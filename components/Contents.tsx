"use client";

import { calendar_v3 } from "googleapis";
import { useState } from "react";

import TabButton from "./TabContents/TabButton";
import TabContent from "./TabContents/TabContent";

export default function Contents({ events }: { events: calendar_v3.Schema$Event[] | null | undefined }) {
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
