import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (values, { rejectWithValue }) => {
      try {
        const data = await api.get(appUrls?.USERS_URL + `/role?type=user`)
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
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default getUsersSlice.reducer;