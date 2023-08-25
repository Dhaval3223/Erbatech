import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IAccessControlState } from './types';

// ----------------------------------------------------------------------

const initialState: IAccessControlState = {
  isAccessControlLoading: false,
  accessControlData: [],
  isUpdateRoleLoading: false,
  updateRoleData: {
    success: false,
    message: '',
  },
  updateRoleDataSuccess: false,
  updateRoleDataError: false,
  updateRoleDataMsg: '',
};

const slice = createSlice({
  name: 'accesControl',
  initialState,
  reducers: {
    // START LOADING
    startRolesLoading(state) {
      state.isAccessControlLoading = true;
    },
    startUpdateRoleLoading(state) {
      state.isUpdateRoleLoading = true;
    },

    // HAS ERROR
    hasGetRoleError(state, action) {
      state.isUpdateRoleLoading = false;
      state.accessControlData = action.payload.data;
    },
    hasAcessControlError(state, action) {
      state.isAccessControlLoading = false;
      state.accessControlData = action.payload.data;
    },
    hasUpdateRoleError(state, action) {
      state.isUpdateRoleLoading = false;
      state.updateRoleDataSuccess = false;
      state.updateRoleDataError = true;
      state.updateRoleDataMsg = 'Failed to save changes!!'
    },

    // GET EVENTS
    getRolesSuccess(state, action) {
      state.isAccessControlLoading = false;
      state.accessControlData = action.payload.data;
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      state.isUpdateRoleLoading = false;
      state.updateRoleDataSuccess = true;
      state.updateRoleDataError = false;
      state.updateRoleDataMsg = 'Changes save successfully!!'
    },

    resetUpdatRoleData(state) {
      state.updateRoleDataSuccess = false;
      state.updateRoleDataError = false;
      state.updateRoleDataMsg = '';
    }
  },
});

// Reducer
export { slice };
export default slice.reducer;
