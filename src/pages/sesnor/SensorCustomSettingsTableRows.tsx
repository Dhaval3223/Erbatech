import { TableRow, TableCell, TextField } from '@mui/material';
import { useState } from 'react';

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
  editingId: any;
  handleBlur: any;
  handleCellDoubleClick: any;
  handleOnChangeUpdate: any;
  index: number;
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
  editingId,
  handleBlur,
  handleCellDoubleClick,
  index,
  handleOnChangeUpdate,
}: Props) {

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left" sx={{ width: '25%' }}>
        {row?.SensorCustomSettingDescription}
      </TableCell>
      <TableCell align="left" onDoubleClick={() => handleCellDoubleClick(index, row)}>
        {editingId === index ? (
          <TextField
            value={row.name}
            onChange={handleOnChangeUpdate}
            onBlur={handleBlur}
          />
        ) : (
          row?.SensorCustomSettingValue || '-'
        )}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' }}>
        {row?.SensorCustomSettingParameter}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' }}>
        {row?.SensorCustomSettingRange}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' }}>
        {row?.SensorCustomSettingUnit}
      </TableCell>
    </TableRow>
  );
}
