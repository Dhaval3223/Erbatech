export interface IUserState {
  isUserLoading: boolean;
  viewSuccess: boolean;
  viewError: boolean;
  error: any;
  users: {
    count: number;
    rows: {
      UserId: string;
      UserTypeCode: string;
      UserCode: string;
      FirstName: string;
      MiddleName: string;
      LastName: string;
      Address1: string;
      UserPassword: string;
      UserEmail: string;
      UserGender: string;
      DateOfBirth: string;
      DateOfJoin: string;
      Mobile: string;
      UserRoleId: string;
      UserStatus: boolean;
    }[];
  };
  createUserMsg: string;
  createUserSucess: boolean;
  createUserError: boolean;
  updateUserSuccess: boolean;
  updateUserError: boolean;
  updateUserMsg: string;
  deleteUserSuccess: boolean;
  deleteUserMsg: string;
  deleteUserError: boolean;
  deleteTemplateSuccess: boolean;
  deleteTemplateMsg: string;
  deleteTemplateError: boolean;
  viewUserData: any;
  viewUserLoading: boolean;
  viewTemplateLoader: boolean;
  viewTemplateData: {
    count: number;
    rows: {
      TemplateId: string;
      TemplateName: string;
      TemplatePath: string;
    }[];
  };
  updateTemplateByIdSuccess: boolean;
  updateTemplateByIdError: boolean;
  updateTemplateByIdMsg: string;
  createTemplateSuccess: boolean;
  createTemplateError: boolean;
  createTemplateMsg: string;
}
