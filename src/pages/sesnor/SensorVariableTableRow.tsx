import { useState } from 'react';
// @mui
import { TableRow, TableCell } from '@mui/material';
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

  const [indexRow, setIndexRow] = useState<number>(0);

  return SensorVariableType ? (
    <TableRow hover selected={selected}>
      {/* <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorVariableDataType ? row?.SensorVariableDataType : '-'}
      </TableCell> */}
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorVariableName}
      </TableCell>
      <TableCell align="left" sx={{ width: '15%', color:'red' }}>
        {row?.SensorVariableValue ? row?.SensorVariableValue : '-'}
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
      <TableCell align="left" sx={{ width: '15%', color:'red' }}>
        {row?.SensorSettingValue ? row?.SensorSettingValue : '-'}
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
