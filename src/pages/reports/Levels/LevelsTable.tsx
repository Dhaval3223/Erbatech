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
  { id: 'p_buffer_tank', label: 'p_buffer_tank', align: 'left' },
  { id: 'p_roof', label: 'p_roof', align: 'left' },
];

export default function LevelsTable() {
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
        p_buffer_tank: item?.TransactionData[0]?.p_buffer_tank,
        p_roof: item?.TransactionData[0]?.p_roof,
      }));
      console.log(data, 'dataaaaaa');
      setRows(data);
    } else {
      const data = Array.from({ length: TABLE_HEAD?.length })?.map(() => ({
        p_buffer_tank: <Skeleton />,
        p_roof: <Skeleton />,
      }));
      setRows(data);
    }
  }, [reportsData, isGetReportLoading]);

  // useEffect(() => {
  //   if (isDownloadCSVSuccess) {
  //     const flattenedData = downloadCSVData?.data?.rows?.map((item: any) => [
  //       item?.TransactionData[0]?.p_buffer_tank,
  //       item?.TransactionData[0]?.p_roof,
  //     ]);

  //     // Add the header row
  //     const csvDataArray = [['p_buffer_tank', 'p_roof'], ...flattenedData];

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
        <title> Yields table | Soblue</title>
      </Helmet>
      <CSVLink
        data={csvData}
        filename="levels.csv"
        className="hidden"
        ref={csvLinkRef}
        target="_blank"
      />
      <TableComponent
        columns={TABLE_HEAD}
        rowCount={reportsData?.count}
        rows={rows}
        tableType="topic_2"
        reportType="levels"
      />
    </>
  );
}
