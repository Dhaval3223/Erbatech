import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import axiosInstance from 'src/utils/axiosInstance';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import localStorageAvailable from 'src/utils/localStorageAvailable';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFTextField, RHFCodes } from '../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  email: string;
  password: string;
  confirmPassword: string;
  oldpassword: string;
};

export default function AuthNewPasswordForm({
  onclose,
  email,
  isSuperAdmin,
}: {
  onclose?: any;
  email?: any;
  isSuperAdmin?: boolean;
}) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const emailRecovery =
    typeof window !== 'undefined' ? sessionStorage.getItem('email-recovery') : '';

  const VerifyCodeSchema = Yup.object().shape({
    // code1: Yup.string().required('Code is required'),
    // code2: Yup.string().required('Code is required'),
    // code3: Yup.string().required('Code is required'),
    // code4: Yup.string().required('Code is required'),
    // code5: Yup.string().required('Code is required'),
    // code6: Yup.string().required('Code is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    oldpassword: Yup.string().required('Old password is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    code1: '1',
    code2: '2',
    code3: '3',
    code4: '4',
    code5: '5',
    code6: '6',
    email: '',
    oldpassword: isSuperAdmin ? '-' : '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const storageAvailable = localStorageAvailable();

    const user = storageAvailable ? JSON.parse(localStorage.getItem('user') || '{}') : '';

    console.log('useruser', user?.UserEmail);

    try {
      await await axiosInstance.post(
        '/users/change-password',
        isSuperAdmin
          ? {
              userEmail: email,
              newPassword: data.password,
            }
          : {
              userEmail: user?.UserEmail,
              oldPassword: data.oldpassword,
              newPassword: data.password,
            }
      );
      console.log('DATA:', {
        email: data.email,
        code: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        password: data.password,
      });
      sessionStorage.removeItem('email-recovery');
      enqueueSnackbar('Change password success!');
      onclose();
      // navigate(PATH_DASHBOARD.root);
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      console.error(error, 'xxxxxxxERRORxxxxxx');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* <RHFTextField
          name="email"
          label="Email"
          disabled={!!emailRecovery}
          InputLabelProps={{ shrink: true }}
        /> */}

        {/* <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']} />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2 }}>
            Code is required
          </FormHelperText>
        )} */}
        {!isSuperAdmin && (
          <RHFTextField
            name="oldpassword"
            label="Old Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack sx={{ flexDirection: 'row' }}>
          <LoadingButton
            fullWidth
            size="large"
            // type="submit"
            // variant="contained"
            // loading={isSubmitting}
            sx={{ mt: 3 }}
            onClick={() => onclose()}
          >
            cancel
          </LoadingButton>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 3 }}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
