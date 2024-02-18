import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import localStorageAvailable from 'src/utils/localStorageAvailable';
import { slice } from '.';
import { GENERATE_CSV, GET_REPORT } from './action_types';
// ----------------------------------------------------------------------

export function getAllReportsData(params: {
  topicName: any;
  page: number;
  limit: number;
  userId?: number;
  startDate?: any;
  endDate?: any;
  type?: any;
}) {
  return async (dispatch: Dispatch) => {
    const storageAvailable = localStorageAvailable();
    const user: any = storageAvailable ? JSON.parse(localStorage.getItem('user') || '{}') : '';
    dispatch(slice.actions.startGetReportsLoading());
    try {
      const response = await axios.post(
        GET_REPORT,
        user?.UserTypeCode === 'CU' ? { ...params, topicName: user?.UserTopicName?.send } : params
      );
      console.log('response', response);
      dispatch(slice.actions.handleGetReportData(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasGetReportErr(error));
    }
  };
}

export function downLoadReportCSV(params: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startDownloadReportCSVLoading());
    try {
      const response = await axios.post(GET_REPORT, params);
      console.log('response', response);
      dispatch(slice.actions.handleDownloadReportCSV(response.data));
    } catch (error) {
      dispatch(slice.actions.hasDownloadReportCSV(error));
    }
  };
}

export function generateCSV(params: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startDownloadReportCSVLoading());
    try {
      const response = await axios.get(GENERATE_CSV, { params });
      dispatch(slice.actions.handleDownloadReportCSV(response.data));
    } catch (error) {
      dispatch(slice.actions.hasDownloadReportCSV(error));
    }
  };
}
