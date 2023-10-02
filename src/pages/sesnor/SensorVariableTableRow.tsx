import { useState } from 'react';
// @mui
import { TableRow, TableCell } from '@mui/material';
import { useSelector } from 'src/redux/store';
import { useAuthContext } from 'src/auth/useAuthContext';
import { sensorActor } from './json/sensorActor';
import varable from './json/variables.json';

// @types
// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  user?: boolean;
  SensorVariableType?: boolean;
};

export default function SensorVariableTableRow({ row, selected, user, SensorVariableType }: Props) {
  console.log(user);

  const { reportsData } = useSelector((state) => state.report);

  // const { user } = useAuthContext();

  const apiValues: any = reportsData?.rows?.[0]?.TransactionData?.[0];
  console.log('sensorData', apiValues?.[row?.SensorVariableName]);

  return SensorVariableType ? (
    <TableRow hover selected={selected}>
      {/* <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorVariableDataType ? row?.SensorVariableDataType : '-'}
      </TableCell> */}
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorVariableName}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%', color: 'red' }}>
        {apiValues?.[row?.SensorVariableName] ? apiValues?.[row?.SensorVariableName] : '-'}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorVariableUnit}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorVariableRange}
      </TableCell>
      <TableCell align="left" sx={{ width: '25%' }}>
        {row?.SensorVariableDescription}
      </TableCell>
    </TableRow>
  ) : (
    <TableRow hover selected={selected}>
      {/* <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorSettingDataType ? row?.SensorSettingDataType : '-'}
      </TableCell> */}
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorSettingGroup}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorSettingIdentifier}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%', color: 'red' }}>
        {apiValues?.[sensorActor?.[row?.SensorSettingIdentifier]]
          ? apiValues?.[sensorActor?.[row?.SensorSettingIdentifier]]
          : '-'}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' }}>
        {row?.SensorSettingDescription}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' }}>
        {row?.SensorSettingLocation}
      </TableCell>
    </TableRow>
  );
}
