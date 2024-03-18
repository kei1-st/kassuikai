import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-20">
      <div className="absolute w-1/3 h-1/3 flex flex-col">
        <Image
          className="relative dark:invert"
          src="/isuinu_logo.svg"
          alt="Isuinu Logo"
          fill
        />
      </div>
    </main>
  );
}
