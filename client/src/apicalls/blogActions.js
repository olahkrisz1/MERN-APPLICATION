import { axiosInstance } from ".";

// Like a question

export const LikeQuestion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/actions/like-question",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// unlike a blog

export const UnLikeQuestion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/actions/unlike-question",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all likes of a question

export const GetAllLikesofQuestion = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/actions/get-all-likes-of-question/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// add a comment

export const AddComment = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/actions/add-comment",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all comments of a blog
export const GetAllCommentsOfQuestion = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/actions/get-all-comments-of-question/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete comment
export const DeleteComment = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/actions/delete-comment",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
