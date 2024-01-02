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
  createSensorMsg: '',
  isCreateSensorError: false,
  isCreateSensorSuccess: false,
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
      state.isSensorCreateLoading = false;
      state.isCreateSensorSuccess = true;
      state.createSensorMsg = 'Sensor created successfully'
    },
    resetSensorCreatedRecords(state) {
      state.isCreateSensorSuccess = false;
      state.isCreateSensorError = false;
      state.createSensorMsg= '';
    },
    hasCreateSensorDataError(state, action) {
      state.isSensorCreateLoading = false;
      state.isCreateSensorError = true;
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
