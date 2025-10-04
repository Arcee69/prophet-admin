import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';


export const fetchAdmins = createAsyncThunk(
    'admins/fetchAdmins',
    async (values, { rejectWithValue }) => {
      try {
        const data = await api.get(appUrls?.USERS_URL + `/role?type=admin`)
        return data?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

const getAdminsSlice = createSlice({
    name: 'admins',
    initialState: {
      admins: [],
      pagination: null,
      loading: false,
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAdmins.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAdmins.fulfilled, (state, action) => {
          state.loading = false;
          state.admins = action.payload;
          state.pagination = {
            currentPage: action.payload.pagination?.current_page,
            nextPageUrl: action.payload.pagination?.next_page_url,
            prevPageUrl: action.payload.pagination?.prev_page_url,
            total: action.payload.pagination?.total,
          };
        })
        .addCase(fetchAdmins.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default getAdminsSlice.reducer;