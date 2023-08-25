import { createSlice, Dispatch } from '@reduxjs/toolkit';

// @types
import { ICommonState } from './types';

// ----------------------------------------------------------------------

const initialState: ICommonState = {
    isCountryLoading: true,
    isStateByCountryLoading: true,
    isStateLoading: true,
    countryData: [{
        CountryCode: '',
        CountryId: '',
        CountryName: '',
    }],
    stateData: [{
        StateCountryName: '',
        StateId: '',
        StateName: '',
    }],
    stateDataByCountry: [{
        StateCountryName: '',
        StateId: '',
        StateName: ''
    }],
    countryError: {},
    stateByCountryError: {},
    stateError: {},
};

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    // START LOADING
    startCountryLoading(state) {
      state.isCountryLoading = true;
    },
    startStateLoading(state) {
      state.isStateLoading = true;
    },
    startStateByCountryLoading(state) {
        state.isStateByCountryLoading = true;
      },

    // HAS ERROR
    hasError(state, action) {
      state.isCountryLoading = false;
      state.countryError = action.payload;
    },
    hasStateError(state, action) {
        state.isStateLoading = false;
        state.stateError = action.payload;
    },
    hasStateByCountryError(state, action) {
        state.isStateByCountryLoading = false;
        state.stateByCountryError = action.payload;
    },

    getCountryData(state, action) {
      state.isCountryLoading = false;
      state.countryData = action.payload;
    },
    getStateData(state, action) {
      state.isStateLoading = false;
      state.stateData = action.payload;
    },
    getStateByCountryData(state, action) {
        state.isStateByCountryLoading = false;
        state.stateDataByCountry = action.payload;
      },
}
});

// Reducer
export { slice };
export default slice.reducer;
