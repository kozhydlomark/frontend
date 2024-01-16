// comment.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const postComment = createAsyncThunk(
  "comments/postComment",
  async ({ postId, text }) => {
    try {
      const response = await axios.post(`/posts/${postId}/comments`, { text });
      return response.data;
    } catch (error) {
      // якщо помилка
      console.error("Помилка при додаванні коментаря:", error);
      throw error;
    }
  }
);

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const response = await axios.get(`/posts/${postId}/comments`);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "succeeded";

      })
      .addCase(postComment.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectComments = (state) => state.comments.items;

export default commentSlice.reducer;