import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IReportsSlice } from './types';

// ----------------------------------------------------------------------

const initialState: IReportsSlice = {
  isGetReportLoading: false,
  reportsData: [],
  isGetReportErr: false,
  reportDataErrMsg: '',
  isDownloadCSVLoading: false,
  downloadCSVData: [],
  isDownloadCSVSuccess: false,
  isDownloadCSVError: false,
  downloadCSVMsg: '',
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
      console.log('data 1', action?.payload);
      return {
        ...state,
        isGetReportLoading: false,
        reportsData: action.payload,
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
        isDownloadCSVLoading: false,
        downloadCSVData: [],
        isDownloadCSVSuccess: false,
        isDownloadCSVError: false,
        downloadCSVMsg: '',
      };
    },

    startDownloadReportCSVLoading(state) {
      return {
        ...state,
        isDownloadCSVLoading: true,
      };
    },
    handleDownloadReportCSV(state, action) {
      console.log('action?.payload', action?.payload);
      return {
        ...state,
        isDownloadCSVLoading: false,
        downloadCSVData: action?.payload,
        isDownloadCSVSuccess: true,
        downloadCSVMsg: 'Download sucessFully',
      };
    },
    hasDownloadReportCSV(state, action) {
      return {
        ...state,
        isDownloadCSVLoading: false,
        downloadCSVData: [],
        isDownloadCSVSuccess: false,
        isDownloadCSVError: true,
        downloadCSVMsg: 'Something went wrong!!',
      };
    },
    cleatDownloadReportCSVState(state) {
      return {
        ...state,
        isDownloadCSVLoading: false,
        downloadCSVData: [],
        isDownloadCSVSuccess: false,
        isDownloadCSVError: false,
        downloadCSVMsg: '',
      };
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
