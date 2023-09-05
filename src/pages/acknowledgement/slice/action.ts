import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { GET_ACKNOWLEDGEMENT } from './action_types';

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
