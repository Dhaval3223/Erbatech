import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IAcknowledgementState } from './types';

// ----------------------------------------------------------------------

const initialState: IAcknowledgementState = {
  isGetAcknowledgementLoading: false,
  acknowledgementData: [],
  alermSucess: false,
  alermError: false,
  alermSusErrMsg: '',
};

const slice = createSlice({
  name: 'acknowledgement',
  initialState,
  reducers: {
    startGetAcknowledgementLoading(state) {
      return {
        ...state,
        isGetAcknowledgementLoading: true,
      };
    },
    handleGetAcknowledgementAPI(state, action) {
      return {
        ...state,
        isGetAcknowledgementLoading: false,
        acknowledgementData: action.payload?.data,
      };
    },
    hasGetAcknowledgementErr(state, action) {
      return {
        ...state,
        isGetAcknowledgementLoading: false,
        acknowledgementData: action.payload,
      };
    },
    handleCheckAlarmSucess(state, action) {
      return {
        ...state,
        alermSucess: true,
        alermError: false,
        alermSusErrMsg: '',
      };
    },
    handleCheckAlarmErr(state, action) {
      return {
        ...state,
        alermSucess: false,
        alermError: true,
        alermSusErrMsg: '',
      };
    },
  },
});

// Reducer
export { slice };
export default slice.reducer;
