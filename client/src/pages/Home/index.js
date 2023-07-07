import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { GetAllQuestions } from "../../apicalls/questions";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { toast } from "react-hot-toast";
import Question from "./Question";

function Home() {
  const [questions, setQuestions] = useState([]);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllQuestions();
      if (response.success) {
        setQuestions(response.data);
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
    <div>
      <div className="flex justify-between mx-2">
        <h1 className="text-primary uppercase text-2xl font-bold">
          {currentUser.name}, Welcome to Matrix Master Community!
        </h1>

        <Button
          title="Ask!"
          variant="primary-outlined"
          onClick={() => navigate("/add-question")}
        />
      </div>

      <div className="grid lg:grid-cols-2 xl:grid gap-5 mt-5 sm:grid-cols-1 xs:grid-cols-1">
        {questions.map((question) => (
          <Question key={question._id} question={question} />
        ))}
      </div>
    </div>
  );
}

export default Home;
