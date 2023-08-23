import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
import { getAllRoles } from 'src/pages/Roles/slice/action';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import { useDispatch, useSelector } from '../../redux/store';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();
  const dispatch = useDispatch();

  const { rolesData } = useSelector(
    (state) => state.roles
  );
  console.log('rolesData', rolesData);

  useEffect(() => {
    dispatch(getAllRoles())
  }, [dispatch])

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in </Typography>

        {/* <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack> */}

        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      <AuthLoginForm />

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
