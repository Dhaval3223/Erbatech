import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// @types
import { IUserAccountGeneral } from 'src/@types/user';
// components
import Iconify from '../../components/iconify';
import MenuPopover from '../../components/menu-popover';
import ConfirmDialog from '../../components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  user?: boolean;
  onEditRow: VoidFunction;
  onSelectRow?: VoidFunction;
  onDeleteRow?: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  user,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  console.log(user);
  const { FirstName, LastName, Role } = row || {};

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
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

            {/* <TableRow hover> */}
                          <TableCell>
                            {FirstName} {LastName}
                          </TableCell>
                          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                            {user ? Role?.RoleName : row?.UserId}
                          </TableCell>
                          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                            {user ? row?.Mobile : row?.Mobile}
                          </TableCell>
                          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                            {user ? row?.UserEmail : row?.UserEmail}
                          </TableCell>
                          <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                            {user ? row?.UserCity : row?.UserCity}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                              <Iconify icon="eva:more-vertical-fill" />
                            </IconButton>
                          </TableCell>
                        {/* </TableRow> */}
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
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

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
