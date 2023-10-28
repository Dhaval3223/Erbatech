// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button, Box } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { useLocales } from 'src/locales';
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
  isCreateRights: boolean;
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
}: Props) {
  const {translate} = useLocales();
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
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <TextField
          fullWidth={!isCreateButton}
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
      </Box>
      {isCreateButton && isCreateRights && (
        <Button
          variant="contained"
          sx={{ flexShrink: 0 }}
          onClick={handleCreateClick}
          // startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          {`${translate(createButtonLable)}`}
        </Button>
      )}
    </Stack>
  );
}
