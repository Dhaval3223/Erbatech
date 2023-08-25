import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { slice } from 'src/redux/slices/index';
import { 
    GET_COUNTRIES,
    GET_STATE,
    GET_STATE_BY_COUNTRY
} from './action_type';
// ----------------------------------------------------------------------

export function getCountries() {
  return async (dispatch: Dispatch) => {
    dispatch(slice.actions.startCountryLoading());
    try {
      const response = await axios.post(GET_COUNTRIES);
      console.log('response', response);
      dispatch(slice.actions.getCountryData(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function getStateList() {
    return async (dispatch: Dispatch) => {
      dispatch(slice.actions.startStateLoading());
      try {
        const response = await axios.post(GET_STATE);
        console.log('response', response);
        dispatch(slice.actions.getStateData(response.data.data));
      } catch (error) {
        dispatch(slice.actions.hasStateError(error));
      }
    };
  }

  export function getStateByCountry(countryName:any) {
    return async (dispatch: Dispatch) => {
      dispatch(slice.actions.startStateByCountryLoading());
      try {
        const response = await axios.post(GET_STATE_BY_COUNTRY, {
            CountryName:countryName
        });
        console.log('response', response);
        dispatch(slice.actions.getStateByCountryData(response.data.data));
      } catch (error) {
        dispatch(slice.actions.hasStateByCountryError(error));
      }
    };
  }