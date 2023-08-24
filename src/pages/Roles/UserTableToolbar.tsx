import { ChangeEvent } from 'react';
// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
// components
import { IconButtonAnimate } from 'src/components/animate';
import { LoadingButton } from '@mui/lab';
import { useSelector } from '../../redux/store';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  filterRole: string;
  isFiltered: boolean;
  optionsRole: any[];
  onResetFilter: VoidFunction;
  handleCreateClick: VoidFunction;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRole?: any;
  role?: any;
  setRoleError?: any;
  handleCreateRoleAPI?: VoidFunction;
  roleError?: boolean;
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
  handleCreateClick,
  setRole,
  role,
  handleCreateRoleAPI,
  roleError,
  setRoleError,
}: Props) {
  const { isCreateRoleLoading } = useSelector(
    (state) => state.roles
  )
  const handleRoles = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (roleError) setRoleError(false);
    setRole({
      RoleName: e.target.value
    })
  }

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
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          direction={{
            xs: 'column',
            sm: 'row',
          }}
        >
          {/* <TextField
            fullWidth
            select
            label="Role"
            value={filterRole}
            onChange={onFilterRole}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    maxHeight: 260,
                  },
                },
              },
            }}
            sx={{
              maxWidth: { sm: 240 },
              textTransform: 'capitalize',
            }}
          >
            {optionsRole?.map((option) => (
              <MenuItem
                key={option}
                value={option?.RoleId}
                sx={{
                  mx: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {option?.RoleName}
              </MenuItem>
            ))}
          </TextField> */}

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
            }} />

          {isFiltered && (
            <Button
              color="error"
              sx={{ flexShrink: 0 }}
              onClick={onResetFilter}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Clear
            </Button>
          )}
        </Stack>
        <Stack 
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          direction={{
            xs: 'column',
            sm: 'row',
          }}
        >
          <TextField
            fullWidth
            name="Role"
            error={roleError}
            label="Create New Role"
            sx={{
              maxWidth: { sm: 240 },
              textTransform: 'capitalize',
            }}
            value={role.RoleName}
            onChange={e =>  handleRoles(e)}
          />
          <LoadingButton
              // fullWidth
              type="submit"
              // variant="contained"
              // size="large"
              loading={isCreateRoleLoading}
              onClick={handleCreateRoleAPI}
            >
              <Iconify icon="eva:plus-fill" width={24} />
            </LoadingButton>
          {/* <IconButtonAnimate 
            color="primary" 
            size="large"
            onClick={handleCreateRoleAPI}
            >
            <Iconify icon="eva:plus-fill" width={24} />
          </IconButtonAnimate> */}
        </Stack>

        {/* <Button
          variant="contained"
          sx={{ flexShrink: 0 }}
          onClick={handleCreateClick}
        >
          + create new role
        </Button> */}
      </Stack>
  );
}
