export interface IRolesState {
  isRolesLoading: boolean,
  error: null,
  events: any[],
  rolesData: {
    RoleId: string;
    RoleName: string;
    RoleStatus: boolean;
    RoleCreatedBy: string;
    RoleModifiedBy: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  }[]
}