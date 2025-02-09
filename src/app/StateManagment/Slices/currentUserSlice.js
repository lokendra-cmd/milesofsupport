import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  address: "",
  topic: "",
  username:"",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserField, setUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
