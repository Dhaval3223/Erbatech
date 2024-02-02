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
  { id: 'T_backfeed_prim_SV', label: 'T_backfeed_prim_SV', align: 'left' },
  { id: 'T_backfeed_sec_SV', label: 'T_backfeed_sec_SV', align: 'left' },
  { id: 'T_tank', label: 'T_tank', align: 'left' },
  { id: 'T_tank_2', label: 'T_tank_2', align: 'left' },
  { id: 'f_pump', label: 'f_pump', align: 'left' },
];

export default function SvHeatTransferTable() {
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
    setCSVdata(csvData);
  }, [csvData]);

  useEffect(() => {
    if (!isGetReportLoading) {
      const data = reportsData?.rows?.map((item: any) => ({
        Time: item?.TransactionData[0]?.Time,
        T_backfeed_prim_SV: item?.TransactionData[0]?.T_backfeed_prim_SV,
        T_backfeed_sec_SV: item?.TransactionData[0]?.T_backfeed_sec_SV,
        T_tank: item?.TransactionData[0]?.T_tank,
        T_tank_2: item?.TransactionData[0]?.T_tank_2,
        f_pump: item?.TransactionData[0]?.f_pump,
      }));
      console.log(data, 'dataaaaaa');
      setRows(data);
    } else {
      const data = Array.from({ length: TABLE_HEAD?.length })?.map(() => ({
        Time: <Skeleton />,
        T_backfeed_prim_SV: <Skeleton />,
        T_backfeed_sec_SV: <Skeleton />,
        T_tank: <Skeleton />,
        T_tank_2: <Skeleton />,
        f_pump: <Skeleton />,
      }));
      setRows(data);
    }
  }, [reportsData, isGetReportLoading]);

  // useEffect(() => {
  //   if (isDownloadCSVSuccess) {
  //     const flattenedData = downloadCSVData?.data?.rows?.map((item: any) => [
  //       item?.TransactionData[0]?.Time,
  //       item?.TransactionData[0]?.T_backfeed_prim_SV,
  //       item?.TransactionData[0]?.T_backfeed_sec_SV,
  //       item?.TransactionData[0]?.T_tank,
  //       item?.TransactionData[0]?.T_tank_2,
  //       item?.TransactionData[0]?.f_pump,
  //     ]);

  //     // Add the header row
  //     const csvDataArray = [
  //       ['Time', 'T backfeed prim SV', 'T backfeed sec SV', 'T tank', 'T tank 2', 'f pump'],
  //       ...flattenedData,
  //     ];

  //     // Set the CSV data when the component mounts
  //     setCSVdata(csvDataArray);

  //     csvLinkRef?.current?.link.click();

  //     dispatch(slice.actions.clearGetReportErrState());
  //   }

  //   if (isDownloadCSVError) {
  //     enqueueSnackbar(downloadCSVMsg, {
  //       variant: 'error',
  //     });
  //     dispatch(slice.actions.clearGetReportErrState());
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isDownloadCSVSuccess, isDownloadCSVError]);

  return (
    <>
      <Helmet>
        <title> SV heat transfer table | Soblue</title>
      </Helmet>
      <CSVLink
        data={csvData}
        filename="svheattransfer.csv"
        className="hidden"
        ref={csvLinkRef}
        target="_blank"
      />
      <TableComponent
        columns={TABLE_HEAD}
        rowCount={reportsData?.count}
        rows={rows}
        tableType="topic_2"
        reportType="sv_heat_transfer"
      />
    </>
  );
}
