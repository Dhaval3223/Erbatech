import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { 
GET_SENSOR_BY_ID,
UPDATE_SENSOR_BY_ID
} from './action_type';
import { slice } from '.';

  export function getSensorDataByID(data: {
    UserId: string;
    SensorType: string;
  }){
    return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
      try {
        const response = await axios.post(GET_SENSOR_BY_ID, data);
        dispatch(slice.actions.getSensorRecords(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }

  export function updateSensorByID(data: any){
    return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startUpdateLoading());
      try {
        const response = await axios.post(UPDATE_SENSOR_BY_ID, data);
        dispatch(slice.actions.getSensorUpdatedRecords(response.data));
      } catch (error) {
        dispatch(slice.actions.hasUpdatedError(error));
      }
    };
  }
