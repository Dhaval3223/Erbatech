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
    hasUpdateRoleError(state, action) {
      state.isUpdateRoleLoading = false;
      state.updateRoleData = action.payload.data;
    },

    // GET EVENTS
    getRolesSuccess(state, action) {
      state.isAccessControlLoading = false;
      state.accessControlData = action.payload.data;
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      state.isUpdateRoleLoading = false;
      state.accessControlData = action.payload.data.data;
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
