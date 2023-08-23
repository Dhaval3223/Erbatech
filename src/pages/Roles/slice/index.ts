import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IRolesState } from './types';

// ----------------------------------------------------------------------

const initialState: IRolesState = {
  isRolesLoading: false,
  isCreateRoleLoading: false,
  error: null,
  createRoleError: null,
  events: [],
  rolesData: [{
    "RoleId": "2",
    "RoleName": "Admin",
    "RoleStatus": true,
    "RoleCreatedBy": "1",
    "RoleModifiedBy": "1",
    "createdAt": "2023-08-16T18:15:56.558Z",
    "updatedAt": "2023-08-16T18:15:56.558Z",
    "deletedAt": null
  }],
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
      state.isCreateRoleLoading = false;
      state.createRoleError = action.payload;
    },

    // GET EVENTS
    getRolesSuccess(state, action) {
      console.log(action, 'actionn');
      state.isRolesLoading = false;
      state.rolesData = action.payload;
    },

    // CREATE EVENT
    createRoleSuccess(state, action) {
      const newEvent = action.payload;
      state.isCreateRoleLoading = false;
      state.events = [...state.events, newEvent];
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
      const eventId = action.payload;
      state.rolesData = state.rolesData.filter((event) => event.RoleId !== eventId);
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
