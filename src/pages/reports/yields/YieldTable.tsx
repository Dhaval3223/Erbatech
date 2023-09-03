import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { Skeleton } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import TableComponent from '../TableComponent';

const TABLE_HEAD = [
  { id: 'time', label: 'Time', align: 'left' },
  { id: 'SK_heat', label: 'SK heat', align: 'left' },
  { id: 'PVA_yield', label: 'PVA yield', align: 'left' },
  { id: 'SK_heat_tot', label: 'SK heat tot', align: 'left' },
  { id: 'PVA_yield_tot', label: 'PVA yield tot', align: 'left' },
];
export default function YieldTable() {
  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

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

  return (
    <>
      <Helmet>
        <title> Yields table | Soblue</title>
      </Helmet>
      <TableComponent
        columns={TABLE_HEAD}
        rowCount={reportsData?.count}
        rows={rows}
        tableType="topic_2"
      />
    </>
  );
}
