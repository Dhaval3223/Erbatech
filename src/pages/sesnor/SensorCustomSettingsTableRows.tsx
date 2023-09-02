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
  updatedData: any;
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
  updatedData,
}: Props) {
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorCustomSettingDataType}
      </TableCell>

      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorCustomSettingParameter}
      </TableCell>

      <TableCell
        align="left"
        sx={{ width: '15%' }}
        onDoubleClick={() => handleCellDoubleClick(index, row)}
      >
        {editingId === index ? (
          <TextField
            // value={row.name}
            // type="number"
            variant="standard"
            // onKeyDown={event => {
            //   if (event.key === 'Enter') handleOnChangeUpdate();
            // }}
            value={updatedData?.data?.SensorCustomSettingValue}
            defaultValue={row?.SensorCustomSettingValue}
            onChange={handleOnChangeUpdate}
            onBlur={handleBlur}
          />
        ) : (
          row?.SensorCustomSettingValue || '-'
        )}
      </TableCell>

      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorCustomSettingUnit}
      </TableCell>

      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorCustomSettingRange}
      </TableCell>

      <TableCell align="left" sx={{ width: '25%' }}>
        {row?.SensorCustomSettingDescription}
      </TableCell>
    </TableRow>
  );
}
