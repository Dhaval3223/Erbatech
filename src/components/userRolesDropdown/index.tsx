import { MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { getAllRoles } from "src/pages/Roles/slice/action";
import { useDispatch, useSelector } from "src/redux/store";

const UserRolesDropDown = ({
  onFilterRole,
  filterRole,
  addAllRole,
  setFilterRole,
}: {
  onFilterRole: any;
  filterRole: any;
  addAllRole: boolean;
  setFilterRole: any;
}) => { 

  const dispatch = useDispatch();

  const [roles, setRoles] = useState<any[]>([]);

  const { rolesData } = useSelector(
    (state) => state.roles
  );

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch])

  useEffect(() => {
    if (addAllRole) {
      setRoles([{ RoleId: '', RoleName: 'All' }, ...rolesData])
    } else {
      setRoles(rolesData);
      setFilterRole(rolesData?.[0]?.RoleId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesData])
  
  return (
    <TextField
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
            {roles?.map((option, index) => (
              <MenuItem
                key={index}
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
          </TextField>
  )
};

export default UserRolesDropDown;