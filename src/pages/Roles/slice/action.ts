import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { slice } from '.';
import { 
  CREATE_ROLE, 
  GET_ROLE_BY_ID, 
  GET_ALL_ROLES, 
  UPDATE_ROLE_BY_ID, 
  DELETE_ROLE_BY_ID
} from './action_type';
// ----------------------------------------------------------------------

export function getAllRoles() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(GET_ALL_ROLES);
      console.log('response', response);
      dispatch(slice.actions.getRolesSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRoleById() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(GET_ROLE_BY_ID);
      dispatch(slice.actions.getRolesSuccess(response.data.events));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createNewRole(newRole: {
  RoleName: string
}) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startCreateRoleLoading());
    try {
      const response = await axios.post(CREATE_ROLE, newRole);
      console.log(response.data.event);
      console.log('response', response);
      dispatch(slice.actions.createRoleSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasCreateRoleError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateRoleById(
  eventId: string,
  event: Partial<{
    allDay: boolean;
    start: Date | string | number | null;
    end: Date | string | number | null;
  }>
) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(UPDATE_ROLE_BY_ID, {
        eventId,
        event,
      });
      dispatch(slice.actions.updateEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteRoleById(roleId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post(DELETE_ROLE_BY_ID, {
        roleId
    });
      dispatch(slice.actions.deleteRoleEventSuccess(roleId));
    } catch (error) {
      dispatch(slice.actions.deleteRoleEventError(error));
    }
  };
}
