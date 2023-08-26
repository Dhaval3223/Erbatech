/* eslint-disable react-hooks/exhaustive-deps */

import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { getCountries, getStateList, getStateByCountry } from 'src/redux/slices/action';
import { createUser, updateUserById } from './slice/action';
import { getAllRoles } from '../Roles/slice/action';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUserAccountGeneral, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: any;
  user?: boolean;
  onClose?: any;
};

export default function CustomerEditForm({ isEdit = false, currentUser, user, onClose }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countryId,setCountryId] = useState<any>(currentUser?.UserCountryId || '');
  const { rolesData } = useSelector(
    (state) => state.roles
  );
  const { countryData, stateData, stateDataByCountry , isCountryLoading, isStateLoading, isStateByCountryLoading} = useSelector(
    (state) => state.common
  );
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    FirstName: Yup.string().required('FirstName is required'),
    LastName: Yup.string().required('LastName is required'),
    UserEmail: Yup.string().required('Email is required').email('Email must be a valid email address'),
    Mobile: Yup.string().required('Phone number is required'),
    UserCountryId:  Yup.string().required('Country is required'),
    UserStateId:  Yup.string().required('State is required'),
    UserCity:  Yup.string().required('City is required'),
    Address:  Yup.string().required('Address is required'),
    UserLocation:  Yup.string().required('Location is required'),
    UserPassword: Yup.string().required('password is required'),
    UserRoleId: Yup.string().required('Role is required'),
  });

  const defaultValues = useMemo(
    () => ({
    FirstName: currentUser?.FirstName || '',
    LastName: currentUser?.LastName || '',
    UserEmail: currentUser?.UserEmail || '',
    Mobile: currentUser?.Mobile || '',
    UserCountryId:   currentUser?.UserCountryId || '',
    UserStateId:   currentUser?.UserStateId || '',
    UserCity:   currentUser?.UserCity || '',
    Address:   currentUser?.Address || '',
    UserLocation:   currentUser?.UserLocation || '',
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
  dispatch(getCountries());
  dispatch(getStateList());
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
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const DataValues = getValues();
  const countries = watch('UserCountryId');
  const [state,setState] = useState<any>([]);

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
      enqueueSnackbar(!'Customer Updated successfully!');
      navigate(PATH_DASHBOARD.general.customerManagement);
      onClose();
        dispatch(updateUserById({
            ...data,
            UserId: currentUser?.UserId
        }))
    } catch (error) {
      console.error("error",error);
    }
  };

  useEffect(() => {
    if(DataValues?.UserCountryId !== '') {
      const getName = countryData?.find(item => item?.CountryId === DataValues.UserCountryId);
      dispatch(getStateByCountry(getName?.CountryName))
    }
  },[countries, countryId, isCountryLoading]);

  useEffect(() => {
    
    if(isEdit) {
      const getName = countryData?.find(item => item?.CountryId === DataValues.UserCountryId);
        dispatch(getStateByCountry(getName?.CountryName))
    }
  },[isEdit, isCountryLoading, countryId])
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
              <RHFSelect native name="UserCountryId" label="Country" placeholder="Country" onChange={event => {
                setValue('UserCountryId',event.target.value);
                const getName = countryData?.find(item => item?.CountryId === event.target.value)
                setCountryId(getName?.CountryName || '')

              }}>
              <option value=""/>
                {countryData.map((country) => (
                  <option key={country.CountryId} value={country.CountryId}>
                    {country.CountryName}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="UserStateId" label="State" placeholder="State">
                <option value=""/>
                {stateDataByCountry.map((item: any) => (
                  <option key={item.StateId} value={item.StateId}>
                    {item.StateName}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="UserCity" label="City" />
              <RHFTextField name="Address" label="Address" />
              <RHFTextField name="UserLocation" label="Location" />

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
            Address:'',
            FirstName:'',
            LastName:'',
            Mobile:'',
            UserCity:'',
            UserCountryId:'',
            UserEmail:'',
            UserLocation:'',
            UserPassword:'',
            UserRoleId:'',
            UserStateId:'',
          })}>
            reset
          </LoadingButton>
          <LoadingButton type="button" variant="contained" onClick={() => {
            onClose();
         }}>
             Cancel
          </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  );
}
