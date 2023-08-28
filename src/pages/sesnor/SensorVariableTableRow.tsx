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
  TextField,
} from '@mui/material';
// @types
import { IUserAccountGeneral } from 'src/@types/user';
// components
import { useAuthContext } from 'src/auth/useAuthContext';
import AuthNewPasswordForm from 'src/sections/auth/AuthNewPasswordForm';
import { RHFTextField } from 'src/components/hook-form';
import Iconify from '../../components/iconify';
import MenuPopover from '../../components/menu-popover';
import ConfirmDialog from '../../components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  user?: boolean;
};

export default function SensorVariableTableRow({ row, selected, user }: Props) {
  console.log(user);

  const [indexRow, setIndexRow] = useState<number>(0);

  return (
    <TableRow hover selected={selected}>
      {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

      {/* <TableRow hover> */}
      <TableCell>{row?.variables}</TableCell>
      <TableCell align="left">
        {/* {' '}
        {row?.id === id && index === indexRow ? (
          <TextField variant="standard" name="value" defaultValue={row?.value} />
        ) : ( */}
        {row?.value}
        {/* )} */}
      </TableCell>
      <TableCell align="left">{row?.unit}</TableCell>
      <TableCell align="left">{row?.range}</TableCell>
      <TableCell align="left">{row?.description}</TableCell>
      {/* <TableCell align="left">
          {isDeleteRights === false && isUpdateRights === false ? (
            ''
          ) : (
            <IconButton onClick={() => {
              setIndexRow(index);
              setId(row?.id)
            }}>
            <Iconify icon="eva:edit-fill" /> Edit
          </IconButton>
          )}
        </TableCell> */}
      {/* </TableRow> */}
    </TableRow>
  );
}
