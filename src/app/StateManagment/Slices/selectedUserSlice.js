import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  topic: "",
  username:"",
};

const selectedUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {setSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
