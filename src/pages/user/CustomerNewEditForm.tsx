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
};

export default function CustomerNewEditForm({ isEdit = false, currentUser, user }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rolesData, isCreateRoleLoading } = useSelector(
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
    console.log("data", data)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'User Created successfully!' : 'Updated successfully!');
      navigate(PATH_DASHBOARD.general.userManagement);
      if(isEdit === false) {
        dispatch(createUser({
            ...data,
            UserTypeCode: user ? 'ST' : 'CU',
            MiddleName: '',
            Address: '',
            UserGender: 'M',
            UserCountryId: 1,
            UserStateId: 1,
            UserCity: '',
            UserCreatedBy: 1,
            UserModifiedBy: 1,
          }))
      }else {
        dispatch(updateUserById({
            ...data,
            UserId: currentUser?.UserId
        }))
      }
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
                {rolesData?.row?.map((role) => (
                  <option key={role.RoleId} value={role.RoleId}>
                    {role.RoleName}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="UserPassword" label="Password" />
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
             {!isEdit ? `${user ? 'Create user' : 'Create customer'}`: 'Save Changes'}
            {/* Save Changes */}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
