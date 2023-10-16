import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  Typography,
  Box,
} from '@mui/material';
// routes
import moment from 'moment';
import { dispatch, useSelector } from 'src/redux/store';
import { useAuthContext } from 'src/auth/useAuthContext';
import UsersDropDown from 'src/components/all-users-dropdown';
import TableSkeleton from 'src/components/table-skeleton';

import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { IUserAccountGeneral } from '../../@types/user';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
// sections
import TableRows from './TableRows';
import { slice } from '../user/slice';
import { getAllReportsData } from '../reports/slice/action';
import { updateTemplateById, viewAllTemplate } from '../user/slice/action';
// import { checkAlermStatusApi, getAcknowledgementAPI } from './slice/action';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'template', label: 'Template', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function UserListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultRowsPerPage: 20,
  });

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const {
    viewTemplateData,
    viewTemplateLoader,
    updateTemplateByIdError,
    updateTemplateByIdMsg,
    updateTemplateByIdSuccess,
  } = useSelector((state) => state.user);

  const [tableData, setTableData] = useState(_userList);

  const [tableTemplateData, setTemplateTableData] = useState<any>([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const [refresh, setRefresh] = useState(true);

  const { user } = useAuthContext();

  const [currentSelectedUser, setCurrentSelectedUser] = useState(user?.UserId);

  const [lastLoadingTime, setLastLoadingTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    dispatch(
      viewAllTemplate()
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedUser, page, rowsPerPage, refresh, dispatch]);

  useEffect(() => {
    setTemplateTableData(viewTemplateData?.rows);
  }, [viewTemplateData]);

  useEffect(() => {
    if (updateTemplateByIdSuccess) {
      enqueueSnackbar(updateTemplateByIdMsg, {
        variant: 'success',
      });
      dispatch(viewAllTemplate());
      dispatch(slice.actions.resetUpdateTemplateById());
    }
    if (updateTemplateByIdError) {
      enqueueSnackbar(updateTemplateByIdMsg, {
        variant: 'error',
      });
      dispatch(slice.actions.resetUpdateTemplateById());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTemplateByIdSuccess, updateTemplateByIdError]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound = tableTemplateData?.rows?.length === 0;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const handleAPIs = async () => {
    await dispatch(viewAllTemplate());
    setRefresh(!refresh);
  };

  const handleToggle = (e: any, index: any, row: any) => {
    const tempData = [...tableTemplateData];
    tempData[index] = {
      ...tempData[index],
      TemplateStatus: e.target.checked,
    };
    setTemplateTableData(tempData);
    dispatch(
      updateTemplateById({
        TemplateId: row?.TemplateId,
        TemplateName: row?.TemplateName,
        TemplateStatus: e.target.checked,
      })
    );
    console.log(e.target.checked, index, 'xxx');
  };

  return (
    <>
      <Helmet>
        <title> User: List | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* {user?.UserTypeCode !== 'CU' && (
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
            gap={2}
          >
            <UsersDropDown
              size="small"
              currentSelectedUser={currentSelectedUser}
              setCurrentSelectedUser={setCurrentSelectedUser}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mi:refresh" />}
              onClick={() => handleAPIs()}
            />
          </Box>
        )} */}
        <Card>
          {/* <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          /> */}

          <TableContainer
            sx={{ position: 'relative', overflow: 'unset', maxHeight: '70vh', overflowY: 'scroll' }}
          >
            <TableSelectedAction
              // dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size="medium" sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  // onSort={onSort}
                  // onSelectAllRows={(checked) =>
                  //   onSelectAllRows(
                  //     checked,
                  //     tableData.map((row) => row.id)
                  //   )
                  // }
                />

                <TableBody>
                  {viewTemplateLoader ? (
                    <TableSkeleton colums={2} />
                  ) : (
                    (tableTemplateData || [])?.map((row: any, index: number) => (
                      <TableRows
                        key={row?.id}
                        row={row}
                        selected={selected.includes(row?.id)}
                        onSelectRow={() => onSelectRow(row?.id)}
                        onDeleteRow={() => handleDeleteRow(row?.id)}
                        onEditRow={() => handleEditRow(row?.name)}
                        handleToggle={handleToggle}
                        index={index}
                      />
                    ))
                  )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          {/* <TablePaginationCustom
            count={viewTemplateData?.count}
            page={page}
            rowsPerPageOptions={[20, 25, 50]}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            // dense={false}
            onChangeDense={onChangeDense}
          /> */}
        </Card>
        {/* {user?.UserTypeCode !== 'CU' && (
          <Typography variant="body2" mt="8px" textAlign="right" color="#637381" paragraph>
            {`Last data loaded time: ${lastLoadingTime}`}
          </Typography>
        )} */}
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}: {
  inputData: IUserAccountGeneral[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterRole: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
