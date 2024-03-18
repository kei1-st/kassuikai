"use client";

import { useState } from "react";
import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
  const [isButtonClicked, setButtonClicked] = useState(false);

  function clickHandler() {
    setButtonClicked(!isButtonClicked);
    console.log("isButtonClicked: ", isButtonClicked);
  }

  return (
    <button
      className={`w-20 h-10 rounded-t-lg text-sm ${isButtonClicked ? "shadow-p" : "shadow-np"}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
