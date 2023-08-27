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
  console.log(user);

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
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        {/* <TableRow hover> */}
        <TableCell>
          {row?.parameter}
        </TableCell>
        <TableCell align="left">{row?.unit}</TableCell>
        <TableCell align="left">{ row?.range}</TableCell>
        <TableCell align="left">{ row?.description}</TableCell>
        <TableCell align="left">{row?.value}</TableCell>
        <TableCell align="left">
          {isDeleteRights === false && isUpdateRights === false ? (
            ''
          ) : (
            <Button>
              <Iconify icon="eva:edit-fill" /> Edit
            </Button>
          )}
        </TableCell>
        {/* </TableRow> */}
      </TableRow>

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
