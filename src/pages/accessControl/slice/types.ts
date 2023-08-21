export interface IAccessControlState {
  isAccessControlLoading: boolean;
  accessControlData: any[];
  isUpdateRoleLoading: boolean;
  updateRoleData: {
    success: boolean;
    message: string;
  };
};