import React from "react";
import { useState } from "react";
import { getAnswerFromAI } from "../Requests/OpenAIRequests";
import Button from "./Button";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  async function getAnswer(prompt) {
    const c = await getAnswerFromAI(prompt);
    setAnswer(c);
  }

  return (
    <div className="border  border-slate-300 rounded mt-5 mb-5 mx-2 shadow-lg hover:shadow-indigo-200 hover:shadow-2xl">
      <div className="grid grid-cols-1">
        <div className="">
          <h1 className="m-2 text-lg p-2 bg-indigo-300 rounded">
            Or, if you want a quick answer, just ask our ChatBot!
          </h1>
          <textarea
            onChange={(event) => setPrompt(event.target.value)}
            className="border rounded border-slate-300 m-2 w-5/6 shadow-xl hover:shadow-indigo-200 hover:shadow-2xl"
          ></textarea>
          <div className="flex justify-start m-2">
            <Button onClick={() => getAnswer(prompt)} title="Get Answer" />
          </div>
          <div className="bg-indigo-50 m-2 rounded border">
            <div className="p-1">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
