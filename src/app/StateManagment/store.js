import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '@/app/StateManagment/Slices/currentUserSlice'
import selectedUserSlice from '@/app/StateManagment/Slices/selectedUserSlice'

export const store = configureStore({
  reducer: {
    currentUser:currentUserReducer,
    selectedUser:selectedUserSlice,
  },
})