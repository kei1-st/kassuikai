import Image from "next/image";

import Section from "../components/Section";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-10 space-y-20">
      <Image className="mt-20" src="/isuinu_logo.svg" alt="Isuinu Logo" width={200} height={200} />
      <Section />
    </main>
  );
}
