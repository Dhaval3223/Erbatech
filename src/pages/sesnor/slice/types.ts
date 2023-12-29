export interface ISensorState {
    isSensorLoading: boolean;
    sensorData: any;
    error: any;
    isSensorUpdateLoading: boolean;
    sensorUpdateData: any;
    isSensorCreateLoading: boolean;
    sensorCreateData: any;
    createSensorError: any;
    isDeleteSensorSuccess: boolean;
    isDeleteSensorError: boolean;
    deleteSensorMsg: any;
}