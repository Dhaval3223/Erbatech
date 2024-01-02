import { useState } from 'react';
// @mui
import { TableRow, TableCell, IconButton } from '@mui/material';
import { useSelector } from 'src/redux/store';
import Iconify from 'src/components/iconify';

// @types
// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  user?: boolean;
  SensorVariableType?: boolean;
  isDeleteRights: boolean;
  isUpdateRights: boolean;
};

export default function SensorVariableTableRow({ row, selected, user, SensorVariableType, isDeleteRights, isUpdateRights }: Props) {
  console.log(user);

  const { reportsData } = useSelector((state) => state.report);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  // const { user } = useAuthContext();

  const apiValues: any = reportsData?.rows?.[0]?.TransactionData?.[0];
  console.log('sensorData', apiValues?.[row?.SensorVariableName]);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

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
  );
}
