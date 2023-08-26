import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IRolesState } from './types';

// ----------------------------------------------------------------------

const initialState: IRolesState = {
  isRolesLoading: false,
  isCreateRoleLoading: false,
  error: null,
  createRoleError: null,
  isCreateRoleError: false,
  isCreateRoleSuccess: false,
  createRoleMsg: '',
  events: [],
  rolesData: {
    count: 0,
    rows: [{
    "RoleId": "2",
    "RoleName": "Admin",
    "RoleStatus": true,
    Users: [],
    "RoleCreatedBy": "1",
    "RoleModifiedBy": "1",
    "createdAt": "2023-08-16T18:15:56.558Z",
    "updatedAt": "2023-08-16T18:15:56.558Z",
    "deletedAt": null
  }]},
  isDeleteRoleSuccess: false,
  isDeleteRoleError: false,
  isDeleteRoleMsg: '',
};

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isRolesLoading = true;
    },
    startCreateRoleLoading(state) {
      state.isCreateRoleLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isRolesLoading = false;
      state.error = action.payload;
    },
    hasCreateRoleError(state, action) {
      return {
        ...state,
        isCreateRoleError: true,
        isCreateRoleSuccess: false,
        createRoleMsg: 'Failed to create role.',
      }
    },

    // GET EVENTS
    getRolesSuccess(state, action) {
      state.isRolesLoading = false;
      state.rolesData = action.payload;
    },

    // CREATE EVENT
    createRoleSuccess(state, action) {
      console.log(action, 'action')
      return {
        ...state,
        isCreateRoleError: false,
        isCreateRoleSuccess: true,
        createRoleMsg: 'Role created successfully!!',
      }
    },
    resetCreateRoleState(state) {
      return {
        ...state,
        isCreateRoleLoading: false,
        isCreateRoleError: false,
        isCreateRoleSuccess: false,
        createRoleMsg: '',
      }
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      state.isRolesLoading = false;
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        }
        return event;
      });
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      state.isDeleteRoleSuccess = true;
    },
    deleteEventError(state, action) {
      const eventId = action.payload;
      // state.rolesData = state.rolesData.filter((event) => event.RoleId !== eventId);
    },
    deleteRoleEventSuccess(state, action) {
      state.isDeleteRoleSuccess = true;
      state.isDeleteRoleMsg = 'Role deleted successfully';
    },
    deleteRoleEventError(state, action) {
      state.isDeleteRoleError = true;
      state.isDeleteRoleMsg = 'OOPS!! failed to delete role';
    },
    resetDeleteRoleEventError(state) {
      state.isDeleteRoleError = false;
      state.isDeleteRoleSuccess = false;
      state.isDeleteRoleMsg = '';
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
