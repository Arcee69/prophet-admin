import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';


export const fetchStats = createAsyncThunk(
    'stats/fetchStats',
    async (values, { rejectWithValue }) => {
      try {
        const data = await api.get(appUrls?.STATS_URL)
        return data?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

const getStatsCardSlice = createSlice({
    name: 'stats',
    initialState: {
      stats: [],
      loading: false,
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchStats.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStats.fulfilled, (state, action) => {
          state.loading = false;
          state.stats = action.payload;
        })
        .addCase(fetchStats.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default getStatsCardSlice.reducer;