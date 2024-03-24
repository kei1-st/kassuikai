
import Image from "next/image";

import Contents from "../components/Contents";

export const runtime = 'edge';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-10 space-y-10">
      <Image className="mt-10" src="/isuinu_logo.svg" alt="Isuinu Logo" width={200} height={200} />
      <Contents />
    </main>
  );
}
