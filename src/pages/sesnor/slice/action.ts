import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { 
GET_SENSOR_BY_ID,
UPDATE_SENSOR_BY_ID,
CREATE_SENSOR_BY_ID,
DELETE_SENSOR_BY_ID
} from './action_type';
import { slice } from '.';

  export function getSensorDataByID(data: {
    userId: string;
    sensorType: string;
    searchValue: string;
    page: string;
    limit: string;
  }){
    return async (dispatch: Dispatch) => {
    // dispatch(slice.actions.startLoading());
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
    // dispatch(slice.actions.startUpdateLoading());
      try {
        const response = await axios.post(UPDATE_SENSOR_BY_ID, data);
        dispatch(slice.actions.getSensorUpdatedRecords(response.data));
      } catch (error) {
        dispatch(slice.actions.hasUpdateSensorDataError(error));
      }
    };
  }

  export function createSensorByID(data: {
    userId: string;
    sensorType: string;
    data: any;
  }){
    return async (dispatch: Dispatch) => {
    // dispatch(slice.actions.startLoading());
      try {
        const response = await axios.post(CREATE_SENSOR_BY_ID, data);
        dispatch(slice.actions.getSensorCreatedRecords(response.data));
      } catch (error) {
        dispatch(slice.actions.createHasError(error));
      }
    };
  }

  export function deleteSensorById(data: {
    userId: string;
    index: string;
    sensorType: string;
  }){
    return async (dispatch: Dispatch) => {
    // dispatch(slice.actions.startLoading());
      try {
        const response = await axios.post(DELETE_SENSOR_BY_ID, data);
        dispatch(slice.actions.deleteSensorEventSuccess(response.data));
      } catch (error) {
        dispatch(slice.actions.deleteSensorEventError(error));
      }
    };
  }
