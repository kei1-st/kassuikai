import Image from "next/image";

import { fetchEvents } from "@/scripts/calendar_auth";
import { notojp } from "@/utils/fonts";

import Contents from "../components/Contents";

export default async function Home() {
  const eventData = await fetchEvents(); // エラーハンドリングは定義側で実施
  // SSR 実行環境でのみ出力されるログ
  console.log("[calendar] page: fetchEvents resolved", {
    hasEvents: Boolean(eventData && eventData.length > 0),
    length: Array.isArray(eventData) ? eventData.length : null,
  });
  return (
    <main className={`flex min-h-screen w-screen flex-col items-center p-10 space-y-10 ${notojp.className}`}>
      <Image className="mt-10" src="/isuinu_logo.svg" alt="Isuinu Logo" width={200} height={200} />
      <Contents events={eventData} />
    </main>
  );
}
