import { useState } from "react";

export default function QAInfo({ qa }: { qa: { q: string; a: string } }) {
  const [isButtonPushed, setButtonPushed] = useState<boolean>(false);

  function handleButton() {
    setButtonPushed(!isButtonPushed);
  }

  return (
    <button
      className={`${isButtonPushed ? "shadow-p" : "shadow-np"} w-full py-5 my-3 mx-12 rounded-lg`}
      onClick={handleButton}
    >
      <div className="flex flex-wrap justify-between px-4">
        <p>question: {qa.q}</p>
        {isButtonPushed ? <p className="self-end">-</p> : <p className="self-end">+</p>}
      </div>
      {isButtonPushed && <p>answer: {qa.a}</p>}
    </button>
  );
}
