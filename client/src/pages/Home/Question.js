import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Question({ question }) {
  const navigate = useNavigate();
  return (
    <div
      className="border border-primary rounded shadow-xl  m-2 p-5 flex flex-col gap-3 cursor-pointer bg-indigo-50"
      onClick={() => {
        navigate(`/question/${question._id}`);
      }}
    >
      <h1 className="text-primary text-xl font-bold">
        {question.title.substring(0, 40) + "..."}
      </h1>
      <hr />
      <p>{question.description.substring(0, 100) + "..."}</p>
      <hr />

      <div className="flex justify-between items-center">
        <div>
          <h1>From: {question.user.name}</h1>
          <h1>
            Created: {moment(question.createdAt).format("DD-MM-YYYY hh:mm:ss")}
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <i className="ri-heart-line"></i>
            <span>{question.likesCount}</span>
          </div>
          <div className="flex gap-1 items-center">
            <i className="ri-chat-new-line"></i>
            <span>{question.commentsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
