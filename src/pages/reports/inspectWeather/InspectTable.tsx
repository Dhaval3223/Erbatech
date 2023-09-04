/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { Skeleton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CSVDownload } from 'react-csv';
import { useSnackbar } from 'src/components/snackbar/index';

import TableComponent from '../TableComponent';
import { slice } from '../slice';

const TABLE_HEAD = [
    { id: 'Time', label: 'Time', align: 'left' },
  { id: 'Irradiation', label: 'irradiation', align: 'left' },
  { id: 'Wind_speed', label: 'Wind_speed', align: 'left' },
  { id: 'T_outside', label: 'T_outside', align: 'left' },
];

export default function InspectTable() {
  const {
    isGetReportLoading,
    reportsData,
    isDownloadCSVSuccess,
    isDownloadCSVError,
    downloadCSVData,
    downloadCSVMsg,
  } = useSelector((state) => state.report);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState<any>([]);

  const [csvData, setCSVdata] = useState<any>();

  useEffect(() => {
    if (!isGetReportLoading) {
      const data = reportsData?.rows?.map((item: any) => ({
        Time: item?.TransactionData[0]?.Time,
        Irradiation: item?.TransactionData[0]?.Irradiation,
        Wind_speed: item?.TransactionData[0]?.Wind_speed,
        T_outside: item?.TransactionData[0]?.T_outside,
      }));
      console.log(data, 'dataaaaaa');
      setRows(data);
    } else {
      const data = Array.from({ length: TABLE_HEAD?.length })?.map(() => ({
        Time: <Skeleton />,
        Irradiation: <Skeleton />,
        Wind_speed: <Skeleton />,
        T_outside: <Skeleton />,
      }));
      setRows(data);
    }
  }, [reportsData, isGetReportLoading]);

  useEffect(() => {
    if (isDownloadCSVSuccess) {
      const flattenedData = downloadCSVData?.data?.rows?.map((item: any) => [
        item?.TransactionData[0]?.Time,
        item?.TransactionData[0]?.Irradiation,
        item?.TransactionData[0]?.Wind_speed,
        item?.TransactionData[0]?.T_outside,
      ]);

      // Add the header row
      const csvDataArray = [
        ['Time', 'Irradiation', 'Wind speed', 'T outside'],
        ...flattenedData,
      ];

      // Set the CSV data when the component mounts
      setCSVdata(csvDataArray);
      dispatch(slice.actions.clearGetReportErrState());
    }

    if (isDownloadCSVError) {
      enqueueSnackbar(downloadCSVMsg, {
        variant: 'error',
      });
      dispatch(slice.actions.clearGetReportErrState());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDownloadCSVSuccess, isDownloadCSVError]);

  return (
    <>
      <Helmet>
        <title> Yields table | Soblue</title>
      </Helmet>
      {isDownloadCSVSuccess && csvData?.length > 0 && (
        <CSVDownload data={csvData} target="_blank" />
      )}
      <TableComponent
        columns={TABLE_HEAD}
        rowCount={reportsData?.count}
        rows={rows}
        tableType="topic_2"
      />
    </>
  );
}
