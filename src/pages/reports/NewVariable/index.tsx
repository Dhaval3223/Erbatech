/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { Skeleton, Typography } from '@mui/material';
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
  { id: 'Irradiation', label: 'Irradiation', align: 'left' },
  { id: 'Wind_speed', label: 'Wind_speed', align: 'left' },
  { id: 'T_outside', label: 'T_outside', align: 'left' },
  { id: 'T_tank', label: 'T_tank', align: 'left' },
  { id: 'T_tank_2', label: 'T_tank_2', align: 'left' },
  { id: 'T_coll_surface', label: 'T_coll_surface', align: 'left' },
  { id: 'T_coll_backfeed', label: 'T_coll_backfeed', align: 'left' },
  { id: 'T_coll_infeed', label: 'T_coll_infeed', align: 'left' },
  { id: 'f_pump', label: 'f_pump', align: 'left' },
  { id: 'f_cal_full', label: 'f_cal_full', align: 'left' },
  { id: 'f_cal_overflow', label: 'f_cal_overflow', align: 'left' },
  { id: 'p_roof', label: 'p_roof', align: 'left' },
  { id: 'p_buffer_tank', label: 'p_buffer_tank', align: 'left' },
  { id: 'T_backfeed_prim_SV', label: 'T_backfeed_prim_SV', align: 'left' },
  { id: 'T_backfeed_sec_SV', label: 'T_backfeed_sec_SV', align: 'left' },
  { id: 'T_top_strat_tank', label: 'T_top_strat_tank', align: 'left' },
  { id: 'T_bottom_strat_tank', label: 'T_bottom_strat_tank', align: 'left' },
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

export default function NewVariable() {
  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const csvLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  const [csvData, setCSVdata] = useState<any>([]);

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    if (!isGetReportLoading) {
      const data = reportsData?.rows?.map((item: any) => ({
        time: <Typography minWidth="160px">{item?.TransactionData[0]?.Time}</Typography>,
        SK_heat: item?.TransactionData[0]?.SK_heat,
        PVA_yield: item?.TransactionData[0]?.PVA_yield,
        SK_heat_tot: item?.TransactionData[0]?.SK_heat_tot,
        PVA_yield_tot: item?.TransactionData[0]?.PVA_yield_tot,
        Irradiation: item?.TransactionData[0]?.Irradiation,
        Wind_speed: item?.TransactionData[0]?.Wind_speed,
        T_outside: item?.TransactionData[0]?.T_outside,
        T_tank: item?.TransactionData[0]?.T_tank,
        T_tank_2: item?.TransactionData[0]?.T_tank_2,
        T_coll_surface: item?.TransactionData[0]?.T_coll_surface,
        T_coll_backfeed: item?.TransactionData[0]?.T_coll_backfeed,
        T_coll_infeed: item?.TransactionData[0]?.T_coll_infeed,
        f_pump: item?.TransactionData[0]?.f_pump,
        f_cal_full: item?.TransactionData[0]?.f_cal_full,
        f_cal_overflow: item?.TransactionData[0]?.f_cal_overflow,
        p_roof: item?.TransactionData[0]?.p_roof,
        p_buffer_tank: item?.TransactionData[0]?.p_buffer_tank,
        T_backfeed_prim_SV: item?.TransactionData[0]?.T_backfeed_prim_SV,
        T_backfeed_sec_SV: item?.TransactionData[0]?.T_backfeed_sec_SV,
        T_top_strat_tank: item?.TransactionData[0]?.T_top_strat_tank,
        T_bottom_strat_tank: item?.TransactionData[0]?.T_bottom_strat_tank,
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
        time: <Skeleton />,
        SK_heat: <Skeleton />,
        PVA_yield: <Skeleton />,
        SK_heat_tot: <Skeleton />,
        PVA_yield_tot: <Skeleton />,
        Irradiation: <Skeleton />,
        Wind_speed: <Skeleton />,
        T_outside: <Skeleton />,
        T_tank: <Skeleton />,
        T_tank_2: <Skeleton />,
        T_coll_surface: <Skeleton />,
        T_coll_backfeed: <Skeleton />,
        T_coll_infeed: <Skeleton />,
        f_pump: <Skeleton />,
        f_cal_full: <Skeleton />,
        f_cal_overflow: <Skeleton />,
        p_roof: <Skeleton />,
        p_buffer_tank: <Skeleton />,
        T_backfeed_prim_SV: <Skeleton />,
        T_backfeed_sec_SV: <Skeleton />,
        T_top_strat_tank: <Skeleton />,
        T_bottom_strat_tank: <Skeleton />,
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

  return (
    <>
      <Helmet>
        <title> New variable table | Soblue</title>
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
        reportType="all_variables"
      />
    </>
  );
}
