import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IAlarmState } from './types';

const initialState: IAlarmState = {
  alarmAcknowledgementData: {},
  alarmAcknowledgementDataLoading: true,
  alarmData: {
    count: 0,
    rows: [
      {
        TransactionAlarmDescription: '',
        TransactionAlarmId: '',
        TransactionAlarmName: '',
        TransactionAlarmType: '',
        TransactionAlarmValue: '',
        UserId: '',
        createdAt: '',
      },
    ],
  },
  alarmData2: {
    count: 0,
    rows: [
      {
        TransactionAlarmDescription: '',
        TransactionAlarmId: '',
        TransactionAlarmName: '',
        TransactionAlarmType: '',
        TransactionAlarmValue: '',
        UserId: '',
        createdAt: '',
      },
    ],
  },
  alarmDataLoading: true,
  alarmData2Loading: true,
  checkAlarmData: {},
  checkAlarmDataLoading: true,
  alarmAcknowledgementError: null,
  alarmCheckError: null,
  alarmError: null,
};

const slice = createSlice({
  name: 'alarms',
  initialState,
  reducers: {
    startLoading(state) {
      state.alarmDataLoading = true;
    },
    start2Loading(state) {
      state.alarmData2Loading = true;
    },
    startalarmAcknowledgementLoading(state) {
      state.alarmAcknowledgementDataLoading = true;
    },
    startCheckAlarmsLoading(state) {
      state.checkAlarmDataLoading = true;
    },
    getAlarmDataSuccess(state, action) {
      console.log('data1', action?.payload);
      state.alarmDataLoading = false;
      state.alarmData = action.payload;
    },
    getAlarmData2Success(state, action) {
      console.log('data1', action?.payload);
      state.alarmData2Loading = false;
      state.alarmData2 = action.payload;
    },
    getCheckAlarmSuccess(state, action) {
      state.checkAlarmDataLoading = false;
      state.checkAlarmData = action?.payload?.data?.data;
    },
    getAlarmAcknowledgementSuccess(state, action) {
      console.log('getAlarmAcknowledgementSuccess', action);
      state.alarmAcknowledgementDataLoading = false;
      state.alarmAcknowledgementData = action.payload;
    },
    restGetAlarmAcknowledgementSuccess(state) {
      // console.log('getAlarmAcknowledgementSuccess', action);
      // state.alarmAcknowledgementDataLoading = false;
      state.alarmAcknowledgementData = {};
    },
    hasError(state, action) {
      state.alarmDataLoading = false;
      state.alarmData = action.payload;
    },
    has2Error(state, action) {
      state.alarmData2Loading = false;
      state.alarmData2 = action.payload;
    },
    hasCheckAlarmError(state, action) {
      state.checkAlarmDataLoading = false;
      state.checkAlarmData = action.payload;
    },
    hasAcknowAlarmError(state, action) {
      state.alarmAcknowledgementDataLoading = false;
      state.alarmAcknowledgementData = action.payload;
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
