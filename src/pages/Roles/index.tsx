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
  Dialog,
  TextField,
} from '@mui/material';
// routes
import { IconButtonAnimate } from 'src/components/animate';
import { debounce } from 'lodash';
import { LoadingButton } from '@mui/lab';
import TableSkeleton from 'src/components/table-skeleton';
import { useSnackbar } from 'src/components/snackbar';
import { useDispatch, useSelector } from '../../redux/store';
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
import { UserTableToolbar, UserTableRow } from './exports';
import { createNewRole, deleteRoleById, getAllRoles } from './slice/action';
import { getAllUsers } from '../user/slice/action';
import { slice } from './slice';

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
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: '' },
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
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { rolesData, isRolesLoading, isCreateRoleLoading, isDeleteRoleError, isDeleteRoleSuccess, isDeleteRoleMsg, isCreateRoleError, isCreateRoleSuccess, createRoleMsg } = useSelector(
    (state) => state.roles
  );

  const { users, isUserLoading } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState(_userList);

  const [filterName, setFilterName] = useState('');
  
  const [filterRole, setFilterRole] = useState('');
  
  const [openConfirm, setOpenConfirm] = useState(false);
  
  const [filterStatus, setFilterStatus] = useState('all');

  const [openDrawer, setOpenDrawer] = useState(false);

  const [roleError, setRoleError] = useState(false);

  const [rolesDropdownData, setRolesDropdownData] = useState<any[]>([]);

  const [role, setRole] = useState({
    RoleName: ''
  });

  useEffect(() => {
    // dispatch(getAllRoles())
    dispatch(getAllRoles({
      searchValue: "",
      type: '',
      // userType: "",
      // userRoleId: "",
      page: "0",
      limit: "5",
    }));
  }, [dispatch])

  useEffect(() => {
    setRolesDropdownData(rolesData?.rows);
  }, [rolesData])

  useEffect(() => {
    if (isDeleteRoleSuccess) {
      enqueueSnackbar(isDeleteRoleMsg, {
        variant: 'success',
      });
      dispatch(slice.actions.resetDeleteRoleEventError());
      dispatch(getAllRoles({
        searchValue: filterName,
        type: '',
        // userType: filterStatus,
        // userRoleId: filterRole,
        page: String(page),
        limit: String(rowsPerPage),
      }));
    } 
    if (isDeleteRoleError) {
      enqueueSnackbar(isDeleteRoleMsg, {
        variant: 'error',
      });
      dispatch(slice.actions.resetDeleteRoleEventError());
    }
    if (isCreateRoleSuccess) {
      enqueueSnackbar(createRoleMsg, {
        variant: 'success',
      });
      dispatch(slice.actions.resetCreateRoleState());
      setRole({
        RoleName: ''
      });
      dispatch(getAllRoles({
        searchValue: filterName,
        type: '',
        // userRoleId: filterRole,
        page: String(page),
        limit: String(rowsPerPage),
      }));
    }
    if (isCreateRoleError) {
      enqueueSnackbar(createRoleMsg, {
        variant: 'error',
      });
      dispatch(slice.actions.resetCreateRoleState());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteRoleError, isDeleteRoleSuccess, isCreateRoleError, isCreateRoleSuccess])

  useEffect(() => {
    dispatch(getAllRoles({
      searchValue: filterName,
      type: '',
      // userRoleId: filterRole,
      page: String(page),
      limit: String(rowsPerPage),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, filterName, filterStatus, filterRole])

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterRole,
    filterName,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== '' || filterStatus !== 'all';

  // const isNotFound =
  //   (!dataFiltered.length && !!filterName) ||
  //   (!dataFiltered.length && !!filterRole) ||
  //   (!dataFiltered.length && !!filterStatus);

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
  
  // const debouncedOnChange = debounce(handleFilterName, 500);


  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (data: any) => {
    console.log(data?.Role?.RoleId);
    dispatch(deleteRoleById(data?.Role?.RoleId));
    // const deleteRow = tableData.filter((row) => row.id !== id);
    // setSelected([]);
    // setTableData(deleteRow);

    // if (page > 0) {
    //   if (dataInPage.length < 2) {
    //     setPage(page - 1);
    //   }
    // }
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
    setFilterRole('');
    setFilterStatus('all');
  };

  const handleCreateRoleClick = () => {
    setOpenDrawer(true);
  }

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleCreateRoleAPI = () => {
    if (role.RoleName === '') {
      setRoleError(true);
      return;
    }
    dispatch(createNewRole(role));
  }

  return (
    <>
      <Helmet>
        <title> Role: List | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card>
          <Divider />
          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={rolesDropdownData}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
            handleCreateClick={handleCreateRoleClick}
            setRole={setRole}
            role={role}
            handleCreateRoleAPI={handleCreateRoleAPI}
            roleError={roleError}
            setRoleError={setRoleError}
          />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
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
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                  {isRolesLoading && <TableSkeleton colums={3}/>}
                  {!isRolesLoading && rolesData?.rows?.map((row, index) => (
                      <UserTableRow
                        key={index}
                        row={row}
                        selected={selected.includes('1')}
                        onSelectRow={() => onSelectRow('1')}
                        onDeleteRow={() => handleDeleteRow(row)}
                        onEditRow={() => handleEditRow('1')}
                      />
                    ))}
                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  /> */}
                  <TableNoData isNotFound={rolesData?.rows?.length === 0} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={rolesData?.count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
      <Dialog
        open={openDrawer}
        onClose={handleCloseDrawer}
        // aria-labelledby="parent-modal-title"
        // aria-describedby="parent-modal-description"
        >
        <Card sx={{ p: 3 }}>
          <TextField
            fullWidth
            name="Role"
            label="Role Name"
            sx={{
              maxWidth: { sm: 240 },
              textTransform: 'capitalize',
            }}
            onChange={e => {
              setRole({
              RoleName: e.target.value
            })
          }}
          />
          {/* <IconButtonAnimate 
            color="primary"
            size="large" 
            onClick={() => {
              dispatch(createNewRole(role))
            }}
          > */}
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isCreateRoleLoading}
              onClick={() => {
                dispatch(createNewRole(role))
              }}
            >
              <Iconify icon="eva:plus-fill" width={24} />
            </LoadingButton>
          {/* </IconButtonAnimate> */}
        </Card>
      </Dialog>

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
              console.log(selected, 'ddd')
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
  filterRole,
}: {
  inputData: IUserAccountGeneral[];
  comparator: (a: any, b: any) => number;
  filterName: string;
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

  // if (filterStatus !== 'all') {
  //   inputData = inputData.filter((user) => user.status === filterStatus);
  // }

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
