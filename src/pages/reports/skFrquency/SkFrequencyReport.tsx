import { Card, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSettingsContext } from 'src/components/settings';
import { useDispatch, useSelector } from 'src/redux/store';
import { getAllReportsData } from '../slice/action';

const Report: React.FC = () => {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

  const [seriesData, setSeriesData] = useState<any>([
    { data: [], name: 'f_pump' },
    { data: [], name: 'f_cal_full' },
    { data: [], name: 'f_cal_overflow' },
    { data: [], name: 'p_roof' },
  ]);

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
      // min: 0,
      // max: 70,
      title: {
        text: 'hPa', // X-axis label
      },
    },
    title: {
      text: 'SK Frequency & Pressure',
      align: 'left',
    },
  };

  useEffect(() => {
    dispatch(
      getAllReportsData({
        topicName: 'topic_2',
        page: 1,
        limit: 10,
      })
    );
  }, [dispatch]);

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
      const data2 = [] as any;
      const data3 = [] as any;
      const data4 = [] as any;
      reportsData?.rows?.forEach((item: any) => {
        data1.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y: item?.TransactionData[0]?.f_pump,
        });
        data2.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y: item?.TransactionData[0]?.f_cal_full,
        });
        data3.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y: item?.TransactionData[0]?.f_cal_overflow,
        });
        data4.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y: item?.TransactionData[0]?.p_roof,
        });
      });
      setSeriesData((prevData: any) => [
        { ...prevData[0], data: data1 },
        { ...prevData[1], data: data2 },
        { ...prevData[2], data: data3 },
        { ...prevData[3], data: data4 },
      ]);
    }
  }, [reportsData, isGetReportLoading]);

  const updateData = () => {
    dispatch(
      getAllReportsData({
        topicName: 'topic_2',
        page: 1,
        limit: 10,
      })
    );
  };

  return (
    <div className="realtime-chart">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card sx={{ p: 2 }}>
          <ApexCharts options={options} series={seriesData} type="line" height={500} />
        </Card>
      </Container>
    </div>
  );
};

export default Report;
