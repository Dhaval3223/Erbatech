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
