import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { Skeleton } from '@mui/material';
import TableComponent from '../TableComponent';

const TABLE_HEAD = [
  { id: 'SK_heat', label: 'SK_heat', align: 'left' },
  { id: 'PVA_yield', label: 'PVA_yield', align: 'left' },
  { id: 'SK_heat_tot', label: 'SK_heat_tot', align: 'left' },
  { id: 'PVA_yield_tot', label: 'PVA_yield_tot', align: 'left' },
];

export default function YieldTable() {
  const { isGetReportLoading, reportsData } = useSelector((state) => state.report);

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    if (!isGetReportLoading) {
      const data = reportsData?.rows?.map((item: any) => ({
        SK_heat: item?.TransactionData[0]?.SK_heat,
        PVA_yield: item?.TransactionData[0]?.PVA_yield,
        SK_heat_tot: item?.TransactionData[0]?.SK_heat_tot,
        PVA_yield_tot: item?.TransactionData[0]?.PVA_yield_tot,
      }));
      setRows(data);
    } else {
      const data = Array.from({ length: TABLE_HEAD?.length })?.map(() => ({
        SK_heat: <Skeleton />,
        PVA_yield: <Skeleton />,
        SK_heat_tot: <Skeleton />,
        PVA_yield_tot: <Skeleton />,
      }));
      setRows(data);
    }
  }, [reportsData, isGetReportLoading]);

  return (
    <TableComponent
      columns={TABLE_HEAD}
      rowCount={reportsData?.count}
      rows={rows}
      tableType="topic_2"
    />
  );
}
