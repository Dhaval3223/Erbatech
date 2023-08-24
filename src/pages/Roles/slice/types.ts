export interface IRolesState {
  isRolesLoading: boolean;
  isCreateRoleLoading: boolean;
  error: null;
  createRoleError: any;
  isCreateRoleError: boolean;
  isCreateRoleSuccess: boolean;
  createRoleMsg: string;
  events: any[];
  rolesData: {
      count: number;
      row: {
      RoleId: string;
      RoleName: string;
      RoleStatus?: boolean;
      RoleCreatedBy?: string;
      RoleModifiedBy?: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: null;
    }[]
  };
  isDeleteRoleSuccess: boolean;
  isDeleteRoleError: boolean;
  isDeleteRoleMsg: string;
}