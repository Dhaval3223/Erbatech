import React, { useState, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ScatterChart() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'chart',
      height: 350,
      type: 'line',
      zoom: {
        enabled:false,
        type: 'xy',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      tickAmount:5,
      tickPlacement:'between'
    },
    yaxis: {
        tickAmount:7,
      max: 70,
    },
  };

  function generateDayWiseTimeSeries(baseval: any, count: any, yrange: any) {
    let i = 0;
    const series1 = [];
    while (i < count) {
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series1.push([baseval, y]);
      baseval += 86400000;
      i += 1;
    }
    return series1;
  }

  const series = [
    {
      name: 'TEAM 1',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'TEAM 2',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'TEAM 3',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'TEAM 4',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'TEAM 5',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
  ];

  return (
    <div className="chart">
      <ReactApexChart options={options} series={series} />
    </div>
  );
}
