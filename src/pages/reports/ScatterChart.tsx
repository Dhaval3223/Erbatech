/* eslint-disable import/no-extraneous-dependencies */
import { Card, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDispatch, useSelector } from 'src/redux/store';
import { useAuthContext } from 'src/auth/useAuthContext';
import moment from 'moment';
import UsersDropDown from 'src/components/all-users-dropdown';
import { useSettingsContext } from 'src/components/settings';

import { getAllReportsData } from './slice/action';

interface DataItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const data: DataItem[] = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Example: React.FC = () => {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

  const [seriesData, setSeriesData] = useState<any>([]);
  const { user } = useAuthContext();

  const [selectDays, setSelectedDays] = useState<string>('1_hour');

  const [currentSelectedUser, setCurrentSelectedUser] = useState<any>(user?.UserId);

  const [dateRange, setDateRange] = useState<any>({
    start_date: moment().subtract(1, 'hour'),
    end_date: moment(),
  });

  useEffect(() => {
    if (dateRange?.start_date !== '' && dateRange?.end_date !== '') {
      dispatch(
        getAllReportsData({
          topicName: 'topic_2',
          page: 1,
          limit: 10,
          type: 'all',
          startDate: moment().subtract(2, 'day'),
          endDate: dateRange?.end_date,
          userId: currentSelectedUser,
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

  useEffect(() => {
    if (!isGetReportLoading) {
      const tempData = reportsData?.rows?.map((item: any) => ({
        name: new Date(item?.TransactionData[0]?.Time)?.getTime(),
        PVA_yield: item?.TransactionData[0]?.T_outside,
        SK_heat: item?.TransactionData[0]?.T_tank,
        PVA_yield_tot: item?.TransactionData[0]?.T_tank_2,
      }));
      console.log(
        'reportsData',
        reportsData?.rows?.map((item: any) => ({
          name: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          PVA_yield: item?.TransactionData[0]?.PVA_yield,
          SK_heat: item?.TransactionData[0]?.SK_heat,
          PVA_yield_tot: item?.TransactionData[0]?.PVA_yield_tot,
        }))
      );
      setSeriesData(tempData);
    }
  }, [reportsData, isGetReportLoading]);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <Card sx={{ p: 2 }}>
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="PVA_yield" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="SK_heat" stroke="#82ca9d" />
            <Line type="monotone" dataKey="PVA_yield_tot" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default Example;
