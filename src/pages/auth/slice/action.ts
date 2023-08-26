import { Dispatch } from '@reduxjs/toolkit';
// utils
import axios from 'src/utils/axiosInstance';

import { slice } from '.';
// import {} from './action_type';
// ----------------------------------------------------------------------

// export function getAllRoles(params: {
//   searchValue?: string;
//   type: string;
//   // userRoleId: string;
//   page?: string;
//   limit?: string;
// }) {
//   return async (dispatch: Dispatch) => {
//     dispatch(slice.actions.startResetPassLoading());
//     try {
//       const response = await axios.post(GET_ALL_ROLES, params);
//       console.log('response', response);
//       dispatch(slice.actions.handleResetPass(response.data.data));
//     } catch (error) {
//       dispatch(slice.actions.hasResetPassError(error));
//     }
//   };
// }
