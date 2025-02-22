import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:"",
  address:"",
  topic:"",
  email:"",
  username:"",
  profilepic:null,
  profilepic_id:null,
  coverpic:null,
  coverpic_id:null,
  razorpayid:"",
  razorpaysecret:"",
  creator:"",
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
