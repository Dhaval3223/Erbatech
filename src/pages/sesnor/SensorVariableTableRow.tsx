import { useState } from 'react';
// @mui
import { TableRow, TableCell, IconButton, MenuItem, Button } from '@mui/material';
import { useSelector } from 'src/redux/store';
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import ConfirmDialog from 'src/components/confirm-dialog';

// @types
// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  user?: boolean;
  SensorVariableType?: boolean;
  isDeleteRights: boolean;
  isUpdateRights: boolean;
  onEditRow: any;
  index: number;
  onDeleteRow: VoidFunction;
};

export default function SensorVariableTableRow({ row, selected, user, SensorVariableType, isDeleteRights, isUpdateRights, onEditRow,index, onDeleteRow }: Props) {
  console.log(user);

  const { reportsData } = useSelector((state) => state.report);
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
    <>
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
        {row?.SensorSettingValue ? row?.SensorSettingValue : '-'}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' }}>
        {row?.SensorSettingDescription}
      </TableCell>
      <TableCell align="left" sx={{ width: '20%' }}>
        {row?.SensorSettingLocation}
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
