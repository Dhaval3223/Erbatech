export interface IUserState {
    isUserLoading: boolean,
    viewSuccess: boolean,
    viewError: boolean,
    error: any,
    users: {
      count: number,
      rows: {
        UserId: string,
        UserTypeCode: string,
        UserCode: string,
        FirstName: string,
        MiddleName: string,
        LastName: string,
        Address1: string,
        UserPassword: string,
        UserEmail: string,
        UserGender: string                                                                                                                                                                                                                                                              ,
        DateOfBirth: string,
        DateOfJoin: string,
        Mobile: string,
        UserRoleId: string,
        UserStatus: boolean,
      }[],
    },
    createUserMsg: string,
    createUserSucess: boolean,
    createUserError: boolean,
    updateUserSuccess: boolean,
    updateUserError: boolean,
    updateUserMsg: string,
    deleteUserSuccess: boolean,
    deleteUserMsg: string,
    deleteUserError: boolean,
    viewUserData: any,
    viewUserLoading: boolean,
  }