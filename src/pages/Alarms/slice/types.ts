export interface IAlarmState {
    alarmData:{
      count: number;
      rows:{
        TransactionAlarmId: string;
        UserId: string;
        TransactionAlarmType: string;
        TransactionAlarmName: string;
        TransactionAlarmValue: string | boolean;
        TransactionAlarmDescription: string;
        createdAt: string;
      }[];
    };
    alarmDataLoading:boolean;
    alarmData2:{
      count: number;
      rows:{
        TransactionAlarmId: string;
        UserId: string;
        TransactionAlarmType: string;
        TransactionAlarmName: string;
        TransactionAlarmValue: string | boolean;
        TransactionAlarmDescription: string;
        createdAt: string;
      }[];
    };
    alarmData2Loading:boolean;
    checkAlarmData:any;
    checkAlarmDataLoading:boolean;
    alarmAcknowledgementData:any;
    alarmAcknowledgementDataLoading:boolean;
    alarmError:any;
    alarmCheckError:any;
    alarmAcknowledgementError:any;
  }