import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { GET_ALL_MENUS } from './action_types';

import { slice } from '.';

export function getAllMenus() {
    return async (dispatch: Dispatch) => {
      dispatch(slice.actions.startGetMenuLoading());
      try {
        const response = await axios.post(GET_ALL_MENUS);
        dispatch(slice.actions.getAllMenus(response.data.data));
      } catch (error) {
        dispatch(slice.actions.hasGettingMenuError(error));
      }
    };
  }