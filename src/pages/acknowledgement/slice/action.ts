import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { GET_ACKNOWLEDGEMENT, CHECK_ALERM } from './action_types';

import { slice } from '.';

export function getAcknowledgementAPI(params: any) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startGetAcknowledgementLoading());
    try {
      const response = await axios.post(GET_ACKNOWLEDGEMENT, {
        ...params,
      });
      dispatch(slice.actions.handleGetAcknowledgementAPI(response.data));
    } catch (error) {
      dispatch(slice.actions.hasGetAcknowledgementErr(error));
    }
  };
}

export function checkAlermStatusApi(params: { topic: string; userId: string | number }) {
  return async (dispatch: Dispatch) => {
    // dispatch(slice.actions.startGetAcknowledgementLoading());
    try {
      const response = await axios.post(CHECK_ALERM, {
        ...params,
      });
      dispatch(slice.actions.handleCheckAlarmSucess(response.data));
    } catch (error) {
      dispatch(slice.actions.handleCheckAlarmErr(error));
    }
  };
}
