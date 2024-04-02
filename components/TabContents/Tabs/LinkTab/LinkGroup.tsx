export default function LinkGroup({
  linkDicts,
}: {
  linkDicts: {
    title: string;
    links: {
      category: string;
      url: string;
    }[];
  };
}) {
  return (
    <div className="flex flex-col pb-10 w-1/8 md:w-1/3 md:px-8 mx-10">
      <h1 className="mb-6 text-center text-[min(3vw,20px)]">{linkDicts.title}</h1>
      <span className="text-center space-y-3 flex flex-col">
        {linkDicts.links.map((link) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={link.url}
            className="px-3 py-2 rounded-lg shadow-np"
          >
            {link.category}
          </a>
        ))}
      </span>
    </div>
  );
}
