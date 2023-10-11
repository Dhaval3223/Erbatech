import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { ISensorState } from './types';

const initialState: ISensorState = {
  templateDetails: {
    TemplatePath: '',
    TemplateTopicName: {
      alarm: '',
      receive: '',
      send: '',
    },
    TemplateStatus: false,
  },
  isTemplateDetailsByIdLoading: false,
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
      state.isTemplateDetailsByIdLoading = true;
    },
    getTemplateRecords(state, action) {
      state.isTemplateDetailsByIdLoading = false;
      state.templateDetails = action.payload?.data;
    },
    hasError(state, action) {
      state.isTemplateDetailsByIdLoading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
