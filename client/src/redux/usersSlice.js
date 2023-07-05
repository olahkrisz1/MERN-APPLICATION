import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    users: [],
  },
  reducers: {
    SetCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    SetAllUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { SetCurrentUser, SetAllUsers } = userSlice.actions;
export default userSlice.reducer;
