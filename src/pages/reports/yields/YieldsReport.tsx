import { Card, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSettingsContext } from 'src/components/settings';
import { useDispatch, useSelector } from 'src/redux/store';
import { getAllReportsData } from '../slice/action';

const YieldsReport: React.FC = () => {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

  const [seriesData, setSeriesData] = useState<any>([
    { data: [], name: 'PVA_yield' },
    { data: [], name: 'SK_heat' },
    { data: [], name: 'PVA_yield_tot' },
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
    },
    yaxis: {
      min: 0,
      max: 70,
    },
    title: {
      text: 'Yields',
      align: 'left',
    },
  };

  useEffect(() => {
    dispatch(getAllReportsData({
      TransactionTopicName: 'topic_2',
      page: 1,
      limit: 10,
    }));
  },[dispatch])
  useEffect(() => {
    const dataInterval = setInterval(updateData, 60000); // Update every 1 minute

    return () => {
      clearInterval(dataInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!isGetReportLoading) {
      const data1 = [] as any;
      const data2 = [] as any;
      const data3 = [] as any;
      reportsData?.rows?.forEach((item:any) => {
        data1.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y:item?.TransactionData[0]?.PVA_yield,
        })
        data2.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y:item?.TransactionData[0]?.SK_heat,
        })
        data3.push({
          x: new Date(item?.TransactionData[0]?.Time)?.getTime(),
          y:item?.TransactionData[0]?.PVA_yield_tot,
        })
      });
      setSeriesData((prevData: any) => [
        { ...prevData[0], data: data1 },
        { ...prevData[1], data: data2 },
        { ...prevData[2], data:data3},
      ]);
    }
  },[reportsData, isGetReportLoading])
  const updateData = () => {
    dispatch(getAllReportsData({
      TransactionTopicName: 'topic_2',
      page: 1,
      limit: 10,
    }));
  };

  return (
    <div className="realtime-chart">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card>
          <ApexCharts options={options} series={seriesData} type="line" height={500} />
        </Card>
      </Container>
    </div>
  );
};

export default YieldsReport;
