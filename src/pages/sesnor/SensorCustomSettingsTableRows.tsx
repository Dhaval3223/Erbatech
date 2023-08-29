import {
  TableRow,
  TableCell,
} from '@mui/material';

// ----------------------------------------------------------------------

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

export default function SensorCustomSettingsTableRows({
  row,
  selected,
  user,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  isDeleteRights,
  isUpdateRights,
}: Props) {
  return (
    <TableRow hover selected={selected}>
    <TableCell align="left">{row?.SensorCustomSettingDescription}</TableCell>
    <TableCell align="left">{row?.SensorCustomSettingParameter}</TableCell>
    <TableCell align="left">{row?.SensorCustomSettingRange}</TableCell>
    <TableCell align="left">{row?.SensorCustomSettingUnit}</TableCell>
    <TableCell align="left">{row?.SensorCustomSettingValue}</TableCell>
  </TableRow>
  );
}
