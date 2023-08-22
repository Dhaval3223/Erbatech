export interface IMenuState {
  allMenus: {
    ProgramId: string;
    ProgramCode: string;
    ProgramName: string;
    ProgramDescription: string;
    ProgramOrder: string;
    ProgramParentCode: string;
    ProgramPrivilege: string;
    ProgramIcon: string;
    ProgramURL: string;
    ProgramStatus: string;
    ProgramCreatedBy: string;
    ProgramModifiedBy: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }[];
  isMenuLoading: boolean;
  hasMenuError: any;
}