import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { 
CREATE_USER,
DELETE_USER,
EDIT_USER,
VIEW_USER,
GET_ALL_USERS
} from './action_type';

import { slice } from '.';

export function getAllUsers(params: {
  searchValue: string;
  userTypeCode: string;
  userRoleId: string;
  page: string;
  limit: string;
}) {
    return async (dispatch: Dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await axios.post(GET_ALL_USERS, params);
        dispatch(slice.actions.getUserRecords(response.data.events));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }

  export function createUser(userCreate: any) {
    return async (dispatch: Dispatch) => {
      try {
        const response = await axios.post(CREATE_USER, userCreate);
        dispatch(slice.actions.createUser(response.data));
      } catch (error) {
        dispatch(slice.actions.createUserError(error));
      }
    };
  }

  export function updateUserById(id: string, name: string) {
    return async (dispatch: Dispatch) => {
      try {
        const response = await axios.post(EDIT_USER, {
            UserId:id,
            FirstName: name, 
        });
        dispatch(slice.actions.updateUser(response.data));
      } catch (error) {
        dispatch(slice.actions.updateUserError(error));
      }
    };
  }

  export function deleteUserById(userId: string) {
    return async (dispatch: Dispatch) => {
      try {
        const response = await axios.post(DELETE_USER, {
            userId
        });
        dispatch(slice.actions.deleteUser(response.data));
      } catch (error) {
        dispatch(slice.actions.deleteUserError(error));
      }
    };
  }

  export function viewUserById(id: string) {
    return async (dispatch: Dispatch) => {
      try {
        const response = await axios.post(VIEW_USER, {
            userId: id
        });
        dispatch(slice.actions.viewUser(response.data));
      } catch (error) {
        dispatch(slice.actions.viewUserError(error));
      }
    };
  }