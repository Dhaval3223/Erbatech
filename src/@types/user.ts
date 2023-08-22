// ----------------------------------------------------------------------

export type IUserSocialLink = {
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type IUserProfileFollowers = {
  follower: number;
  following: number;
};

export type IUserProfileCover = {
  name: string;
  cover: string;
  role: string;
};

export type IUserProfileAbout = {
  quote: string;
  country: string;
  email: string;
  role: string;
  company: string;
  school: string;
};

export type IUserProfile = IUserProfileFollowers &
  IUserProfileAbout & {
    id: string;
    socialLinks: IUserSocialLink;
  };

export type IUserProfileFollower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type IUserProfileGallery = {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

export type IUserProfileFriend = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

export type IUserProfilePost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date | string | number;
  media: string;
  message: string;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date | string | number;
    message: string;
  }[];
};

// ----------------------------------------------------------------------

export type IUserCard = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPosts: number;
  role: string;
};

// ----------------------------------------------------------------------

export type IUserAccountGeneral = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

// ----------------------------------------------------------------------

export type IRoleAccountGeneral = {
  "UserId": "3",
  "UserTypeCode": "AD",
  "UserCode": null,
  "FirstName": "admin",
  "MiddleName": "",
  "LastName": "user",
  "Address": "",
  "UserPassword": "$2b$10$LN9aq1XU6YT8VYuspcFjJub9iKuDPKXcLlLpRvAVli3p05BqW.iW6",
  "UserEmail": "admin@gmail.com",
  "UserGender": "M",
  "DateOfBirth": "2023-08-19T16:36:41.078Z",
  "DateOfJoin": "2023-08-19T16:36:41.078Z",
  "Mobile": "",
  "UserRoleId": "2",
  "UserCountryId": "2",
  "UserStateId": "1",
  "UserCity": "Bernau",
  "UserStatus": true,
  "UserCreatedBy": "1",
  "UserModifiedBy": "1",
  "createdAt": "2023-08-20T19:20:04.041Z",
  "updatedAt": "2023-08-20T19:20:04.042Z",
  "deletedAt": null,
  "Role": {
      "RoleId": "2",
      "RoleName": "Admin",
      "RoleStatus": true,
      "RoleCreatedBy": "1",
      "RoleModifiedBy": "1",
      "createdAt": "2023-08-16T18:15:56.558Z",
      "updatedAt": "2023-08-16T18:15:56.558Z",
      "deletedAt": null
  }
};

export type IUserAccountBillingCreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type IUserAccountBillingInvoice = {
  id: string;
  createdAt: Date | string | number;
  price: number;
};

export type IUserAccountBillingAddress = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

// ----------------------------------------------------------------------

export type IUserAccountNotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};
