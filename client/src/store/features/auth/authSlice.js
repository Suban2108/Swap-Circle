import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Async actions
export const loginUser = createAsyncThunk("auth/loginUser", async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${payload.baseUrl}/api/auth/login`, {
      email: payload.email,
      password: payload.password,
      role: payload.role,
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed")
  }
})

export const registerUser = createAsyncThunk("auth/registerUser", async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${payload.baseUrl}/api/auth/register`, {
      email: payload.email,
      password: payload.password,
      name: payload.name,
      role: payload.role,
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed")
  }
})

const initialState = {
  userId: null,
  token: null,
  email: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userId = null
      state.token = null
      state.email = null
      state.isAuthenticated = false
      localStorage.clear()
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      const email = localStorage.getItem("email")
      if (token && userId) {
        state.token = token
        state.userId = userId
        state.email = email
        state.isAuthenticated = true
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.userId = action.payload.userId
        state.isAuthenticated = true
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("userId", action.payload.userId)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.userId = action.payload.userId
        state.isAuthenticated = true
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("userId", action.payload.userId)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, loadUserFromStorage } = authSlice.actions
export default authSlice.reducer
