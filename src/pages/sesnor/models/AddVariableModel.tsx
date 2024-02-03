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
import FormProvider, { RHFTextField } from 'src/components/hook-form';
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

export default function AddVariableModel({
  isEdit = false,
  currentUser,
  onClose,
  id,
  setRefresh,
}: Props) {
  console.log('currentUser', currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    SensorVariableName: Yup.string().required('Variables is required'),
    // SensorVariableValue: Yup.string().required('Value is required'),
    SensorVariableUnit: Yup.string().required('Unit is required'),
    SensorVariableRange: Yup.string().required('Range is required'),
    SensorVariableDescription: Yup.string().required('Description is required'),
    SensorSettingDataType: Yup.string().required('Type is required'),
  });

  const defaultValues = useMemo(
    () => ({
      SensorVariableName: currentUser?.data?.SensorVariableName
        ? currentUser?.data?.SensorVariableName
        : '',
      // SensorVariableValue: currentUser?.data?.SensorVariableValue
      //   ? currentUser?.data?.SensorVariableValue
      //   : '',
      SensorVariableUnit: currentUser?.data?.SensorVariableUnit
        ? currentUser?.data?.SensorVariableUnit
        : '',
      SensorVariableRange: currentUser?.data?.SensorVariableRange
        ? currentUser?.data?.SensorVariableRange
        : '',
      SensorVariableDescription: currentUser?.data?.SensorVariableDescription
        ? currentUser?.data?.SensorVariableDescription
        : '',
      SensorSettingDataType: currentUser?.data?.SensorSettingDataType
        ? currentUser?.data?.SensorSettingDataType
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
    console.log('isEdit', isEdit, currentUser);
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      // navigate(PATH_DASHBOARD.general.sensorVariable);
      reset(defaultValues);
      if (isEdit === false) {
        dispatch(
          createSensorByID({
            userId: String(id),
            sensorType: 'variable',
            data: { ...data },
          })
        );
      } else {
        dispatch(
          updateSensorByID({
            data: {
              SensorVariableName: data?.SensorVariableName,
              // SensorVariableValue: data?.SensorVariableValue,
              SensorVariableUnit: data?.SensorVariableUnit,
              SensorVariableRange: data?.SensorVariableRange,
              SensorVariableDescription: data?.SensorVariableDescription,
              SensorSettingMasterId: currentUser?.data?.SensorSettingMasterId,
              SensorSettingDataType: currentUser?.data?.SensorSettingDataType,
              SensorId: currentUser?.data?.SensorId,
            },
            sensorId: currentUser?.data?.SensorId,
            sensorType: 'variable',
            userId: currentUser?.userId,
          })
        );
      }
      setRefresh((refresh: boolean) => !refresh);
    } catch (error) {
      console.error('error', error?.response);
      enqueueSnackbar(error?.message || 'Something went wrong!', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Add variable
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
          <RHFTextField name="SensorVariableName" label="Add Variable" />
          {/* <RHFTextField name="SensorVariableValue" label="Add Value" /> */}
          <RHFTextField name="SensorVariableUnit" label="Add Unit" />
          <RHFTextField name="SensorVariableRange" label="Add Range" />
          <RHFTextField
            // gridColumn={{ sm: 'span 2' }}
            // sx={{ gridColumn: 'span 2' }}
            name="SensorVariableDescription"
            label="Add Description"
          />
          <RHFTextField name="SensorSettingDataType" label="Add Type" />
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
                  SensorVariableName: '',
                  // SensorVariableValue: '',
                  SensorVariableUnit: '',
                  SensorVariableRange: '',
                  SensorVariableDescription: '',
                  SensorSettingDataType: '',
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
