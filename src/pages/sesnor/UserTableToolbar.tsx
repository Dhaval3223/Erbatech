// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
import UsersDropDown from 'src/components/all-users-dropdown';
import Iconify from 'src/components/iconify/Iconify';
// components

// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  filterRole: string;
  isFiltered: boolean;
  createButtonLable?: string;
  isCreateButton?: boolean;
  optionsRole: string[];
  onResetFilter: VoidFunction;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateClick?: any;
  onUserChange?: any;
  currentSelectedUser: number | string;
  setCurrentSelectedUser: any;
  lastLoadingTime?: any;
  isCreateRights?: boolean;
  lastUpdateStatus?: boolean;
};

export default function SensorTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
  isCreateButton,
  createButtonLable,
  handleCreateClick,
  isCreateRights,
  lastUpdateStatus,
  lastLoadingTime,
  onUserChange,
  currentSelectedUser,
  setCurrentSelectedUser,
}: Props) {
  console.log(isCreateRights, 'isCreateRights');
  const { user } = useAuthContext();

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 2 }}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
      >
        <TextField
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        {isFiltered && (
          <Button
            color="error"
            sx={{ flexShrink: 0, ml: 2 }}
            onClick={onResetFilter}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Clear
          </Button>
        )}
        {isCreateButton && isCreateRights && (
          <Button
            variant="contained"
            sx={{ flexShrink: 0, ml: '20px' }}
            onClick={handleCreateClick}
            // startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            {createButtonLable}
          </Button>
        )}
      </Stack>
      {lastUpdateStatus && user?.UserTypeCode === 'CU' ? (
        <Typography variant="body2" paragraph>
          {`Last data loaded time: ${lastLoadingTime}`}
        </Typography>
      ) : (
        <UsersDropDown
          onChange={onUserChange}
          currentSelectedUser={currentSelectedUser}
          setCurrentSelectedUser={setCurrentSelectedUser}
        />
      )}
    </Stack>
  );
}
