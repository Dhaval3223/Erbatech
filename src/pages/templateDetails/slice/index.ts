import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ISensorState } from './types';

const initialState: ISensorState = {
  isSensorLoading: false,
  sensorData: {},
  error: {},
  isSensorUpdateLoading: false,
  sensorUpdateData: {},
};

const slice = createSlice({
  name: 'templateDetails',
  initialState,
  reducers: {
    startLoading(state) {
      state.isSensorLoading = true;
    },
    getSensorRecords(state, action) {
      state.isSensorLoading = false;
      state.sensorData = action.payload?.data;
    },
    hasError(state, action) {
      state.isSensorLoading = false;
      state.error = action.payload;
    },
    startUpdateLoading(state) {
      state.isSensorUpdateLoading = true;
    },
    getSensorUpdatedRecords(state, action) {
      state.isSensorUpdateLoading = false;
      state.sensorUpdateData = action.payload;
    },
    resetSensorUpdatedRecords(state) {
      state.isSensorUpdateLoading = false;
      state.sensorUpdateData = {};
    },
    hasUpdateSensorDataError(state, action) {
      state.isSensorUpdateLoading = false;
      state.sensorUpdateData = action.payload;
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
