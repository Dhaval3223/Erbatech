export interface IRolesState {
  isRolesLoading: boolean;
  isCreateRoleLoading: boolean;
  error: null;
  createRoleError: any;
  events: any[];
  rolesData: {
    RoleId: string;
    RoleName: string;
    RoleStatus: boolean;
    RoleCreatedBy: string;
    RoleModifiedBy: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  }[];
  isDeleteRoleSuccess: boolean;
  isDeleteRoleError: boolean;
  isDeleteRoleMsg: string;
}