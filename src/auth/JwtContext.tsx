import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { slice } from 'src/pages/accessControl/slice/index';
// utils
import axios from '../utils/axiosInstance';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';
// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = any;

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  isSuperAdmin: false,
  user: null,
  accessControlCRUD: null,
  pathAfterLogIn: '/',
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      accessControlCRUD: action.payload.accessControlCRUD,
      pathAfterLogIn: action.payload.pathAfterLogIn,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      const user: AuthUserType = storageAvailable
        ? JSON.parse(localStorage.getItem('user') || '{}')
        : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.post('/role-privileges/getProgramsByRole', {
          RoleId: user?.UserRoleId,
        });

        const convertArrayToObject = (array: any[], ProgramCode: string) => {
          const initialValue = {};
          return array.reduce(
            (obj, item) => ({
              ...obj,
              [item[ProgramCode]]: {
                isCreate: item?.RolePrivilege?.includes('A'),
                isUpdate: item?.RolePrivilege?.includes('M'),
                isDelete: item?.RolePrivilege?.includes('D'),
                isView: item?.RolePrivilege?.includes('V'),
              },
            }),
            initialValue
          );
        };

        const data = convertArrayToObject(response?.data?.data, 'ProgramCode');

        const pathAfterLogIn = response?.data?.data.find((item: any) =>
          item?.RolePrivilege?.includes('V')
        );
        // dispatch(slice.actions.getRolesSuccess(response.data));
        console.log('convertArrayToObject', data);

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
            accessControlCRUD: data,
            // pathAfterLogIn: pathAfterLogIn,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (email: string, password: string) => {
      const response = await axios.post('/users/login', {
        email,
        password,
      });
      const { accessToken, user } = response.data?.data || {};
      // console.log('accessToken', accessToken, user);

      localStorage.setItem('user', JSON.stringify(user));

      setSession(accessToken);

      initialize();

      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });
    },
    [initialize]
  );

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const response = await axios.post('/api/account/register', {
        email,
        password,
        firstName,
        lastName,
      });
      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      isSuperAdmin: state.user?.UserTypeCode === 'SA',
      method: 'jwt',
      login,
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      register,
      logout,
      accessControlCRUD: state?.accessControlCRUD,
      initialize,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
      state?.accessControlCRUD,
      initialize,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
