import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from 'src/utils/formatNumber';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// @types
import { IUserAccountGeneral } from 'src/@types/user';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label/index';
import { CustomFile } from 'src/components/upload';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useDispatch, useSelector } from 'src/redux/store';
import { getAllRoles } from '../Roles/slice/action';
import { createUser, updateUserById } from './slice/action';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUserAccountGeneral, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: any;
  user?: boolean;
  onClose?: any;
  handleUpdateSubmit?: any;
};

export default function UserEditForm({ isEdit = false, currentUser, user, onClose, handleUpdateSubmit }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rolesData } = useSelector(
    (state) => state.roles
  );

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    FirstName: Yup.string().required('FirstName is required'),
    LastName: Yup.string().required('LastName is required'),
    UserEmail: Yup.string().required('Email is required').email('Email must be a valid email address'),
    Mobile: Yup.string().required('Phone number is required'),
    UserPassword: Yup.string().required('password is required'),
    UserRoleId: Yup.string().required('Role is required'),
  });

  const defaultValues = useMemo(
    () => ({
    FirstName: currentUser?.FirstName || '',
    LastName: currentUser?.LastName || '',
    UserEmail: currentUser?.UserEmail || '',
    Mobile: currentUser?.Mobile || '',
    UserPassword: currentUser?.UserPassword || '',
    UserRoleId: currentUser?.UserRoleId || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  useEffect(() => {
    dispatch(getAllRoles({
      searchValue: "",
      type: "all",
      page: "1",
      limit: "10"
  }));
  },[dispatch])

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data:any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('User Updated successfully!');
      onClose();
      navigate(PATH_DASHBOARD.general.userManagement);
      reset(defaultValues);
        dispatch(updateUserById({
            ...data,
            UserId: currentUser?.UserId
        }))
        handleUpdateSubmit();
    } catch (error) {
      console.error("error",error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
              <RHFTextField name="FirstName" label="First Name" />
              <RHFTextField name="LastName" label="Last Name" />
              <RHFTextField name="UserEmail" label="Email Address" />
              <RHFTextField name="Mobile" label="Phone Number" />

              <RHFSelect native name="UserRoleId" label="Role" placeholder="Role">
                <option value="" />
                {rolesData?.rows?.map((role) => (
                  <option key={role.RoleId} value={role.RoleId}>
                    {role.RoleName}
                  </option>
                ))}
              </RHFSelect>
            
              
        </Box>

        <Stack direction="row-reverse" justifyContent="space-between" alignItems="flex-end" sx={{ mt: 3 }} spacing="10px">
          <Box>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
             Save Changes
            {/* Save Changes */}
          </LoadingButton>
          </Box>
          <Stack direction="row" spacing="10px">
          <LoadingButton type="reset" variant="contained" onClick={() => reset({
            FirstName:  '',
            LastName:'',
            UserEmail:'',
            Mobile:  '',
            UserPassword:  '',
            UserRoleId:  '',
          })}>
            reset
          </LoadingButton>
          <LoadingButton type="button" variant="contained" onClick={() => onClose()}>
             Cancel
          </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  );
}
