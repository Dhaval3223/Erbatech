export interface ISensorState {
    templateDetails: {
        TemplatePath:string,
        TemplateTopicName: {
            send: string;
            alarm: string;
            receive: string;
        },
        TemplateStatus: boolean,
    }
    isTemplateDetailsByIdLoading: boolean;
    sensorData: any;
    error: any;
    isSensorUpdateLoading: boolean;
    sensorUpdateData: any;
}