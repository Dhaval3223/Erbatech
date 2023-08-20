import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IRolesState } from './types';

// ----------------------------------------------------------------------

const initialState: IRolesState = {
  isRolesLoading: false,
  error: null,
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
  }]
};

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isRolesLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isRolesLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getRolesSuccess(state, action) {
      state.isRolesLoading = false;
      state.rolesData = action.payload.data.data;
    },

    // CREATE EVENT
    createRoleSuccess(state, action) {
      const newEvent = action.payload;
      state.isRolesLoading = false;
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
