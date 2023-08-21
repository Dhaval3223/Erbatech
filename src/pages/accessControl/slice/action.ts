import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { slice } from '.';
import { GET_MENUS, UPDATE_ROLE_PRIVILEGES } from './action_types';

// ----------------------------------------------------------------------

export function getAllRoles(id: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startRolesLoading());
    try {
      const response = await axios.post(GET_MENUS, {
        "RoleId": id,
    });
      console.log('response', response);
      dispatch(slice.actions.getRolesSuccess(response.data.events));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateRoleById(data: {
  RoleId: string,
  data: {
          ProgramCode: string;
          RolePrivilege: string;
      }[]
}) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startUpdateRoleLoading());
    try {
      const response = await axios.post(UPDATE_ROLE_PRIVILEGES, data);
      dispatch(slice.actions.updateEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}