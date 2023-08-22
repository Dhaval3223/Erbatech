import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { IMenuState } from './types';

const initialState: IMenuState = {
  allMenus: [
    {
      ProgramId: '',
      ProgramCode: '',
      ProgramName: '',
      ProgramDescription: '',
      ProgramOrder: '',
      ProgramParentCode: '',
      ProgramPrivilege: '',
      ProgramIcon: '',
      ProgramURL: '',
      ProgramStatus: '',
      ProgramCreatedBy: '',
      ProgramModifiedBy: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
    }
  ],
  isMenuLoading: false,
  hasMenuError: '',
};

const slice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    startGetMenuLoading(state) {
      state.isMenuLoading = true;
    },
    hasGettingMenuError(state, action) {
      state.isMenuLoading = false;
      state.hasMenuError = action.payload;
    },
    getAllMenus(state, action) {
      state.isMenuLoading = false;
      state.allMenus = action.payload;
    },
  }
});

// Reducer
export { slice };
export default slice.reducer;
