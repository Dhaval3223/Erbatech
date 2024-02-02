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
  { id: 'time', label: 'Time', align: 'left' },
  { id: 'SK_heat', label: 'SK heat', align: 'left' },
  { id: 'PVA_yield', label: 'PVA yield', align: 'left' },
  { id: 'SK_heat_tot', label: 'SK heat tot', align: 'left' },
  { id: 'PVA_yield_tot', label: 'PVA yield tot', align: 'left' },
];

export default function YieldTable() {
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
        time: item?.TransactionData[0]?.Time,
        SK_heat: item?.TransactionData[0]?.SK_heat,
        PVA_yield: item?.TransactionData[0]?.PVA_yield,
        SK_heat_tot: item?.TransactionData[0]?.SK_heat_tot,
        PVA_yield_tot: item?.TransactionData[0]?.PVA_yield_tot,
      }));
      console.log(data, 'dataaaaaa');
      setRows(data);
    } else {
      const data = Array.from({ length: TABLE_HEAD?.length })?.map(() => ({
        time: <Skeleton />,
        SK_heat: <Skeleton />,
        PVA_yield: <Skeleton />,
        SK_heat_tot: <Skeleton />,
        PVA_yield_tot: <Skeleton />,
      }));
      setRows(data);
    }
  }, [reportsData, isGetReportLoading]);

  useEffect(() => {
    if (isDownloadCSVSuccess) {
      const flattenedData = downloadCSVData?.data?.rows?.map((item: any) => [
        item?.TransactionData[0]?.Time,
        item?.TransactionData[0]?.SK_heat,
        item?.TransactionData[0]?.PVA_yield,
        item?.TransactionData[0]?.SK_heat_tot,
        item?.TransactionData[0]?.PVA_yield_tot,
      ]);

      console.log('flattenedData', flattenedData);

      // Add the header row
      const csvDataArray = [
        ['Time', 'SK heat', 'PVA yield', 'SK heat tot', 'PVA yield tot'],
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
        filename="yeild.csv"
        className="hidden"
        ref={csvLinkRef}
        target="_blank"
      />
      <TableComponent
        columns={TABLE_HEAD}
        rowCount={reportsData?.count}
        rows={rows}
        tableType="topic_2"
        reportType="yeild"
      />
    </>
  );
}
