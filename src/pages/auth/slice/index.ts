import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { Iauth } from './types';

// ----------------------------------------------------------------------

const initialState: Iauth = {};

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    // START LOADING
    startResetPassLoading(state) {},
    hasResetPassError(state, action) {}
  },
});

// Reducer
export { slice };
export default slice.reducer;
