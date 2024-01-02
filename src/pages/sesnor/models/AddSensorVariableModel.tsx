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
import { getAllRoles } from 'src/pages/Roles/slice/action';
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
        SensorVariableName: Yup.string().required('Variables is required'),
        SensorVariableValue: Yup.string().required('Value is required'),
        SensorVariableUnit: Yup.string().required('Unit is required'),
        SensorVariableRange: Yup.string().required('Range is required'),
        SensorVariableDescription: Yup.string().required('Description is required'),
    });

    const defaultValues = useMemo(
        () => (isEdit ? {
            SensorVariableName: currentUser?.data?.SensorCustomSettingParameter,
            SensorVariableValue: currentUser?.data?.SensorCustomSettingValue,
            SensorVariableUnit: currentUser?.data?.SensorCustomSettingUnit,
            SensorVariableRange: currentUser?.data?.SensorCustomSettingRange,
            SensorVariableDescription: currentUser?.data?.SensorCustomSettingDescription,
        } : {
            SensorVariableName: '',
            SensorVariableValue: '',
            SensorVariableUnit: '',
            SensorVariableRange: '',
            SensorVariableDescription: '',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
    );

    useEffect(() => {
        dispatch(
            getAllRoles({
                searchValue: '',
                type: 'all',
                page: '1',
                limit: '10',
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
            enqueueSnackbar(!isEdit ? 'Sensor Created successfully!' : 'Updated successfully!');
            onClose();
            navigate(PATH_DASHBOARD.general.sensorCustomSetting);
            reset(defaultValues);
            if (isEdit === false) {
                dispatch(
                    createSensorByID({
                        userId: user?.UserId,
                        sensorType: 'custom-setting',
                        data: { ...data, SensorVariableMasterId: '1', SensorVariableDataType: 'int' },
                    })
                );
            } else {
                dispatch(
                    updateSensorByID({
                        data: {
                            SensorCustomSettingParameter: data?.SensorVariableName,
                            SensorCustomSettingValue: data?.SensorVariableValue,
                            SensorCustomSettingUnit: data?.SensorVariableUnit,
                            SensorCustomSettingRange: data?.SensorVariableRange,
                            SensorCustomSettingDescription: data?.SensorVariableDescription,
                            SensorCustomSettingMasterId: currentUser?.data?.SensorCustomSettingMasterId,
                            SensorCustomSettingDataType: currentUser?.data?.SensorCustomSettingDataType,
                        },
                        index:id,
                        sensorType:'custom-setting',
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
                    <RHFTextField name="SensorVariableName" label="Add variables" />
                    <RHFTextField name="SensorVariableValue" label="Add value" />
                    <RHFTextField name="SensorVariableUnit" label="Add unit" />
                    <RHFTextField name="SensorVariableRange" label="Add Range" />
                    <RHFTextField name="SensorVariableDescription" label="Add description" />
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
                                    SensorVariableValue: '',
                                    SensorVariableUnit: '',
                                    SensorVariableRange: '',
                                    SensorVariableDescription: '',
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
