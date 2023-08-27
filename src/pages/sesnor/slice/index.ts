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
  name: 'sensor',
  initialState,
  reducers: {
    startLoading(state) {
        state.isSensorLoading = true;
      },
      getSensorRecords(state, action) {
        state.isSensorLoading = false;
        state.sensorData = action.payload;
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
      hasUpdatedError(state, action) {
        state.isSensorUpdateLoading = false;
        state.error = action.payload;
      },
  }
});

// Reducer
export { slice };
export default slice.reducer;
