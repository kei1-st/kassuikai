"use client";

import { ReactNode } from "react";

export default function TabButton({
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
    <button
      className={`w-full h-10 rounded-t-lg text-sm ${isClicked ? "shadow-p bg-pushed" : "shadow-np"}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
