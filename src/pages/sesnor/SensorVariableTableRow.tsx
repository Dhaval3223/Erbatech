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
      <TableCell align="left">{row?.SensorVariableName}</TableCell>
      <TableCell align="left">
        {row?.SensorVariableValue ? row?.SensorVariableValue : '-'}
      </TableCell>
      <TableCell align="left">{row?.SensorVariableUnit}</TableCell>
      <TableCell align="left">{row?.SensorVariableRange}</TableCell>
      <TableCell align="left">{row?.SensorVariableDescription}</TableCell>
    </TableRow>
  ) : (
    <TableRow hover selected={selected}>
      <TableCell align="left">{row?.SensorSettingDescription}</TableCell>
      <TableCell align="left">{row?.SensorSettingValue ? row?.SensorSettingValue : '-'}</TableCell>
      <TableCell align="left">{row?.SensorSettingGroup}</TableCell>
      <TableCell align="left">{row?.SensorSettingIdentifier}</TableCell>
      <TableCell align="left">{row?.SensorSettingLocation}</TableCell>
    </TableRow>
  );
}
