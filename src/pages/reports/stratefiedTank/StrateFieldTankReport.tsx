import { Card, Container, MenuItem, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSettingsContext } from 'src/components/settings';
import { useDispatch, useSelector } from 'src/redux/store';
import moment from 'moment';
import UsersDropDown from 'src/components/all-users-dropdown';
import { useAuthContext } from 'src/auth/useAuthContext';
import { getAllReportsData } from '../slice/action';

const DAYS_FILTER = [
  {
    item: '1 Hour',
    value: '1_hour',
    start_date: moment().subtract(1, 'hour'),
    end_date: moment(),
  },
  {
    item: '2 Hours',
    value: '2_hours',
    start_date: moment().subtract(2, 'hours'),
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
const StratedReport: React.FC = () => {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

  const [seriesData, setSeriesData] = useState<any>([
    {
      data: [],
      name: 'T_top_strat_tank',
    },
    { data: [], name: 'T_bottom_strat_tank' },
  ]);

  const [selectDays, setSelectedDays] = useState<string>('');
  const { user } = useAuthContext();
  const [currentSelectedUser, setCurrentSelectedUser] = useState<any>(user?.UserId);
  const [dateRange, setDateRange] = useState<any>({
    state_date: '',
    end_date: '',
  });

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'realtime-chart',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
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
      title: {
        text: '°C', // X-axis label
      },
    },
    title: {
      text: 'Stratefield Tank',
      align: 'left',
    },
  };

  useEffect(() => {
    if (dateRange?.start_date !== '' && dateRange?.end_date !== '') {
      dispatch(
        getAllReportsData({
          topicName: 'topic_2',
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
          topicName: 'topic_2',
          page: 1,
          limit: 10,
          userId: currentSelectedUser,
        })
      );
    }
  }, [dispatch, dateRange, currentSelectedUser]);

/*   useEffect(() => {
    const dataInterval = setInterval(updateData, 60000); // Update every 1 minute

    return () => {
      clearInterval(dataInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  useEffect(() => {
    if (!isGetReportLoading) {
      const data1 = [] as any;
      const data2 = [] as any;
      const data3 = [] as any;
      reportsData?.rows?.forEach((item: any) => {
        data1.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y: item?.TransactionData[0]?.T_top_strat_tank,
        });
        data2.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y: item?.TransactionData[0]?.T_bottom_strat_tank,
        });
      });
      setSeriesData((prevData: any) => [
        { ...prevData[0], data: data1 },
        { ...prevData[1], data: data2 },
      ]);
    }
  }, [reportsData, isGetReportLoading]);

  const updateData = () => {
    dispatch(
      getAllReportsData({
        topicName: 'topic_2',
        page: 1,
        limit: 10,
        startDate: dateRange?.start_date ? dateRange?.start_date : '',
        endDate: dateRange?.end_date ? dateRange?.end_date : '',
      })
    );
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        sx={{
          paddingLeft: '25px',
          paddingBottom: '10px',
        }}
      >
        {user?.UserTypeCode !== 'CU' && (
          <UsersDropDown
            size="small"
            currentSelectedUser={currentSelectedUser}
            setCurrentSelectedUser={setCurrentSelectedUser}
          />
        )}

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
      </Stack>
      <div className="realtime-chart">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card sx={{ p: 2 }}>
            <ApexCharts options={options} series={seriesData} type="line" height={500} />
          </Card>
        </Container>
      </div>
    </>
  );
};

export default StratedReport;
