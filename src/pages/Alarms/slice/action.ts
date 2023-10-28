import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { slice } from '.';
import { 
ACKNOWLEDGE_ALARM,
CHECK_ALARM_BY_ID,
GET_ALARM_BY_ID
} from './action_type';

export function getAlarmData(params: {
    userId: string;
    page?: number;
    limit?: number;
   status: boolean;
  }) {
    return async (dispatch: Dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await axios.post(GET_ALARM_BY_ID, {
            ...params,
            page: params.page,
        });
        dispatch(slice.actions.getAlarmDataSuccess(response.data.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }

  export function getCheckAlarmData() {
    return async (dispatch: Dispatch) => {
      dispatch(slice.actions.startCheckAlarmsLoading());
      try {
        const response = await axios.post(CHECK_ALARM_BY_ID);
        dispatch(slice.actions.getCheckAlarmSuccess(response.data.data));
      } catch (error) {
        dispatch(slice.actions.hasCheckAlarmError(error));
      }
    };
  }
  export function getAcknowledgeAlarmData() {
    return async (dispatch: Dispatch) => {
      dispatch(slice.actions.startalarmAcknowledgementLoading());
      try {
        const response = await axios.post(ACKNOWLEDGE_ALARM);
        dispatch(slice.actions.getAlarmAcknowledgementSuccess(response.data.data));
      } catch (error) {
        dispatch(slice.actions.hasAcknowAlarmError(error));
      }
    };
  }