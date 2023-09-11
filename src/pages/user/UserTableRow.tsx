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
  Dialog,
  Box,
} from '@mui/material';
// @types
import { IUserAccountGeneral } from 'src/@types/user';
// components
import { useAuthContext } from 'src/auth/useAuthContext';
import AuthNewPasswordForm from 'src/sections/auth/AuthNewPasswordForm';
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
  isDeleteRights: boolean;
  isUpdateRights: boolean;
};

export default function UserTableRow({
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
  const { FirstName, LastName, Role } = row || {};

  const { isSuperAdmin } = useAuthContext();
  console.log('isSuperAdmin', isSuperAdmin);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [changePassModal, setChangePassModal] = useState(false);

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

  const handleCloseDrawer = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    setChangePassModal(false);
  };

  const handleOpenDrawer = () => setChangePassModal(true);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{FirstName}</TableCell>
        <TableCell>{LastName}</TableCell>
        <TableCell align="left">{user ? Role?.RoleName : row?.UserEmail}</TableCell>
        <TableCell align="left">{user ? row?.Mobile : row?.Mobile}</TableCell>
        {user && <TableCell align="left">{user ? row?.UserEmail : row?.UserEmail}</TableCell>}
        {!user && (
          <TableCell align="left">
            {row?.State && (row?.State || row?.State?.StateCountryName) !== null
              ? row?.State?.StateCountryName
              : '-'}
          </TableCell>
        )}
        {!user && (
          <TableCell align="left">
            {row?.State && (row?.State || row?.State?.StateName) !== null
              ? row?.State?.StateName
              : '-'}
          </TableCell>
        )}
        {!user && <TableCell align="left">{row?.UserCity}</TableCell>}
        <TableCell align="left">
          {isDeleteRights === false && isUpdateRights === false ? (
            ''
          ) : (
            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
        {isSuperAdmin && (
          <MenuItem
            onClick={() => {
              handleOpenDrawer();
              handleClosePopover();
            }}
            // sx={{ color: 'error.main' }}
          >
            <Iconify icon="mdi:password-outline" />
            Reset Password
          </MenuItem>
        )}

        {isUpdateRights && (
          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        )}

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

      <Dialog
        open={changePassModal}
        onClose={handleCloseDrawer}
        // aria-labelledby="parent-modal-title"
        // aria-describedby="parent-modal-description"
      >
        <Box sx={{ p: '26px' }}>
          <Typography variant="h5" textAlign="center" sx={{ mb: '16px' }}>
            Reset Password
          </Typography>
          <AuthNewPasswordForm isSuperAdmin email={row?.UserEmail} onclose={handleCloseDrawer} />
        </Box>
      </Dialog>
    </>
  );
}
