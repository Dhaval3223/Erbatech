import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { IAcknowledgementState } from './types';

// ----------------------------------------------------------------------

const initialState: IAcknowledgementState = {
  isGetAcknowledgementLoading: false,
  acknowledgementData: [],
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
  },
});

// Reducer
export { slice };
export default slice.reducer;
