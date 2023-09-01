import {
  TableRow,
  TableCell,
} from '@mui/material';

type Props = {
  row: any;
  selected: boolean;
  user?: boolean;
  onEditRow: VoidFunction;
  onSelectRow?: VoidFunction;
  onDeleteRow?: VoidFunction;
  isDeleteRights: boolean;
  isUpdateRights: boolean;
};

export default function SensorSettingsTableRow({
  row,
  selected,
  user,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  isDeleteRights,
  isUpdateRights,
}: Props) {
  console.log(user);
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{row?.SensorSettingIdentifier}</TableCell>
      <TableCell align="left">{row?.SensorSettingValue}</TableCell>
      <TableCell align="left">{row?.SensorSettingGroup}</TableCell>
      <TableCell align="left">{row?.SensorSettingLocation}</TableCell>
      <TableCell align="left">{row?.SensorSettingDescription}</TableCell>
    </TableRow>
  );
}
