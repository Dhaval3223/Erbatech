import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { 
GET_TEMPLATE_DETAILS,
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
        const response = await axios.post(GET_TEMPLATE_DETAILS, data);
        dispatch(slice.actions.getSensorRecords(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }