import { Card, Container, MenuItem, Skeleton, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSettingsContext } from 'src/components/settings';
import { useDispatch, useSelector } from 'src/redux/store';
import moment from 'moment';
import { useAuthContext } from 'src/auth/useAuthContext';
import UsersDropDown from 'src/components/all-users-dropdown';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getAllReportsData } from '../slice/action';

const DAYS_FILTER = [
  {
    item: '1 Hour',
    value: '1_hour',
    start_date: moment().subtract(1, 'hour'),
    end_date: moment(),
  },

  {
    item: '4 Hours',
    value: '4_hours',
    start_date: moment().subtract(4, 'hours'),
    end_date: moment(),
  },
  {
    item: '8 Hours',
    value: '8_hours',
    start_date: moment().subtract(8, 'hours'),
    end_date: moment(),
  },
  {
    item: '12 Hours',
    value: '12_hours',
    start_date: moment().subtract(12, 'hours'),
    end_date: moment(),
  },
  {
    item: '24 Hours',
    value: '24_hours',
    start_date: moment().subtract(1, 'day'),
    end_date: moment(),
  },
  {
    item: '48 Hours',
    value: '48_hours',
    start_date: moment().subtract(2, 'day'),
    end_date: moment(),
  },
];

const WeatherReport: React.FC = () => {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { users } = useSelector((state) => state.user);

  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

  const [seriesData, setSeriesData] = useState<any>([
    {
      data: [],
      name: 'p_buffer_tank',
    },
    { data: [], name: 'p_roof' },
  ]);

  const [selectDays, setSelectedDays] = useState<string>('1_hour');
  const { user } = useAuthContext();
  const [currentSelectedUser, setCurrentSelectedUser] = useState<any>(user?.UserId);
  const [dateRange, setDateRange] = useState<any>({
    start_date: moment().subtract(1, 'hour'),
    end_date: moment(),
  });

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'realtime-chart',
      animations: {
        enabled: false,
        easing: 'linear',
        // dynamicAnimation: {
        //   speed: 1000,
        // },
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Time', // X-axis label
      },
    },
    yaxis: {
      // min: 2,
      // max: 14,
      title: {
        text: '°C', // X-axis label
      },
    },
    title: {
      text: 'Weather',
      align: 'left',
    },
  };

  useEffect(() => {
    if (dateRange?.start_date !== '' && dateRange?.end_date !== '') {
      dispatch(
        getAllReportsData({
          topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
            ?.UserTopicName?.send,
          page: 1,
          limit: 10,
          startDate: dateRange?.start_date,
          endDate: dateRange?.end_date,
          userId: currentSelectedUser,
          type: 'all',
        })
      );
    } else {
      dispatch(
        getAllReportsData({
          topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
            ?.UserTopicName?.send,
          page: 1,
          limit: 10,
          userId: currentSelectedUser,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, dateRange, currentSelectedUser]);

  useEffect(() => {
    const dataInterval = setInterval(updateData, 60000); // Update every 1 minute

    return () => {
      clearInterval(dataInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isGetReportLoading) {
      const data1 = [] as any;

      reportsData?.rows
        ?.slice()
        ?.reverse()
        ?.forEach((item: any) => {
          data1.push({
            time: moment(item?.TransactionData[0]?.Time, 'YYYY-MM-DD HH:mm')?.format('HH:mm'),
            p_buffer_tank: item?.TransactionData[0]?.p_buffer_tank,
            p_roof: item?.TransactionData[0]?.p_roof,
          });
        });
      setSeriesData(data1);
    }
  }, [reportsData, isGetReportLoading]);

  const updateData = () => {
    dispatch(
      getAllReportsData({
        topicName: users?.rows?.find((item: any) => item?.UserId === currentSelectedUser)
          ?.UserTopicName?.send,
        page: 1,
        limit: 10,
        startDate: dateRange?.start_date ? dateRange?.start_date : '',
        endDate: dateRange?.end_date ? dateRange?.end_date : '',
      })
    );
  };

  return (
    <div className="realtime-chart">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack
          spacing={2}
          alignItems="center"
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          sx={{
            // paddingLeft: '25px',
            paddingBottom: '10px',
          }}
          display="flex"
          justifyContent="flex-end"
        >
          <TextField
            fullWidth
            select
            size="small"
            label="Time"
            value={selectDays}
            onChange={(e) => {
              const data = DAYS_FILTER?.find((item) => item?.value === e.target.value);
              console.log('date', data?.start_date, data?.end_date);
              setSelectedDays(e.target.value);
              setDateRange({
                start_date: data?.start_date,
                end_date: data?.end_date,
              });
            }}
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
            {DAYS_FILTER?.map((option: any, index: number) => (
              <MenuItem
                key={index}
                value={option?.value}
                sx={{
                  mx: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                }}
              >
                {option?.item}
              </MenuItem>
            ))}
          </TextField>

          {user?.UserTypeCode !== 'CU' && (
            <UsersDropDown
              size="small"
              currentSelectedUser={currentSelectedUser}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
          )}
        </Stack>
        <Card sx={{ p: 2 }}>
          {isGetReportLoading ? (
            <Skeleton variant="rectangular" width={1048} height={500} />
          ) : (
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                // width={500}
                // height={300}
                data={seriesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="p_buffer_tank"
                  stroke="#8884d5"
                  dot={false}
                  strokeWidth={4}
                />
                <Line
                  type="monotone"
                  dataKey="p_roof"
                  stroke="#DE6FA1"
                  dot={false}
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default WeatherReport;
