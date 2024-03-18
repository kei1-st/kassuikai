"use client";

import { useState } from "react";

export default function Button() {
  const [isButtonClicked, setButtonClicked] = useState(false);

  function clickHandler() {
    setButtonClicked(!isButtonClicked);
    console.log("isButtonClicked: ", isButtonClicked);
  }

  return (
    <button className={`w-20 h-10 rounded-mg ${isButtonClicked ? "shadow-p" : "shadow-np"}`} onClick={clickHandler}>
      test
    </button>
  );
}
