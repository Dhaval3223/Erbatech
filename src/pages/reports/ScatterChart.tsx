import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import TableComponent from './TableComponent';

const TABLE_HEAD = [
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'role1', label: 'Role 1', align: 'left' },
  { id: '' },
];
const rows = [
  {
    role1: 'role1',
    role: 'test',
  },
  {
    role: 'role',
    role1: 'test',
  },
  {
    role: 'role',
    role1: 'test',
  },
  {
    role: 'role',
    role1: 'test',
  },
  {
    role: 'role',
    role1: 'test',
  },
  {
    role: 'role',
    role1: 'test',
  },
  {
    role: 'role',
    role1: 'test',
  },
  {
    role: 'role',
    role1: 'test',
  },
  {
    id: 'role1',
    value: 'test 2',
  },
];
export default function ScatterChart() {
  return <TableComponent columns={TABLE_HEAD} rowCount={10} rows={rows} />;
}
