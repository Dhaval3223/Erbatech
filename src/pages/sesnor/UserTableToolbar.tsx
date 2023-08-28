// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button, Typography } from '@mui/material';
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
  lastLoadingTime?: any;
  isCreateRights: boolean;
  lastUpdateStatus?: boolean;
};

export default function UserTableToolbar({
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
}: Props) {
  console.log(isCreateRights, 'isCreateRights');
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
      >
        <TextField
          // fullWidth={!isCreateButton || !lastUpdateStatus}
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
      </Stack>

      {isCreateButton && isCreateRights && (
        <Button
          variant="contained"
          sx={{ flexShrink: 0 }}
          onClick={handleCreateClick}
          // startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          {createButtonLable}
        </Button>
      )}
      {lastUpdateStatus && (
        <Typography variant="h6" color="#637381" paragraph>
          {`Last data loaded time: ${lastLoadingTime}`}
        </Typography>
      )}
    </Stack>
  );
}
