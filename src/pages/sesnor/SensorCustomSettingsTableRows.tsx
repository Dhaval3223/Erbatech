import { TableRow, TableCell, TextField, IconButton, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import ConfirmDialog from 'src/components/confirm-dialog';
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  user?: boolean;
  onEditRow: any;
  onSelectRow?: VoidFunction;
  onDeleteRow: VoidFunction;
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

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>    
    <TableRow hover selected={selected}>
      {/* <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorCustomSettingDataType ? row?.SensorCustomSettingDataType : '-'}
      </TableCell> */}

      <TableCell align="left" sx={{ width: '15%' }}>
        {row?.SensorCustomSettingParameter}
      </TableCell>

      <TableCell
        align="left"
        sx={{ width: '15%', color:'green' }}
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
      <TableCell>
          {isDeleteRights === false && isUpdateRights === false ? (
            ''
          ) : (
            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
    </TableRow>
    <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {isDeleteRights && (
          <MenuItem
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
        )}

        {isUpdateRights && (
          <MenuItem
            onClick={() => {
              onEditRow(index,row);
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        )}
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
