  import axios from 'axios'
  import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
  import { API_URL } from '../constants'

  // Service for handling image uploads and retrieval
  const uploadService = {
    uploadImage: async (data, token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        console.log("Image phoot:",data)
        const response = await axios.post(API_URL + `/api/upload/${data.id}`, {
          photo: data.photo,
        }, config )
        console.log("Image phoot response:",response)
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to upload image')
      }
    },
    getUploadImage: async (token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get(API_URL + '/api/users/get_image', config)
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Failed to retrieve image')
      }
    },
  }

  // Redux thunk for uploading profile image
  export const uploadProfileImage = createAsyncThunk(
    'upload/profileUpdate',
    async (data, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        console.log(token)
        return await uploadService.uploadImage(data, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
      }
    }     
  )

  // Redux thunk for retrieving user image
  export const getUserImage = createAsyncThunk(
    'upload/getUploadedImage',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await uploadService.getUploadImage(token)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  )

  // Redux slice for handling upload state
  export const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
      userImg: null,
      uploadLoading: false,
      uploadSuccess: false,
      uploadError: false,
      message: '',
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(uploadProfileImage.pending, (state) => {
          state.uploadLoading = true
        })
        .addCase(uploadProfileImage.fulfilled, (state, action) => {
          state.uploadLoading = false
          state.uploadSuccess = true
          state.userImg = action.payload.image
        })
        .addCase(uploadProfileImage.rejected, (state, action) => {
          state.uploadLoading = false
          state.uploadError = true
          state.message = action.payload
        })
        .addCase(getUserImage.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getUserImage.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.userImg = action.payload
        })
        .addCase(getUserImage.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  })

  export default uploadSlice.reducer
