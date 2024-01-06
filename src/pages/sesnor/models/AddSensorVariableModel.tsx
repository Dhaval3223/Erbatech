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
import FormProvider, { RHFTextField, } from 'src/components/hook-form';
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
};

export default function AddSensorVariableModel({ isEdit = false, currentUser, onClose, id }: Props) {
    console.log("currentUser", currentUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuthContext();

    const { enqueueSnackbar } = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        SensorSettingGroup: Yup.string().required('Variables is required'),
        SensorSettingIdentifier: Yup.string().required('Value is required'),
        SensorSettingValue: Yup.string().required('Unit is required'),
        SensorSettingDescription: Yup.string().required('Range is required'),
        SensorSettingLocation: Yup.string().required('Description is required'),
    });

    const defaultValues = useMemo(
        () => ( {
            SensorSettingGroup: currentUser?.data?.SensorSettingGroup ? currentUser?.data?.SensorSettingGroup : '',
            SensorSettingIdentifier: currentUser?.data?.SensorSettingIdentifier ? currentUser?.data?.SensorSettingIdentifier : '',
            SensorSettingValue: currentUser?.data?.SensorSettingValue ? currentUser?.data?.SensorSettingValue : '',
            SensorSettingDescription: currentUser?.data?.SensorSettingDescription ? currentUser?.data?.SensorSettingDescription : '',
            SensorSettingLocation: currentUser?.data?.SensorSettingLocation ? currentUser?.data?.SensorSettingLocation : '',
        } ),
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
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            onClose();
            navigate(PATH_DASHBOARD.general.sensorSetting);
            reset(defaultValues);
            if (isEdit === false) {
                dispatch(
                    createSensorByID({
                        userId: String(id),
                        sensorType: 'setting',
                        data: { ...data, SensorSettingMasterId: null, SensorSettingDataType: 'int' },
                    })
                );
            } else {
                dispatch(
                    updateSensorByID({
                        data: {
                            SensorSettingGroup: data?.SensorSettingGroup,
                            SensorSettingIdentifier: data?.SensorSettingIdentifier,
                            SensorSettingValue: data?.SensorSettingValue,
                            SensorSettingDescription: data?.SensorSettingDescription,
                            SensorSettingLocation: data?.SensorSettingLocation,
                            SensorSettingMasterId: currentUser?.data?.SensorSettingMasterId,
                            SensorSettingDataType: currentUser?.data?.SensorSettingDataType,
                        },
                        index:String(id),
                        sensorType:'setting',
                        userId: currentUser?.userId,
                    })
                );
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
                    Add sensor variable
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
                    <RHFTextField name="SensorSettingGroup" label="Add Group" />
                    <RHFTextField name="SensorSettingIdentifier" label="Add identifier" />
                    <RHFTextField name="SensorSettingValue" label="Add value" />
                    <RHFTextField name="SensorSettingDescription" label="Add description" />
                    <RHFTextField name="SensorSettingLocation" label="Add location" />
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
                                    SensorSettingGroup: '',
                                    SensorSettingIdentifier: '',
                                    SensorSettingValue: '',
                                    SensorSettingDescription: '',
                                    SensorSettingLocation: '',
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
