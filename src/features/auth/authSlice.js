import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
   user: user ? user : null,
   users: [],
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: "",
   currentUser:"",
   currentUserById:""
};

// @login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
   try {
      return await authService.login(user);
   } catch (error) {
      console.log(error);
      const message =
         (error.response &&
            error.response.data &&
            error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkAPI.rejectWithValue(message);
   }
});

// @register
export const register = createAsyncThunk(
   "auth/register",
   async (user, thunkAPI) => {
      try {
         return await authService.register(user);
      } catch (err) {
         console.log(err);
         const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
         return thunkAPI.rejectWithValue(message);
      }
   }
);

// @get all users
export const getusers = createAsyncThunk(
   "auth/getAllUsers",
   async (__, thunkAPI) => {
      try {
         const token = thunkAPI.getState().auth.user.token;
         return await authService.getAllUsers(token);
      } catch (error) {
         const message =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
            error.message ||
            error.toString();
         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const fetchCurrentUser = createAsyncThunk(
   "auth/fetchCurrentUser",
   async (_, thunkAPI) => {
      try {
         const user = JSON.parse(localStorage.getItem("user"));
         
         if (!user) {
            throw new Error("User not found in local storage");
         }
         const response = await authService.getCurrentUser(user.token);
         return response;
      } catch (error) {
         console.error("Failed to fetch current user:", error);
         return thunkAPI.rejectWithValue(error.message || "Failed to fetch current user");
      }
   }
);


// Get single user by ID
export const getUserById = createAsyncThunk(
   "auth/getUserById",
   async (userId, thunkAPI) => {
      try {
         const response = await authService.getUserById(userId);
         // console.log(response)
         return response;
      } catch (error) {
         // Handle error
         return thunkAPI.rejectWithValue(error.message || "Failed to fetch user");
      }
   }
);

// @logout
export const logout = createAsyncThunk("auth/logout", async () => {
   return authService.logout();
});

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      reset: (state) => {
         state.users = [];
         state.isLoading = false;
         state.isError = false;
         state.isSuccess = false;
         state.message = "";
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(register.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
         })
         .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
         })
         .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
         })
         .addCase(getusers.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getusers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = action.payload;
         })
         .addCase(getusers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.users = null;
         })
         .addCase(fetchCurrentUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
         })
         .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(getUserById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUserById = action.payload;
         })
         .addCase(getUserById.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUserById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
         })
         .addCase(logout.fulfilled, (state) => {
            state.user = null;
         });
   },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
