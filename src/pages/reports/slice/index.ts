import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IReportsSlice } from './types';

// ----------------------------------------------------------------------

const initialState: IReportsSlice = {
  isGetReportLoading: false,
  reportsData: [],
  isGetReportErr: false,
  reportDataErrMsg: '',
};

const slice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    startGetReportsLoading(state) {
      return {
        ...state,
        isGetReportLoading: true,
      };
    },
    handleGetReportData(state, action) {
      return {
        ...state,
        isGetReportLoading: false,
        reportsData: action.payload?.data?.data,
      };
    },
    hasGetReportErr(state, action) {
      return {
        ...state,
        isGetReportLoading: false,
        isGetReportErr: true,
        reportDataErrMsg: 'Something went wrong!! Please try again.',
      };
    },
    clearGetReportErrState(state) {
      return {
        ...state,
        isGetReportErr: false,
      }
    }
  },
});

// Reducer
export { slice };
export default slice.reducer;
