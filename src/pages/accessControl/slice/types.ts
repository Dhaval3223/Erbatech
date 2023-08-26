export interface IAccessControlState {
  isAccessControlLoading: boolean;
  accessControlData: any[];
  isUpdateRoleLoading: boolean;
  updateRoleData: {
    success: boolean;
    message: string;
  };
  updateRoleDataSuccess: boolean;
  updateRoleDataError: boolean;
  updateRoleDataMsg: string;
};