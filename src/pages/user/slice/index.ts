import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { IUserState } from './types';

const initialState: IUserState = {
  isUserLoading: false,
  users: {
    count: 0,
    rows: [
      {
        Address1: '',
        DateOfBirth: '',
        DateOfJoin: '',
        FirstName: '',
        LastName: '',
        MiddleName: '',
        Mobile: '',
        UserCode: '',
        UserEmail: '',
        UserGender: '',
        UserId: '',
        UserPassword: '',
        UserRoleId: '',
        UserStatus: false,
        UserTypeCode: '',
      },
    ],
  },
  viewError: false,
  viewSuccess: false,
  error: {},
  createUserError: false,
  createUserMsg: '',
  createUserSucess: false,
  updateUserError: false,
  updateUserMsg: '',
  updateUserSuccess: false,
  deleteUserError: false,
  deleteUserMsg: '',
  deleteUserSuccess: false,
  viewUserData: {},
  viewUserLoading: true,
  viewTemplateLoader: true,
  viewTemplateData: {
    count: 0,
    rows: [
      {
        TemplateId: '',
        TemplateName: '',
        TemplatePath: '',
      },
    ],
  },
  updateTemplateByIdSuccess: false,
  updateTemplateByIdError: false,
  updateTemplateByIdMsg: '',
  createTemplateSuccess: false,
  createTemplateError: false,
  createTemplateMsg: '',
  deleteTemplateSuccess: false,
  deleteTemplateMsg: '',
  deleteTemplateError: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isUserLoading = true;
    },
    getUserRecords(state, action) {
      state.viewSuccess = true;
      state.isUserLoading = false;
      state.users = action.payload;
    },
    hasError(state, action) {
      state.isUserLoading = false;
      state.error = action.payload;
    },
    createUser(state, action) {
      state.createUserSucess = true;
      state.createUserMsg = action.payload.data.message;
    },
    createUserError(state, action) {
      state.createUserError = true;
      state.createUserMsg = action.payload.data.message;
    },
    resetCreateUserState(state) {
      state.createUserMsg = '';
      state.createUserError = false;
      state.createUserSucess = false;
    },
    resetUpdateUserState(state) {
      state.updateUserMsg = '';
      state.updateUserError = false;
      state.updateUserSuccess = false;
    },
    updateUser(state, action) {
      state.updateUserSuccess = true;
      state.updateUserMsg = action.payload.data.message;
    },
    updateUserError(state, action) {
      state.updateUserError = true;
      state.updateUserMsg = 'Something went wrong';
    },
    deleteUser(state, action) {
      console.log(action);
      state.deleteUserSuccess = true;
      state.deleteUserMsg = action?.payload?.message || 'Deleted user successfully';
    },
    deleteUserError(state, action) {
      state.deleteUserError = true;
      state.deleteUserMsg = action.payload.data.message;
    },
    resetDeleteUser(state) {
      state.deleteUserSuccess = false;
      state.deleteUserError = false;
      state.deleteUserMsg = '';
    },
    deletTemplateById(state, action) {
      state.deleteTemplateSuccess = true;
      state.deleteTemplateMsg = action?.payload?.data?.message || 'Deleted Successfully';
    },
    deleteTemplateByIdError(state, action) {
      state.deleteTemplateError = true;
      state.deleteTemplateMsg = action?.payload?.data?.message || 'Failed to delete';
    },
    resetDeleteTemplateById(state) {
      state.deleteTemplateSuccess = false;
      state.deleteTemplateMsg = '';
      state.deleteTemplateError = false;
    },
    viewUser(state, action) {
      console.log('view', action.payload.data);
      state.viewUserLoading = false;
      state.viewUserData = action.payload.data;
    },
    viewUserError(state, action) {
      state.viewUserLoading = false;
    },
    viewAllTemplate(state, action) {
      state.viewTemplateLoader = false;
      state.viewTemplateData = action.payload.data;
    },
    viewAllTemplateError(state, action) {
      state.viewTemplateLoader = false;
    },
    updateTemplateByIdSuccess(state, action) {
      state.updateTemplateByIdSuccess = true;
      state.updateTemplateByIdMsg = 'Updated Successfully';
    },
    updateTemplateByIdError(state, action) {
      state.updateTemplateByIdError = true;
      state.updateTemplateByIdMsg =
        action?.payload?.message ||
        'This template is mapped to a customer. Please remove template mapping before disable';
    },
    resetUpdateTemplateById(state) {
      state.updateTemplateByIdError = false;
      state.updateTemplateByIdSuccess = false;
      state.updateTemplateByIdMsg = '';
    },
    createTemplateMappingSuccess(state, action) {
      state.createTemplateSuccess = true;
      state.createTemplateMsg = 'Updated Successfully';
    },
    createTemplateErrorMapping(state, action) {
      state.createTemplateError = true;
      state.createTemplateMsg = 'failed to update';
    },
    resetcreateTemplateMapping(state) {
      state.createTemplateError = false;
      state.createTemplateSuccess = false;
      state.createTemplateMsg = '';
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
