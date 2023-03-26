import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCountries } from './reduxSlice/countrySlice';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

 
export function AllCountry() {
  const {allCountriesData}= useSelector((state) =>state.countries )
  const dispatch = useDispatch();
   useEffect(() => {
    dispatch(fetchCountries());
   }, [dispatch]);
   //creating table
   const columns = [
    { id: 'flag', label: 'Flag', minWidth: 150 },
    { id: 'name', label: 'Name', minWidth: 150 }, 
    {id: 'population',label: 'Population',minWidth:150},
    {id: 'region',label: 'Region',minWidth: 100},
    {id: 'languages',label: 'Languages',minWidth: 100},
    {id: 'favorite',minWidth:100},
    {id: 'detail',minWidth: 100}  
  ];
  function createData(flag, name, population, region,languages,favorite,detail) {
    
    return { flag,name, population,region,languages,favorite,detail };
  }
  const rows = allCountriesData.map((country)=>{
    const languageKey = country.languages ? Object.keys(country.languages) : []
    const languages=languageKey.map((key)=>country?.languages[key])
    return createData(country.flags.png,country.name.common,country.population,country.region,languages,'favorite','details');
  })

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log(row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      switch(column.id) {
                        case 'flag':
                            return (
                                <TableCell key={column.id} >
                                  <img src={value} alt={value} />  
                                </TableCell>
                            );
                        case 'languages':
                            return (
                                <TableCell key={column.id} >
                                  <ul>
                                    {value?.map((language) => <li>{language}</li>)}
                                  </ul>
                                </TableCell>
                            );
                        case 'favorite':
                            return (
                                <TableCell key={column.id} >
                                  <FavoriteIcon color='primary'/>
                                </TableCell>
                            );
                        case 'detail':
                            return (
                                <TableCell key={column.id} >
                                  <ArrowForwardIosIcon/>
                                </TableCell>
                            );

                        default:
                            return (
                                <TableCell key={column.id} >
                                  {value}  
                                </TableCell>
                            );
                      }
                      
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default AllCountry;