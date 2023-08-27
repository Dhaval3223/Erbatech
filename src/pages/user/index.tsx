import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/auth/useAuthContext';
import * as types from 'src/pages/Roles/slice/action_type';
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
  Radio,
  TableCell,
  TableRow,
  Dialog,
  MenuItem,
} from '@mui/material';
// routes
import MenuPopover from 'src/components/menu-popover/MenuPopover';
import { useDispatch, useSelector } from 'src/redux/store';
import TableSkeleton from 'src/components/table-skeleton';
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { IUserAccountGeneral } from '../../@types/user';
// _mock_
import { _userListData } from '../../_mock/arrays';
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
import UserTableRow from './UserTableRow';
import { deleteUserById, getAllUsers, viewUserById } from './slice/action';
import UserTableToolbar from './UserTableToolbar';
import UserAddForm from './UserAddForm';
import CustomerAddForm from './CustomerAddForm';
import CustomerEditForm from './CustomerEditForm';
import UserEditForm from './UserEditForm';
import { slice } from './slice';
import Page403 from '../Page403';

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
  { id: 'name', label: 'User Name', align: 'left' },
  { id: 'role', label: 'Role Name', align: 'left' },
  { id: 'mobile', label: 'Phone Number', align: 'left' },
  { id: 'email', label: 'Email Id', align: 'left' },
  { id: 'action' },
];

const CUSTOMER_TABLE_HEAD = [
  { id: 'name', label: 'Cutomer Name', align: 'left' },
  { id: 'email', label: 'Email Id', align: 'left' },
  { id: 'mobile', label: 'Phone Number', align: 'left' },
  { id: 'role', label: 'Country', align: 'left' },
  { id: 'state', label: 'State', align: 'left' },
  { id: 'city', label: 'City', align: 'left' },
  { id: 'action', align: 'left' },
];

interface IUserListing {
  user?: boolean;
  isUpdateRights: boolean;
  isDeleteRights: boolean;
  isCreateRights: boolean;
}

// ----------------------------------------------------------------------

function UserListing({ user, isUpdateRights, isDeleteRights, isCreateRights }: IUserListing) {
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

  const dispatch = useDispatch();

  const { users, isUserLoading, viewUserData, createUserSucess, updateUserSuccess } = useSelector(
    (state) => state.user
  );

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState(_userListData);

  const [filterName, setFilterName] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  const [filterRole, setFilterRole] = useState('all');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const [openDrawer, setOpenDrawer] = useState(false);

  const [EditopenDrawer, setEditOpenDrawer] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  useEffect(() => {
    setOpenDrawer(false);
  }, []);

  useEffect(() => {
    dispatch(
      getAllUsers({
        searchValue: filterName,
        userType: user ? 'user' : 'customer',
        userRoleId: '',
        page: String(page),
        limit: String(rowsPerPage),
      })
    );
  }, [page, rowsPerPage, dispatch, filterName, user]);

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
    dispatch(deleteUserById(id));
    dispatch(
      getAllUsers({
        searchValue: filterName,
        userRoleId: '',
        userType: user ? 'user' : 'customer',
        limit: String(rowsPerPage),
        page: String(page),
      })
    );
    /* const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    } */
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));

    /* setSelected([]);
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
    } */
  };

  // useEffect(() => {
  //   if(viewUserLoading === false) {
  //     handleOpenDrawer();
  //     setIsEdit(true);
  //   }
  // },[viewUserLoading, viewUserData])

  const handleEditRow = (id: string) => {
    setEditOpenDrawer(true);
    dispatch(viewUserById(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const handleOpenDrawer = () => {
    setIsEdit(false);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    setOpenDrawer(false);
  };

  const handleEditCloseDrawer = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    setEditOpenDrawer(false);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  useEffect(() => {
    if (createUserSucess) {
      dispatch(
        getAllUsers({
          searchValue: filterName,
          userType: user ? 'user' : 'customer',
          userRoleId: '',
          page: String(page),
          limit: String(rowsPerPage),
        })
      );
      dispatch(slice.actions.resetCreateUserState());
    }
    if (updateUserSuccess) {
      dispatch(
        getAllUsers({
          searchValue: filterName,
          userType: user ? 'user' : 'customer',
          userRoleId: '',
          page: String(page),
          limit: String(rowsPerPage),
        })
      );
      dispatch(slice.actions.resetUpdateUserState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createUserSucess, updateUserSuccess]);

  const handleUpdateSubmit = () => {
    dispatch(
      getAllUsers({
        searchValue: filterName,
        userType: user ? 'user' : 'customer',
        userRoleId: '',
        page: String(page),
        limit: String(rowsPerPage),
      })
    );
  };

  return (
    <>
      <Helmet>
        {user ? <title> User: List | Soblue</title> : <title> Customer: List | Soblue</title>}
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card>
          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
            createButtonLable={user ? '+ add user' : '+ add customer'}
            handleCreateClick={handleOpenDrawer}
            isCreateButton
            isCreateRights={isCreateRights}
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
                  headLabel={user ? TABLE_HEAD : CUSTOMER_TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={selected.length}
                  // onSort={onSort}
                  /*  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  } */
                />
                <TableBody>
                  {isUserLoading ? (
                    <TableSkeleton colums={user ? 5 : 7} />
                  ) : (
                    users?.rows?.map((row) => (
                      <UserTableRow
                        key={row.UserId}
                        row={row}
                        selected={selected.includes(row.UserId)}
                        onSelectRow={() => onSelectRow(row.UserId)}
                        onEditRow={() => handleEditRow(row.UserId)}
                        onDeleteRow={() => handleDeleteRow(row.UserId)}
                        user={user}
                        isDeleteRights={isDeleteRights}
                        isUpdateRights={isUpdateRights}
                      />
                    ))
                  )}
                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, users.rows.length)}
                  /> */}
                  {!isUserLoading && <TableNoData isNotFound={users?.rows?.length === 0} />}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={users?.count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      {openDrawer && (
        <Dialog
          open={openDrawer}
          onClose={handleCloseDrawer}
          // aria-labelledby="parent-modal-title"
          // aria-describedby="parent-modal-description"
        >
          {user ? (
            <UserAddForm currentUser={viewUserData} user={user} onClose={handleCloseDrawer} />
          ) : (
            <CustomerAddForm currentUser={viewUserData} onClose={handleCloseDrawer} />
          )}
        </Dialog>
      )}

      {EditopenDrawer && (
        <Dialog
          open={EditopenDrawer}
          onClose={handleEditCloseDrawer}
          // aria-labelledby="parent-modal-title"
          // aria-describedby="parent-modal-description"
        >
          {user ? (
            <UserEditForm
              isEdit={isEdit}
              currentUser={viewUserData}
              user={user}
              onClose={handleEditCloseDrawer}
              handleUpdateSubmit={handleUpdateSubmit}
            />
          ) : (
            <CustomerEditForm
              isEdit={isEdit}
              currentUser={viewUserData}
              onClose={handleEditCloseDrawer}
              handleUpdateSubmit={handleUpdateSubmit}
            />
          )}
        </Dialog>
      )}

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            // onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

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
              // dispatch(deleteUserById(id));
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

export default function UserListinge({ user = false }: { user?: boolean }) {
  const { accessControlCRUD } = useAuthContext();

  const {
    isView: isUserView,
    isCreate: isUserCreate,
    isDelete: isUserDelete,
    isUpdate: isUserUpdate,
  } = accessControlCRUD[types.PG003] || {};

  const {
    isView: isCustomerView,
    isCreate: isCustomerCreate,
    isDelete: isCustomerDelete,
    isUpdate: isCustomerUpdate,
  } = accessControlCRUD[types.PG004] || {};

  if (user) {
    return isUserView ? (
      <UserListing
        user={user}
        isUpdateRights={isUserUpdate}
        isDeleteRights={isUserDelete}
        isCreateRights={isUserCreate}
      />
    ) : (
      <Page403 />
    );
  }
  return isCustomerView ? (
    <UserListing
      user={user}
      isUpdateRights={isCustomerUpdate}
      isDeleteRights={isCustomerDelete}
      isCreateRights={isCustomerCreate}
    />
  ) : (
    <Page403 />
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

  /*  if (filterStatus !== 'all') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  } */

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
