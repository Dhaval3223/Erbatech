import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllUsers } from 'src/pages/user/slice/action';
import { useDispatch, useSelector } from 'src/redux/store';

const UsersDropDown = ({
  onChange,
  currentSelectedUser,
  addAllRole,
  setCurrentSelectedUser,
  size,
}: {
  onChange?: any;
  currentSelectedUser: any;
  addAllRole?: boolean;
  setCurrentSelectedUser: any;
  size?: 'small' | 'medium';
}) => {
  const dispatch = useDispatch();

  const [usersData, setUsersData] = useState<any[]>([]);

  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      getAllUsers({
        searchValue: '',
        userType: 'customer',
        userRoleId: '',
        page: '0',
        limit: '99999999',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setUsersData(users?.rows);
    setCurrentSelectedUser(users?.rows?.[0]?.UserId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  console.log('users', users);

  return (
    <TextField
      fullWidth
      select
      size={size || 'medium'}
      label="Customer Name"
      value={currentSelectedUser}
      onChange={(e) => setCurrentSelectedUser(e.target.value)}
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
      }}
    >
      {usersData?.map((option: any, index: number) => (
        <MenuItem
          key={index}
          value={option?.UserId}
          sx={{
            mx: 1,
            borderRadius: 0.75,
            typography: 'body2',
          }}
        >
          {`${option?.FirstName} - ${option?.UserEmail}`}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default UsersDropDown;
