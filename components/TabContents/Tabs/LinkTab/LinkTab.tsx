import Link from "next/link";

import LinkGroup from "./LinkGroup";

import linksOfClubs from "./links";

export default function LinkTab() {
  return (
    <div className="flex flex-wrap justify-center shadow-contents h-3vh rounded-b-lg place-content-center text-[min(3vw,15px)] px-3 py-10 font-light">
      {linksOfClubs.map((links) => {
        return <LinkGroup key={links.title} linkDicts={links} />;
      })}
    </div>
  );
}
