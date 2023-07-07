import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteQuestion, GetQuestionById } from "../../apicalls/questions";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { toast } from "react-hot-toast";
import ReactHtmlParser from "react-html-parser";
import draftToHtml from "draftjs-to-html";
import moment from "moment";
import {
  AddComment,
  GetAllCommentsOfQuestion,
  GetAllLikesofQuestion,
  LikeQuestion,
  UnLikeQuestion,
} from "../../apicalls/blogActions";
import Comment from "./Comment";

function QuestionDescription() {
  const [comments = [], setComments = []] = useState([]);
  const [showComments = false, setShowComments = false] = useState(true);

  const [showAddComment = false, setShowAddComment = false] = useState(false);
  const [comment = "", setComment = ""] = useState("");
  const [isAlreadyLiked, setisAlreadyLiked] = useState(false);
  const [likes = [], setLikes = []] = useState([]);
  const [question, setQuestion] = useState([null]);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const deleteQuestion = async () => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteQuestion(id);
      if (response.success) {
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetQuestionById(id);
      const likesResponse = await GetAllLikesofQuestion(id);
      const commentsResponse = await GetAllCommentsOfQuestion(id);
      if (likesResponse.success) {
        setLikes(likesResponse.data);
        const isLiked = likesResponse.data.find(
          (like) => like.user._id === currentUser._id
        );
        setisAlreadyLiked(isLiked);
      }
      if (commentsResponse.success) {
        setComments(commentsResponse.data);
      }

      if (response.success) {
        setQuestion(response.data);
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const likeOrUnlike = async () => {
    try {
      dispatch(ShowLoading());
      let response = null;

      if (isAlreadyLiked) {
        response = await UnLikeQuestion({
          question: question?._id,
          user: currentUser._id,
        });
      } else {
        response = await LikeQuestion({
          question: question?._id,
          user: currentUser._id,
        });
      }
      if (response.success) {
        getData();
        setisAlreadyLiked(!isAlreadyLiked);
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  const addComment = async () => {
    try {
      dispatch(ShowLoading());
      const response = await AddComment({
        question: question?._id,
        user: currentUser._id,
        comment,
      });
      if (response.success) {
        getData();
        setComment("");
        setShowAddComment(false);
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    question && (
      <div className="p-2 flex flex-col gap-5">
        <div className="flex justify-between">
          <Button
            title="Back"
            variant="primary-outlined"
            onClick={() => navigate("/")}
          />
          {currentUser?._id === question?.user?._id && (
            <div className="flex justify-end gap-5 ">
              <Button
                onClick={() => deleteQuestion()}
                title="Delete"
                variant="primary-outlined"
              />
              <Button
                onClick={() => navigate(`/edit-question/${question?._id}`)}
                title="Edit"
              />
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-primary">{question?.title}</h1>
        <hr />
        <h1>{question?.description}</h1>
        {question?.content && (
          <div>
            {ReactHtmlParser(draftToHtml(JSON.parse(question?.content)))}
          </div>
        )}
        <hr />
        <div className="flex justify-between items-center">
          <div>
            <h1>From: {question.user && question.user.name}</h1>
            <h1>
              Created:{" "}
              {question.createdAt &&
                moment(question.createdAt).format("DD-MM-YYYY hh:mm:ss")}
            </h1>
          </div>

          <div className="flex gap-4 items-center">
            <div
              className="flex gap-1 items-center cursor-pointer"
              onClick={likeOrUnlike}
            >
              <i
                className="ri-heart-fill"
                style={{ color: isAlreadyLiked ? "red" : "gray" }}
              ></i>
              <span>{question.likesCount}</span>
            </div>
            <div className="flex gap-1 items-center cursor-pointer">
              <i className="ri-chat-new-line"></i>
              <span>{question.commentsCount}</span>
            </div>
          </div>
        </div>

        <div>
          {!showAddComment && (
            <div className="flex justify-end underline cursor-pointer">
              <h1 onClick={() => setShowAddComment(!showAddComment)}>
                Add Comment
              </h1>
            </div>
          )}
          {showAddComment && (
            <div className="flex flex-col gap-5 shadow p-5 border">
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end gap-5">
                <Button
                  title="Cancel"
                  onClick={() => setShowAddComment(false)}
                  variant="primary-outlined"
                />
                <Button title="Add Comment" onClick={addComment} />
              </div>
            </div>
          )}

          {showComments && (
            <div className="flex flex-col gap-5 mt-5">
              {comments.map((comment) => (
                <Comment comment={comment} getData={getData} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default QuestionDescription;
