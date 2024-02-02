/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { Skeleton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { CSVDownload, CSVLink } from 'react-csv';
import { useSnackbar } from 'src/components/snackbar/index';

import TableComponent from '../TableComponent';
import { slice } from '../slice';

const TABLE_HEAD = [
  { id: 'Time', label: 'Time', align: 'left' },
  { id: 'f_pump', label: 'f_pump', align: 'left' },
  { id: 'f_cal_full', label: 'f_cal_full', align: 'left' },
  { id: 'f_cal_overflow', label: 'f_cal_overflow', align: 'left' },
  { id: 'p_roof', label: 'p_roof', align: 'left' },
];

export default function SkFrquencyTable() {
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

  const csvLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const [csvData, setCSVdata] = useState<any>([]);

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    if (!isGetReportLoading) {
      const data = reportsData?.rows?.map((item: any) => ({
        Time: item?.TransactionData[0]?.Time,
        f_pump: item?.TransactionData[0]?.f_pump,
        f_cal_full: item?.TransactionData[0]?.f_cal_full,
        f_cal_overflow: item?.TransactionData[0]?.f_cal_overflow,
        p_roof: item?.TransactionData[0]?.p_roof,
      }));
      console.log(data, 'dataaaaaa');
      setRows(data);
    } else {
      const data = Array.from({ length: TABLE_HEAD?.length })?.map(() => ({
        Time: <Skeleton />,
        f_pump: <Skeleton />,
        f_cal_full: <Skeleton />,
        f_cal_overflow: <Skeleton />,
        p_roof: <Skeleton />,
      }));
      setRows(data);
    }
  }, [reportsData, isGetReportLoading]);

  useEffect(() => {
    if (isDownloadCSVSuccess) {
      const flattenedData = downloadCSVData?.data?.rows?.map((item: any) => [
        item?.TransactionData[0]?.Time,
        item?.TransactionData[0]?.f_pump,
        item?.TransactionData[0]?.f_cal_full,
        item?.TransactionData[0]?.f_cal_overflow,
        item?.TransactionData[0]?.p_roof,
      ]);

      // Add the header row
      const csvDataArray = [
        ['Time', 'f pump', 'f cal full', 'f cal overflow', 'p roof'],
        ...flattenedData,
      ];

      // Set the CSV data when the component mounts
      setCSVdata(csvDataArray);
      csvLinkRef?.current?.link.click();
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
        <title> SKFrequency table | Soblue</title>
      </Helmet>
      <CSVLink
        data={csvData}
        filename="skfrequency.csv"
        className="hidden"
        ref={csvLinkRef}
        target="_blank"
      />
      <TableComponent
        columns={TABLE_HEAD}
        rowCount={reportsData?.count}
        rows={rows}
        tableType="topic_2"
        reportType="skfrequency"
      />
    </>
  );
}
