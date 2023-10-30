import { useState } from 'react';
// @mui
import { TableRow, TableCell, Switch } from '@mui/material';
import { useSelector } from 'src/redux/store';
import { useAuthContext } from 'src/auth/useAuthContext';
import moment from 'moment';

// @types
// ----------------------------------------------------------------------

type Props = {
  row: any;
  handleAckApi?: any;
  selected: boolean;
  user?: boolean;
  table2?: boolean;
};

export default function AlarmRows({ row, selected, user, table2, handleAckApi }: Props) {
  console.log(user);

  const { reportsData } = useSelector((state) => state.report);

  // const { user } = useAuthContext();

  const apiValues: any = reportsData?.rows?.[0]?.TransactionData?.[0];
  console.log('sensorData', apiValues?.[row?.SensorVariableName]);
  let color = '';
   if(row?.TransactionAlarmType === 'Warning'){
color= 'yellow';
   } else if(row?.TransactionAlarmType === 'Error'){
    color = 'red'
   }else {
color='green'
   }
   console.log("color", color)
  return (
    <TableRow hover selected={selected}>
      {/* <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorSettingDataType ? row?.SensorSettingDataType : '-'}
      </TableCell> */}
      <TableCell align="left" sx={{ width: '15%', color}}>
        {row?.TransactionAlarmName}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%', color }}>
        {row?.TransactionAlarmDescription}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%', color }}>
        {moment(row?.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm')}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' , color}}>
        {table2 ? (
          moment(row?.updatedAt, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm')
        ) : (
          <Switch onChange={() => handleAckApi(row?.TransactionAlarmId)} />
        )}
      </TableCell>
    </TableRow>
  );
}
