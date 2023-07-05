import { axiosInstance } from ".";

// register a new user

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// Login a user

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};

// get user dtails from token

export const GetUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/getuser");
    return response.data;
  } catch (error) {
    throw error || error.response.data;
  }
};
