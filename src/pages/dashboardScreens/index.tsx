/* eslint-disable eqeqeq */
import { Container, Card, Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from 'src/components/settings';
import { useDispatch, useSelector } from 'src/redux/store';
import { useState, useEffect } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import UsersDropDown from 'src/components/all-users-dropdown';
import moment from 'moment';

import { slice } from '../reports/slice';
import { getAllReportsData } from '../reports/slice/action';
import { RhaezuensScreen } from './RhaezuensScreen';
import { DegersheimScreen } from './DegersheimScreen';
import { viewUserById } from '../user/slice/action';
import { SprossScreen } from './SprossScreen';
import { PfisterScreen } from './PfisterScreen';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const { users } = useSelector((state) => state.user);
  console.log('users', users);

  const { viewUserData } = useSelector((state) => state.user);

  const [currentSelectedUser, setCurrentSelectedUser] = useState(user?.UserId);

  const [lastLoadingTime, setLastLoadingTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    dispatch(slice.actions.startGetReportsLoading());
    dispatch(
      getAllReportsData({
        topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
          ?.UserTopicName?.send,
        page: 1,
        limit: 1,
        userId: currentSelectedUser,
      })
    );

    dispatch(viewUserById(currentSelectedUser));

    const intervalId = setInterval(() => {
      dispatch(
        getAllReportsData({
          topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
            ?.UserTopicName?.send,
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
        {user?.UserTypeCode !== 'CU' && (
          <Box sx={{ pb: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <UsersDropDown
              size="small"
              currentSelectedUser={currentSelectedUser}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
          </Box>
        )}
        <Card>
          {viewUserData?.UserTemplateId == 2 && (
            <RhaezuensScreen
              currentSelectedUser={currentSelectedUser}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
          )}
          {viewUserData?.UserTemplateId == 3 && (
            <DegersheimScreen
              currentSelectedUser={currentSelectedUser}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
          )}
          {(viewUserData?.UserTemplateId == 1 || viewUserData?.UserTemplateId == null) && (
            // <MotherScreen
            //   currentSelectedUser={currentSelectedUser}
            //   setCurrentSelectedUser={setCurrentSelectedUser}
            // />
            <Typography variant="body2" mt="8px" textAlign="right" paragraph>
              Template is not mapped
            </Typography>
          )}
          {viewUserData?.UserTemplateId == 4 && (
            <SprossScreen
              currentSelectedUser={currentSelectedUser}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
          )}
          {viewUserData?.UserTemplateId == 5 && (
            <PfisterScreen
              currentSelectedUser={currentSelectedUser}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
          )}
          {/* {!viewUserData?.UserTemplateId && <Page403 />} */}
        </Card>
        <Typography variant="body2" mt="8px" textAlign="right" paragraph>
          {`Last data loaded time: ${lastLoadingTime}`}
        </Typography>
      </Container>
    </>
  );
};

export default Dashboard;
