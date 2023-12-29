import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ISensorState } from './types';

const initialState: ISensorState = {
  isSensorLoading: false,
  sensorData: {},
  error: {},
  isSensorUpdateLoading: false,
  sensorUpdateData: {},
  createSensorError: {},
  isDeleteSensorError: false,
  isSensorCreateLoading: false,
  isDeleteSensorSuccess: false,
  sensorCreateData: {},
  deleteSensorMsg: '',
};

const slice = createSlice({
  name: 'sensor',
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
    getSensorCreatedRecords(state, action) {
      state.isSensorUpdateLoading = false;
      state.sensorCreateData = action.payload;
    },
    resetSensorCreatedRecords(state) {
      state.isSensorUpdateLoading = false;
      state.sensorUpdateData = {};
    },
    hasCreateSensorDataError(state, action) {
      state.isSensorUpdateLoading = false;
      state.sensorCreateData = action.payload;
    },
    createHasError(state, action) {
      state.isSensorCreateLoading = false;
      state.createSensorError = action.payload;
    },
    deleteSensorSuccess(state, action) {
      state.isDeleteSensorSuccess = true;
    },
    deleteSensorEventSuccess(state, action) {
      state.isDeleteSensorSuccess = true;
      state.deleteSensorMsg = 'Sensor deleted successfully';
    },
    deleteSensorEventError(state, action) {
      state.isDeleteSensorError = true;
      state.deleteSensorMsg = 'OOPS!! failed to delete Sensor';
    },
    resetDeleteSensorEventError(state) {
      state.isDeleteSensorError = false;
      state.isDeleteSensorSuccess = false;
      state.deleteSensorMsg = '';
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
