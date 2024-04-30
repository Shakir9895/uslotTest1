import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths, uslotPath } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { RouterLink } from 'src/routes/components';
// _mock
import { _userList, _roles, USER_STATUS_OPTIONS, USER_MANAGEMENT_STATUS_OPTIONS } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
// types
import { IUserItem, IUserTableFilters, IUserTableFilterValue } from 'src/types/user';
//

import UserTableFiltersResult from 'src/sections/user/user-table-filters-result';
import UserManagementTableToolbar from '../../usermanagement/usermgmt-table-toolbar';
import UsermngntTableHeadCustom from '../../usermanagement/usermanagmt-table-head-custom';

import BatchDetailsTableRow from './user-managment-table-row';
import { Icon, Stack, Typography } from '@mui/material';



// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All Users' }, ...USER_MANAGEMENT_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'no', label: 'No' },
  { id: 'fullname', label: 'FullName', width: 180 },
  { id: 'admissionno', label: 'Admission No', width: 220 },
  { id: 'class', label: 'Class', width: 180 },
  { id: 'rating', label: 'Rating', width: 100 },
  { id: 'report', label: 'Report', width: 100 },
  { id: 'score', label: 'Score', width: 100 },
  { id: '', width: 88 },
];

const defaultFilters: IUserTableFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function BatchDetailsListView() {


  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_userList);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id?: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id?: string) => {
      router.push(uslotPath.edit(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);





  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Batch Details"
          links={[
            { name: 'Dashboard', href: "" },
            { name: 'User ', href: "" },
            { name: 'Account ' },
          ]}

          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card >
          <Stack direction={'column'}>
            <Typography variant='h6'>Batch Name</Typography>
            <Stack direction={'row'}>
              <Iconify icon="icon-park-outline:dot" sx={{
                color: "green"
              }} />
              <Typography variant='subtitle2' color={'green'}>Completed</Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} my={2}>
            <Stack direction={'row'}  width={"50%"}  mb={1}>
              <Iconify icon="basil:bag-solid" sx={{color:"gray"}}/>
              <Typography variant='subtitle2' color={'gray'}>Starting Date : 08/05/2024</Typography>
            </Stack>

            <Stack direction={'row'} width={"50%"} mb={1}>
              <Iconify icon="basil:bag-solid" sx={{color:"gray"}}/>
              <Typography variant='subtitle2' color={'gray'}>Ending Date : 08/05/2024</Typography>
            </Stack>

            <Stack direction={'row'} width={"50%"}  mb={1}>
              <Iconify icon="material-symbols-light:book-sharp" sx={{color:"gray"}}/>
              <Typography variant='subtitle2' color={'gray'}> Course Type :Extra Caricular</Typography>
            </Stack>
            <Stack direction={'row'} width={"50%"}  mb={1}>
              <Iconify icon="charm:stack" sx={{color:"gray"}}/>
              <Typography variant='subtitle2' color={'gray'}> Subject : Coding</Typography>
            </Stack>
            <Stack direction={'row'} width={"50%"}  mb={1}>
              <Iconify icon="mdi:clock-time-five" sx={{color:"gray"}}/>
              <Typography variant='subtitle2' color={'gray'}>Batch Time : Morning</Typography>
            </Stack>

          </Stack>
        </Card>


        <Card >

          <Typography variant='h6'>Student List</Typography>

          {/* UserManagementTableToolbar */}
          <UserManagementTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <UsermngntTableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />



                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <BatchDetailsTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id || "")}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
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
  filters,
}: {
  inputData: IUserItem[];
  comparator: (a: any, b: any) => number;
  filters: IUserTableFilters;
}) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}