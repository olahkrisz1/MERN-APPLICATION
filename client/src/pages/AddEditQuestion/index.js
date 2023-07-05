import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddNewQuestion, UpdateQuestion } from "../../apicalls/questions";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { GetQuestionById } from "../../apicalls/questions";

function AddEditQuestion() {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [question, setQuestion] = React.useState({
    title: "",
    content: EditorState.createEmpty(),
    description: "",
    canShare: false,
    canComment: false,
    canLike: false,
  });

  const onSave = async () => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (params.id) {
        response = await UpdateQuestion({
          ...question,
          content: JSON.stringify(
            convertToRaw(question.content.getCurrentContent())
          ),
          _id: params.id,
        });
      } else {
        response = await AddNewQuestion({
          ...question,
          content: JSON.stringify(
            convertToRaw(question.content.getCurrentContent())
          ),
          user: currentUser._id,
        });
      }
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
      const response = await GetQuestionById(params.id);
      if (response.success) {
        setQuestion({
          ...response.data,
          content: EditorState.createWithContent(
            convertFromRaw(JSON.parse(response.data.content))
          ),
        });
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
    if (params.id) {
      getData();
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-primary uppercase text-2xl font-bold">
          {params.id ? "Edit Question" : "Add new Question"}
        </h1>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <input
          type="text"
          placeholder="Title"
          value={question.title}
          onChange={(e) => setQuestion({ ...question, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={question.description}
          onChange={(e) =>
            setQuestion({ ...question, description: e.target.value })
          }
          rows={5}
        />

        <div>
          <Editor
            toolbarStyle={{
              border: "1px solid #ccc",
            }}
            editorStyle={{
              border: "1px solid #ccc",
              minHeight: "200px",
              padding: "10px",
            }}
            editorState={question.content}
            onEditorStateChange={(content) =>
              setQuestion({ ...question, content: content })
            }
          />
        </div>

        <div className="flex justify-end gap-5 m-2">
          <Button
            title="Cancel"
            variant="primary-outlined"
            onClick={() => navigate("/")}
          />
          <Button title="Save" onClick={onSave} />
        </div>
      </div>
    </div>
  );
}

export default AddEditQuestion;
