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
    dispatch(getAllRoles({
      searchValue: "",
      type: "all",
      page: "1",
      limit: "10"
  }));
  }, [dispatch])

  useEffect(() => {
    if (addAllRole) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      setRoles([{ RoleId: '', RoleName: 'All' }, ...rolesData?.row])
    } else {
      setRoles(rolesData?.row);
      setFilterRole(rolesData?.row?.[0]?.RoleId);
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