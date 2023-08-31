import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";

const RealTimeChart: React.FC = () => {
  const [seriesData, setSeriesData] = useState<any>([
    { data: [], name: "Series 1" },
    { data: [], name: "Series 2" },
    { data: [], name: "Series 3" },
  ]);
  
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "realtime-chart",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      min: 0,
      max: 100,
    },
    title: {
      text: "Real-Time Chart",
      align: "left",
    },
  };

  useEffect(() => {
    const dataInterval = setInterval(updateData, 1000); // Update every 1 minute

    return () => {
      clearInterval(dataInterval);
    };
  }, []);

  const updateData = () => {
    const newDataPoint = {
      x: new Date().getTime(),
      y: Math.floor(Math.random() * 100),
    };

    const newDataPoint2 = {
      x: new Date().getTime(),
      y: Math.floor(Math.random() * 100),
    };

    const newDataPoint3 = {
      x: new Date().getTime(),
      y: Math.floor(Math.random() * 100),
    };

    setSeriesData((prevData: any) => [
      { ...prevData[0], data: [...prevData[0].data, newDataPoint] },
      { ...prevData[1], data: [...prevData[1].data, newDataPoint2] },
      { ...prevData[2], data: [...prevData[2].data, newDataPoint3] },
    ]);
  };

  return (
    <div className="realtime-chart">
      <ApexCharts options={options} series={seriesData} type="line" height={300} />
    </div>
  );
};

export default RealTimeChart;
