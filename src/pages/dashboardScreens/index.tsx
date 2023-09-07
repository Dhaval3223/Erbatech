import { Container, Card, Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from 'src/components/settings';
import { useDispatch } from 'src/redux/store';
import { useState, useEffect } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import UsersDropDown from 'src/components/all-users-dropdown';
import moment from 'moment';

import { slice } from '../reports/slice';
import { getAllReportsData } from '../reports/slice/action';
import { MotherScreen } from './MotherScreen';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [currentSelectedUser, setCurrentSelectedUser] = useState(user?.UserId);

  const [lastLoadingTime, setLastLoadingTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    dispatch(slice.actions.startGetReportsLoading());
    dispatch(
      getAllReportsData({
        topicName: 'topic_2',
        page: 1,
        limit: 1,
        userId: currentSelectedUser,
      })
    );

    const intervalId = setInterval(() => {
      dispatch(
        getAllReportsData({
          topicName: 'topic_2',
          page: 1,
          limit: 1,
          userId: currentSelectedUser,
        })
      );
      setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));
      // Update last call time during each interval
    }, 60000);

    setLastLoadingTime(moment().format('YYYY-MM-DD HH:mm:ss'));

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedUser]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Soblue</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {user?.UserTypeCode !== 'CU' && (
            <UsersDropDown
              size="small"
              currentSelectedUser={currentSelectedUser}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
          )}
          <Typography variant="h6" m="0" textAlign="right" color="#637381" paragraph>
            {`Last data loaded time: ${lastLoadingTime}`}
          </Typography>
        </Box>
        <Card>
          <MotherScreen />
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
