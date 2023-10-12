import { Dispatch } from '@reduxjs/toolkit';
import axios from 'src/utils/axiosInstance';

import { GET_TEMPLATE_BY_ID } from './action_type';
import { slice } from '.';

export function getTemplateDataByID(data: { TemplateId: string | undefined }) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(GET_TEMPLATE_BY_ID, data);
      dispatch(slice.actions.getTemplateRecords(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
