import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { useSnackbar } from 'notistack';
import {
  CREATE_USER,
  DELETE_USER,
  EDIT_USER,
  VIEW_USER,
  GET_ALL_USERS,
  VIEW_ALL_TEMPLATE,
  UPDATE_TEMPLATE_BY_ID,
  CREATE_TEMPLATE_MAPPING,
  DELETE_TEMPLATE,
} from './action_type';

import { slice } from '.';

export function getAllUsers(params: {
  searchValue?: string;
  userType: string;
  userRoleId: string;
  page?: string;
  limit?: string;
  userTemplateId?: any;
  userTemplateType?: 'mapped' | 'unmapped';
  type?: 'all' | '';
}) {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(GET_ALL_USERS, {
        ...params,
        page: String(Number(params.page) + 1),
      });
      dispatch(slice.actions.getUserRecords(response.data.data));
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

export function updateUserById(data: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(EDIT_USER, data);
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
        userId,
      });
      dispatch(slice.actions.deleteUser(response.data));
    } catch (error) {
      dispatch(slice.actions.deleteUserError(error));
    }
  };
}

export function deleteTemplateById(userId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(DELETE_TEMPLATE, {
        userId,
      });
      dispatch(slice.actions.deletTemplateById(response.data));
    } catch (error) {
      dispatch(slice.actions.deleteTemplateByIdError(error));
    }
  };
}

export function viewUserById(id: string) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(VIEW_USER, {
        userId: id,
      });
      dispatch(slice.actions.viewUser(response.data));
    } catch (error) {
      dispatch(slice.actions.viewUserError(error));
    }
  };
}

export function updateTemplateById(data: {
  TemplateId: string;
  TemplateName: string;
  TemplateStatus: boolean;
}) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(UPDATE_TEMPLATE_BY_ID, data);
      dispatch(slice.actions.updateTemplateByIdSuccess(response.data));
    } catch (error) {
      console.log('error', error);
      dispatch(slice.actions.updateTemplateByIdError(error));
    }
  };
}

export function viewAllTemplate(data: any = {}) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(VIEW_ALL_TEMPLATE, data);
      dispatch(slice.actions.viewAllTemplate(response.data));
    } catch (error) {
      dispatch(slice.actions.viewAllTemplateError(error));
    }
  };
}

export function createTemplateMapping(data: {
  userTemplateId: string | number;
  userId: string | number;
  topics: {
    send: string;
    alarm: string;
    receive: string;
  };
}) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(CREATE_TEMPLATE_MAPPING, data);
      dispatch(slice.actions.viewAllTemplate(response.data));
    } catch (error) {
      dispatch(slice.actions.viewAllTemplateError(error));
    }
  };
}
