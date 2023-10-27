export interface IAlarmState {
    alarmData:{
      count: number;
      rows:{
        TransactionAlarmId: string;
        UserId: string;
        TransactionAlarmType: string;
        TransactionAlarmName: string;
        TransactionAlarmValue: string;
        TransactionAlarmDescription: string;
        createdAt: string;
      }[];
    };
    alarmDataLoading:boolean;
    checkAlarmData:any;
    checkAlarmDataLoading:boolean;
    alarmAcknowledgementData:any;
    alarmAcknowledgementDataLoading:boolean;
    alarmError:any;
    alarmCheckError:any;
    alarmAcknowledgementError:any;
  }