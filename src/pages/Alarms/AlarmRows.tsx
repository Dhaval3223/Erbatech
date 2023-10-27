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
  selected: boolean;
  user?: boolean;
};

export default function AlarmRows({ row, selected, user }: Props) {
  console.log(user);

  const { reportsData } = useSelector((state) => state.report);

  // const { user } = useAuthContext();

  const apiValues: any = reportsData?.rows?.[0]?.TransactionData?.[0];
  console.log('sensorData', apiValues?.[row?.SensorVariableName]);

  return (
    <TableRow hover selected={selected}>
      {/* <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorSettingDataType ? row?.SensorSettingDataType : '-'}
      </TableCell> */}
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.TransactionAlarmName}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.TransactionAlarmDescription}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%', color: 'red' }}>
        {moment(row?.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm')}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' }}>
       <Switch />
      </TableCell>
    </TableRow>
  );
}
