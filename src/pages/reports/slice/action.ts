import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { slice } from '.';
import { GET_REPORT } from './action_types';
// ----------------------------------------------------------------------

export function getAllReportsData(params: { TransactionTopicName: string; page: number; limit: number }) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startGetReportsLoading());
    try {
      const response = await axios.post(GET_REPORT, params);
      console.log('response', response);
      dispatch(slice.actions.handleGetReportData(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasGetReportErr(error));
    }
  };
}
