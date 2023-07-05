import { axiosInstance } from ".";

// Add a new question

export const AddNewQuestion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/questions/add-question",
      payload
    );
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// get all questions

export const GetAllQuestions = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/questions/get-all-questions"
    );
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// get question by id

export const GetQuestionById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/questions/get-question-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// Update Question

export const UpdateQuestion = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/questions/update-question/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// Delete question

export const DeleteQuestion = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/questions/delete-question/${id}`
    );
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};
