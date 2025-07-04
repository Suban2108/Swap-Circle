import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../store/features/auth/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
