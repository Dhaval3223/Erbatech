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
      rows: {
      RoleId: string;
      RoleName: string;
      RoleStatus?: boolean;
      Users?: any;
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