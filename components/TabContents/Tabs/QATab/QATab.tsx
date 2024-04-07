import QAInfo from "./QAInfo";
import QAS from "./QAs";

export default function QATab() {
  return (
    <div className="flex flex-col justify-center place-items-center shadow-contents h-3vh rounded-b-lg place-content-center text-[min(3vw,15px)] px-6 py-12 font-light">
      {QAS.map((QA) => (
        <QAInfo key={QA.q} qa={QA} />
      ))}
    </div>
  );
}
