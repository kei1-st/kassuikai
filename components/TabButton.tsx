"use client";

import { ReactNode } from "react";

export default function Button({
  children,
  clickHandler,
  isClicked,
}: {
  children: ReactNode;
  id: number;
  clickHandler: () => void;
  isClicked: boolean;
}) {
  return (
    <button className={`w-20 h-10 rounded-t-lg text-sm ${isClicked ? "shadow-p bg-pushed" : "shadow-np"}`} onClick={clickHandler}>
      {children}
    </button>
  );
}
