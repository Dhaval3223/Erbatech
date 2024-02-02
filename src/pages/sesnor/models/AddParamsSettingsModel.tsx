import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// @types
import { IUserAccountGeneral } from 'src/@types/user';
// components
import { CustomFile } from 'src/components/upload';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFEditor, RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'src/redux/store';
import { useAuthContext } from 'src/auth/useAuthContext';
import { createSensorByID, updateSensorByID } from '../slice/action';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUserAccountGeneral, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: any;
  onClose?: any;
  id?: number;
  setRefresh: any;
};

export default function AddParamsSettingsModel({
  isEdit = false,
  currentUser,
  onClose,
  id,
  setRefresh,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    SensorCustomSettingParameter: Yup.string().required('Variables is required'),
    SensorCustomSettingValue: Yup.string().required('Value is required'),
    SensorCustomSettingUnit: Yup.string().required('Unit is required'),
    SensorCustomSettingRange: Yup.string().required('Range is required'),
    SensorCustomSettingDescription: Yup.string().required('Description is required'),
    SensorCustomSettingDataType: Yup.string().required('Type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      SensorCustomSettingParameter: currentUser?.data?.SensorCustomSettingParameter
        ? currentUser?.data?.SensorCustomSettingParameter
        : '',
      SensorCustomSettingValue: currentUser?.data?.SensorCustomSettingValue
        ? currentUser?.data?.SensorCustomSettingValue
        : '',
      SensorCustomSettingUnit: currentUser?.data?.SensorCustomSettingUnit
        ? currentUser?.data?.SensorCustomSettingUnit
        : '',
      SensorCustomSettingRange: currentUser?.data?.SensorCustomSettingRange
        ? currentUser?.data?.SensorCustomSettingRange
        : '',
      SensorCustomSettingDescription: currentUser?.data?.SensorCustomSettingDescription
        ? currentUser?.data?.SensorCustomSettingDescription
        : '',
      SensorCustomSettingDataType: currentUser?.data?.SensorCustomSettingDataType
        ? currentUser?.data?.SensorCustomSettingDataType
        : '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
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

  const onSubmit = async (data: any) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      // navigate(PATH_DASHBOARD.general.sensorCustomSetting);
      reset(defaultValues);
      if (isEdit === false) {
        dispatch(
          createSensorByID({
            userId: String(id),
            sensorType: 'custom-setting',
            data: { ...data },
          })
        );
      } else {
        dispatch(
          updateSensorByID({
            data: { ...data, sensorId: currentUser?.data?.SensorId },
            sensorId: currentUser?.data?.SensorId,
            sensorType: 'custom-setting',
            userId: currentUser?.userId,
          })
        );
      }
      // enqueueSnackbar('Updated sucessfully!!');
      setRefresh((refresh: boolean) => !refresh);
    } catch (error) {
      console.error('error', error);
      enqueueSnackbar(error?.message || 'Something went wrong!', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Add parameter settings
        </Typography>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFTextField name="SensorCustomSettingParameter" label="Add variables" />
          <RHFTextField name="SensorCustomSettingValue" label="Add value" />
          <RHFTextField name="SensorCustomSettingUnit" label="Add unit" />
          <RHFTextField name="SensorCustomSettingRange" label="Add Range" />
          <RHFTextField
            // sx={{ gridColumn: 'span 2' }}
            name="SensorCustomSettingDescription"
            label="Add description"
          />
          <RHFTextField
            // sx={{ gridColumn: 'span 2' }}
            name="SensorCustomSettingDataType"
            label="Add Type"
          />
        </Box>

        <Stack
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ mt: 3 }}
          spacing="10px"
        >
          <Box>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {/* {!isEdit ? `${user ? 'Create user' : 'Create customer'}` : 'Save Changes'} */}
              Save
            </LoadingButton>
          </Box>
          <Stack direction="row" spacing="10px">
            <LoadingButton
              type="reset"
              onClick={() =>
                reset({
                  SensorCustomSettingParameter: '',
                  SensorCustomSettingValue: '',
                  SensorCustomSettingUnit: '',
                  SensorCustomSettingRange: '',
                  SensorCustomSettingDescription: '',
                  SensorCustomSettingDataType: '',
                })
              }
            >
              reset
            </LoadingButton>
            <LoadingButton type="button" onClick={() => onClose()}>
              Cancel
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  );
}
