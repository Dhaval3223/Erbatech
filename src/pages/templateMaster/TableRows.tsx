import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ToggleButton,
  Switch,
} from '@mui/material';
// @types
import { IUserAccountGeneral } from 'src/@types/user';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover/MenuPopover';
import ConfirmDialog from 'src/components/confirm-dialog/index';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  handleToggle: any;
  index: any;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  handleToggle,
  index,
}: Props) {
  const navigate = useNavigate();
  // const { name, avatarUrl, company, role, isVerified, status } = row;

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
        <TableCell
          align="left"
          sx={{
            cursor: 'pointer',
            ':hover': {
              textDecoration: 'underline',
              color: 'blue',
            },
          }}
          onClick={() => navigate(`/dashboard/template-master/${row?.TemplateId}`)}
        >
          {row?.TemplateName}
        </TableCell>
        <TableCell
          align="left"
          style={{
            color: 'red',
          }}
        >
          <Switch checked={row?.TemplateStatus} onChange={(e) => handleToggle(e, index, row)} />
        </TableCell>
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
