import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';


export const fetchReports = createAsyncThunk(
    'reports/fetchReports',
    async ({ page = 1 }, { rejectWithValue }) => {
      try {
        const data = await api.get(`${appUrls?.REPORTS_URL}?page=${page}`)
        return data?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

const getReportsSlice = createSlice({
    name: 'reports',
    initialState: {
      reports: [],
      pagination: null,
      loading: false,
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchReports.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchReports.fulfilled, (state, action) => {
          state.loading = false;
          state.reports = action.payload;
          state.pagination = {
            currentPage: action.payload.pagination?.current_page,
            nextPageUrl: action.payload.pagination?.next_page_url,
            prevPageUrl: action.payload.pagination?.prev_page_url,
            total: action.payload.pagination?.total,
          };
        })
        .addCase(fetchReports.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default getReportsSlice.reducer;