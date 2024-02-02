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
  csvData: [],
  isGenerateCsvLoading: false,
  isGenerateCsvSuccess: false,
  isGenerateCsvError: false,
  generateCsvmsg: false,
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
    startGenerateCSVLoading(state) {
      return {
        ...state,
        isGenerateCsvLoading: true,
      };
    },
    handleGenerateCsv(state, action) {
      return {
        ...state,
        csvData: [],
        isGenerateCsvLoading: false,
        isGenerateCsvSuccess: false,
        isGenerateCsvError: false,
        generateCsvmsg: false,
      };
    },
    hasGenerateCsvError(state, action) {
      return {
        ...state,
        csvData: [],
        isGenerateCsvLoading: false,
        isGenerateCsvError: false,
        generateCsvmsg: false,
      };
    },
    resetGenerateCsvStates(state) {
      return {
        ...state,
        csvData: [],
        isGenerateCsvLoading: false,
        isGenerateCsvError: false,
        generateCsvmsg: false,
      };
    },
    cleatDownloadReportCSVState(state) {
      return {
        ...state,
        isGenerateCsvLoading: false,
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
