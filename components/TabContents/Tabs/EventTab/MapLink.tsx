import Image from "next/image";

import formatLocation from "@/scripts/format_location";

export default function MapLink({ placeName }: { placeName: string }) {
  return (
    <a
      href={`http://maps.google.com/?q=${placeName}`}
      className="flex text-[min(1.5vw,10px)] items-center shadow-nps px-1.5 rounded-lg"
    >
      <p>＠{formatLocation(placeName)} &nbsp;</p>
      <Image src="/googleMapsOfficialIcon.png" alt="Link Icon to Google Maps" width={10} height={10} />
    </a>
  );
}
