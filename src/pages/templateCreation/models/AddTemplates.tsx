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
import { getAllRoles } from '../../Roles/slice/action';
import {
  createTemplateMapping,
  createUser,
  getAllUsers,
  updateUserById,
  viewAllTemplate,
} from '../../user/slice/action';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUserAccountGeneral, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: any;
  user?: boolean;
  onClose?: any;
  setHitApi?: any;
};

export default function TemplateAdds({
  isEdit = false,
  currentUser,
  user,
  onClose,
  setHitApi,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { viewTemplateData, users } = useSelector((state) => state.user);
  console.log('view', viewTemplateData);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    templateId: Yup.string().required('Template name is required'),
    customerId: Yup.string().required('Customer name is required'),
    send: Yup.string().required('Send is required'),
    receive: Yup.string().required('Receive is required'),
    alerm: Yup.string().required('Topic name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      templateId: '',
      customerId: '',
      send: '',
      receive: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  useEffect(() => {
    dispatch(viewAllTemplate());
    dispatch(
      getAllUsers({
        searchValue: '',
        userType: 'customer',
        userRoleId: '',
        page: '0',
        limit: '99999999',
      })
    );
  }, [dispatch]);

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

  const onSubmit = async (data: any) => {
    console.log('data', data);
    try {
      dispatch(
        createTemplateMapping({
          userTemplateId: data?.templateId,
          userId: data?.customerId,
          topics: {
            send: data?.send,
            alarm: data?.alerm,
            receive: data?.receive,
          },
        })
      );
      setHitApi((prev: boolean) => !prev);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Template mapped succesfully.');
      reset();
      onClose();
      reset(defaultValues);
    } catch (error) {
      enqueueSnackbar('Failed to map template.');
      console.error('error', error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Add Template
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
          <RHFTextField name="alerm" label="Topic name" />
          <RHFTextField name="send" label="Send" />
          <RHFTextField name="receive" label="Receive" />

          <RHFSelect native name="templateId" label="Template Name" placeholder="Template Id">
            <option value="" />
            {viewTemplateData?.rows?.map((template) => (
              <option key={template.TemplateId} value={template.TemplateId}>
                {template.TemplateName}
              </option>
            ))}
          </RHFSelect>
          <RHFSelect native name="customerId" label="Customer Name" placeholder="Template Id">
            <option value="" />
            {users?.rows?.map((item: any) => (
              <option key={item.UserId} value={item.UserId}>
                {item.FirstName} - {item?.UserEmail}
              </option>
            ))}
          </RHFSelect>
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
                  templateId: '',
                  customerId: '',
                  send: '',
                  receive: '',
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
