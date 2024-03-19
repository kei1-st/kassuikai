"use client";

import { useState } from "react";

import Button from "./Button";

export default function Section() {
  const [clickedButton, setButtonClicked] = useState(0);

  function clickHandler(id: number) {
    setButtonClicked(id);
    console.log("clickedButton: ", clickedButton);
  }

  return (
    <div className="flex">
      <Button
        id={0}
        clickHandler={() => {
          clickHandler(0);
        }}
        isClicked={clickedButton == 0}
      >
        にってい
      </Button>
      <Button
        id={1}
        clickHandler={() => {
          clickHandler(1);
        }}
        isClicked={clickedButton == 1}
      >
        にゅーす
      </Button>
      <Button
        id={2}
        clickHandler={() => {
          clickHandler(2);
        }}
        isClicked={clickedButton == 2}
      >
        しゃしん
      </Button>
      <Button
        id={3}
        clickHandler={() => {
          clickHandler(3);
        }}
        isClicked={clickedButton == 3}
      >
        りんく集
      </Button>
    </div>
  );
}
