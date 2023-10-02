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
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
        state.isUserLoading = true;
      },
      getUserRecords(state, action) {
        state.viewSuccess = true
        state.isUserLoading = false;
        state.users = action.payload;
      },
      hasError(state, action) {
        state.isUserLoading = false;
        state.error = action.payload;
      },
      createUser(state, action) {
        state.createUserSucess = true
        state.createUserMsg = action.payload.data.message;
      },
      createUserError(state, action) {
        state.createUserError = true
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
        state.updateUserSuccess = true
        state.updateUserMsg = action.payload.data.message;
      },
      updateUserError(state, action) {
        state.updateUserError = true
        state.updateUserMsg = 'Something went wrong';
      },
      deleteUser(state, action) {
        state.deleteUserSuccess = true
        state.deleteUserMsg = action.payload.data.message;
      },
      deleteUserError(state, action) {
        state.deleteUserError = true
        state.deleteUserMsg = action.payload.data.message;
      },
      viewUser(state, action) {
        console.log("view", action.payload.data)
        state.viewUserLoading = false
        state.viewUserData = action.payload.data;
      },
      viewUserError(state, action) {
        state.viewUserLoading = false
      },
      viewAllTemplate(state, action) {
        state.viewTemplateLoader = false
        state.viewTemplateData = action.payload.data;
      },
      viewAllTemplateError(state, action) {
        state.viewTemplateLoader = false
      },
  }
});

// Reducer
export { slice };
export default slice.reducer;
