import Image from "next/image";

import { getEventListFromGoogleCalendar } from "@/scripts/calendar_auth";

import Contents from "../components/Contents";

async function fetchEvents() {
  const timeMin = new Date().toISOString();
  // 例として、1週間後の日付をtimeMaxとして設定
  const timeMax = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const events = await getEventListFromGoogleCalendar(timeMin, timeMax);
    console.log(events);
  } catch (error) {
    console.error("error occured while fetching events. Error details: ", error);
  }
}

export default function Home() {
  void fetchEvents(); // エラーハンドリングは定義側でやっているので未処理の Promises を void で明示的に無視する
  return ( 
    <main className="flex min-h-screen w-screen flex-col items-center p-10 space-y-10">
      <Image className="mt-10" src="/isuinu_logo.svg" alt="Isuinu Logo" width={200} height={200} />
      <Contents />
    </main>
  );
}
