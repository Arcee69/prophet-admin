import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (page = 1, { rejectWithValue }) => {
      try {
        const data = await api.get(appUrls?.USERS_URL + `/role?type=user&page=${page}`)
        return data?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

const getUsersSlice = createSlice({
    name: 'users',
    initialState: {
      users: [],
      pagination: null,
      loading: false,
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;
          state.pagination = {
            currentPage: action.payload.pagination?.current_page,
            nextPageUrl: action.payload.pagination?.next_page_url,
            prevPageUrl: action.payload.pagination?.prev_page_url,
            total: action.payload.pagination?.total,
          };
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default getUsersSlice.reducer;