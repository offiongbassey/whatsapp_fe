import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

const initialState = {
  status: "",
  error: "",
  isLoggedIn: false,
  user: {
    _id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
        ...values,
      });
      return data;
    } catch (error) {
      if(typeof(error.response.data.message) === 'string'){
        toast(error.response.data.message)
      }else if(Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((err) => {
          toast.error(err.msg);
        })
      }else{
        toast.error("An unexpected error occured");
      }
      return rejectWithValue("");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, {
        ...values,
      });
      return data;
    } catch (error) {
      if(typeof(error.response.data.message) === 'string'){
        toast(error.response.data.message)
      }else if(Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((err) => {
          toast.error(err.msg);
        })
      }else{
        toast.error("An unexpected error occured");
      }
      return rejectWithValue("");
    }
  }
);

export const getLoggedInStatus = createAsyncThunk(
  "auth/status",
  async(token, {rejectWithValue}) => {
    try {
      const { data } = await axios.get(`${AUTH_ENDPOINT}/logged-in-status/${token}`);
      console.log('testing loginstatus ', data.data)
      return data.data;
    } catch (error) {
      console.log("errors ", error);
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "auth/update-profile",
  async(values, { rejectWithValue}) => {
    try {
      const { picture, token } = values;
      const { data } = await axios.post(`${AUTH_ENDPOINT}/update-profile-image`, { picture }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(data.message);
      return data;
    } catch (error) {
      if(typeof(error.response.data.message) === 'string'){
        toast(error.response.data.message)
      }else if(Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((err) => {
          toast.error(err.msg);
        })
      }else{
        toast.error("An unexpected error occured");
      }
      return rejectWithValue("");
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProfileImage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.picture = action.payload.data;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { logout, setLogin } = userSlice.actions;

export default userSlice.reducer;
