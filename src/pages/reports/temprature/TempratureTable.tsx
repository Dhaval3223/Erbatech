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
  { id: 'T_outside', label: 'T_outside', align: 'left' },
  { id: 'T_tank', label: 'T_tank', align: 'left' },
  { id: 'T_tank_2', label: 'T_tank_2', align: 'left' },
  { id: 'T_coll_surface', label: 'T_coll_surface', align: 'left' },
  { id: 'T_coll_backfeed', label: 'T_coll_backfeed', align: 'left' },
  { id: 'T_coll_infeed', label: 'T_coll_infeed', align: 'left' },
];

export default function TempratureTable() {
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
        T_outside: item?.TransactionData[0]?.T_outside,
        T_tank: item?.TransactionData[0]?.T_tank,
        T_tank_2: item?.TransactionData[0]?.T_tank_2,
        T_coll_surface: item?.TransactionData[0]?.T_coll_surface,
        T_coll_backfeed: item?.TransactionData[0]?.T_coll_backfeed,
        T_coll_infeed: item?.TransactionData[0]?.T_coll_infeed,
      }));
      console.log(data, 'dataaaaaa');
      setRows(data);
    } else {
      const data = Array.from({ length: TABLE_HEAD?.length })?.map(() => ({
        Time: <Skeleton />,
        T_outside: <Skeleton />,
        T_tank: <Skeleton />,
        T_tank_2: <Skeleton />,
        T_coll_surface: <Skeleton />,
        T_coll_backfeed: <Skeleton />,
        T_coll_infeed: <Skeleton />,
      }));
      setRows(data);
    }
  }, [reportsData, isGetReportLoading]);

  useEffect(() => {
    if (isDownloadCSVSuccess) {
      const flattenedData = downloadCSVData?.data?.rows?.map((item: any) => [
        item?.TransactionData[0]?.Time,
        item?.TransactionData[0]?.T_outside,
        item?.TransactionData[0]?.T_tank,
        item?.TransactionData[0]?.T_tank_2,
        item?.TransactionData[0]?.T_coll_surface,
        item?.TransactionData[0]?.T_coll_backfeed,
        item?.TransactionData[0]?.T_coll_infeed,
      ]);

      // Add the header row
      const csvDataArray = [
        [
          'Time',
          'T outside',
          'T tank',
          'T tank 2',
          'T coll surface',
          'T coll backfeed',
          'T coll infeed',
        ],
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
      {csvData && <CSVDownload data={csvData} target="_blank" />}
      <TableComponent
        columns={TABLE_HEAD}
        rowCount={reportsData?.count}
        rows={rows}
        tableType="topic_2"
      />
    </>
  );
}
