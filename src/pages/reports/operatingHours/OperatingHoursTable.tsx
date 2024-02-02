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
  { id: 'WP_in_operation', label: 'WP_in_operation', align: 'left' },
  { id: 'LK_in_operation', label: 'LK_in_operation', align: 'left' },
  { id: 'ZH_in_operation', label: 'ZH_in_operation', align: 'left' },
  {
    id: 'Operating_time_SV_heat_transfer',
    label: 'Operating_time_SV_heat_transfer',
    align: 'left',
  },
  {
    id: 'Operating_time_SV_he_protection',
    label: 'Operating_time_SV_he_protection',
    align: 'left',
  },
  { id: 'Operating_time_WV', label: 'Operating_time_WV', align: 'left' },
];

export default function OperatingHoursTable() {
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
        WP_in_operation: item?.TransactionData[0]?.WP_in_operation,
        LK_in_operation: item?.TransactionData[0]?.LK_in_operation,
        ZH_in_operation: item?.TransactionData[0]?.ZH_in_operation,
        Operating_time_SV_heat_transfer: item?.TransactionData[0]?.Operating_time_SV_heat_transfer,
        Operating_time_SV_he_protection: item?.TransactionData[0]?.Operating_time_SV_he_protection,
        Operating_time_WV: item?.TransactionData[0]?.Operating_time_WV,
      }));
      console.log(data, 'dataaaaaa');
      setRows(data);
    } else {
      const data = Array.from({ length: TABLE_HEAD?.length })?.map(() => ({
        Time: <Skeleton />,
        WP_in_operation: <Skeleton />,
        LK_in_operation: <Skeleton />,
        ZH_in_operation: <Skeleton />,
        Operating_time_SV_heat_transfer: <Skeleton />,
        Operating_time_SV_he_protection: <Skeleton />,
        Operating_time_WV: <Skeleton />,
      }));
      setRows(data);
    }
  }, [reportsData, isGetReportLoading]);

  useEffect(() => {
    if (isDownloadCSVSuccess) {
      const flattenedData = downloadCSVData?.data?.rows?.map((item: any) => [
        item?.TransactionData[0]?.Time,
        item?.TransactionData[0]?.WP_in_operation,
        item?.TransactionData[0]?.LK_in_operation,
        item?.TransactionData[0]?.ZH_in_operation,
        item?.TransactionData[0]?.Operating_time_SV_heat_transfer,
        item?.TransactionData[0]?.Operating_time_SV_he_protection,
        item?.TransactionData[0]?.Operating_time_WV,
      ]);

      // Add the header row
      const csvDataArray = [
        [
          'Time',
          'WP in operation',
          'LK in operation',
          'ZH in operation',
          'Operating time SV heat transfer',
          'Operating time SV he protection',
          'Operating time WV',
        ],
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
        <title> Yields table | Soblue</title>
      </Helmet>
      <CSVLink
        data={csvData}
        filename="openinghours.csv"
        className="hidden"
        ref={csvLinkRef}
        target="_blank"
      />
      <TableComponent
        columns={TABLE_HEAD}
        rowCount={reportsData?.count}
        rows={rows}
        tableType="topic_2"
        reportType="operatingHours"
      />
    </>
  );
}
