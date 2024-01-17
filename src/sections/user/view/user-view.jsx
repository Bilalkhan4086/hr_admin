import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import UserData from 'src/services/httpRequests';
// import { users } from 'src/_mock/user';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import BarLoader from 'react-spinners/BarLoader';
import { useTheme } from '@mui/material/styles';
// import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
// import { emptyRows, applyFilter, getComparator } from '../utils';
import setupApiInterceptor from 'src/services/httpRequests';
import { BaseURL } from 'src/utils/BaseURL/URL';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState(null);
  const theme = useTheme();

  // useEffect(() => {
  //   UserData()
  //     .then((data) => setUserData(data.data.users))
  //     .catch((error) => {
  //       console.error('Error in AnotherComponent:', error);
  //     });
  // }, []);

  console.log('++++++>>>>>>>', userData?.length);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData?.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // const dataFiltered = applyFilter({
  //   inputData: userData,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  console.log('the user data for the user  is ', userData);

  const fetchData = async () => {
    try {
      // Call setupApiInterceptor and wait for the result
      const responseData = await setupApiInterceptor(`${BaseURL}/users`);
      console.log('Data received:', responseData);
      setUserData(responseData.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('the user data is ', userData);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button
          sx={{
            boxShadow: theme.shadows[20],
          }}
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            {userData === null ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '50vh',
                  width: '100%',
                }}
              >
                <BarLoader color="#5141df" height={10} width={250} />
              </div>
            ) : (
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  // order={order}
                  // orderBy={orderBy}
                  rowCount={userData?.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'dateofjoining', label: 'Joining Date' },
                    { id: 'email', label: 'E-mail' },

                    { id: '' },
                  ]}
                />

                {userData &&
                  userData.map((data) => (
                    <TableBody key={data.id}>
                      <UserTableRow
                        key={data.id}
                        name={data.username}
                        date_joined={data.date_joined}
                        email={data.email}
                        avatarURL={data.profilePictureURL}
                        selected={selected.indexOf(data.username) !== -1}
                        handleClick={(event) => handleClick(event, data.username)}
                      />
                      {/* ))} */}

                      <TableEmptyRows
                        height={77}
                        // emptyRows={emptyRows(page, rowsPerPage, userData?.length)}
                      />

                      {/* {notFound && <TableNoData query={filterName} />} */}
                    </TableBody>
                  ))}
              </Table>
            )}
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={userData?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
