import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';


export const fetchOneTimePayment = createAsyncThunk(
    'oneTimePayment/fetchOneTimePayment',
    async (values, { rejectWithValue }) => {
      try {
        const data = await api.get(appUrls?.ONETIMEPAYMENT_URL)
        return data?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

const getOneTimePaymentSlice = createSlice({
    name: 'oneTimePayment',
    initialState: {
      oneTimePayment: [],
      pagination: null,
      loading: false,
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchOneTimePayment.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchOneTimePayment.fulfilled, (state, action) => {
          state.loading = false;
          state.oneTimePayment = action.payload;
          state.pagination = {
            currentPage: action.payload.current_page,
            nextPageUrl: action.payload.next_page_url,
            prevPageUrl: action.payload.prev_page_url,
            total: action.payload.total,
          };
        })
        .addCase(fetchOneTimePayment.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
  });
  
  export default getOneTimePaymentSlice.reducer;