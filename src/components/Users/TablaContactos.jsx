import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';

export const TablaContactos = ({ usuarios }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer className='rounded-xl' style={{ maxWidth: 2000 }}>

            <Table className='table-styles'>

                <TableHead className='bg-gray-800 border-b-4 border-gray-900'>
                    <TableRow>
                        <TableCell className='text-center' style={{ color: 'rgb(20 184 166)', fontWeight: 'bold' }}>NOMBRE</TableCell>
                        <TableCell className='' style={{ color: 'rgb(20 184 166)', fontWeight: 'bold' }}>FECHA FINALIZACION</TableCell>
                        <TableCell className='text-center' style={{ color: 'rgb(20 184 166)', fontWeight: 'bold' }}>ACTIVO</TableCell>
                        <TableCell className='text-center d-md-none d-lg-block' style={{ color: 'rgb(20 184 166)', fontWeight: 'bold' }}>TIPO LICENCIA</TableCell>
                        <TableCell className='text-center' style={{ color: 'rgb(20 184 166)', fontWeight: 'bold' }}>ACCIONES</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className='bg-gray-800'>
                    {usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row._id}>

                            <TableCell>
                                <Typography><span className='text-gray-100 text-xl ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>{row.nombre}</span></Typography>
                                <Typography><span className='text-indigo-300 text-lg ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>{row.correo}</span></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography className='text-white' style={{ fontFamily: 'Josefin Sans' }}>
                                    <span className='text-xl'>
                                        {
                                            (row.fechas.finalizacion === '-')
                                                ? <>Vitalicio</>
                                                :
                                                (
                                                    row.fechas.finalizacion[8] + row.fechas.finalizacion[9] + '/' +
                                                    row.fechas.finalizacion[5] + row.fechas.finalizacion[6] + '/' +
                                                    row.fechas.finalizacion[0] + row.fechas.finalizacion[1] + row.fechas.finalizacion[2] + row.fechas.finalizacion[3]
                                                )
                                        }
                                    </span>
                                </Typography>
                            </TableCell>
                            <TableCell className='text-center'>
                                <Typography
                                    style={{
                                        backgroundColor:
                                            (
                                                (row.licencia.activa === true && '#60A917') ||
                                                (row.licencia.activa === false && '#D80073')
                                            ),
                                        fontWeight: 'normal',
                                        color: 'white',
                                        fontSize: '1rem',
                                        borderRadius: 15,
                                        padding: '7px 15px',
                                        display: 'inline-block',
                                        fontFamily: 'Josefin Sans'
                                    }}
                                ></Typography>
                            </TableCell>
                            <TableCell className='text-center'>
                                <Typography
                                    style={{
                                        backgroundColor:
                                            (
                                                (row.licencia.tipo === 'PA' && '#5EEAD4') ||
                                                (row.licencia.tipo === 'PV' && '#FD8469')
                                            ),
                                        fontWeight: 'normal',
                                        color: 'white',
                                        fontSize: '1rem',
                                        borderRadius: 15,
                                        padding: '7px 15px',
                                        display: 'inline-block',
                                        fontFamily: 'Josefin Sans'
                                    }}
                                >{row.licencia.tipo}</Typography>
                            </TableCell>
                            <TableCell className='text-center'>
                                <Link
                                    className='btn bg-indigo-600 text-gray-200 hover:bg-indigo-800 hover:text-gray-200'
                                    style={{ fontFamily: 'Josefin Sans' }}
                                    to={`/con/${row._id}`}
                                > Administrar
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow className='border-t-4 border-gray-900'>
                        <TablePagination
                            rowsPerPageOptions={[3, 5, 10, 15]}
                            count={usuarios.length}
                            rowsPerPage={rowsPerPage}
                            component='td'
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>

                </TableBody>

            </Table>

        </TableContainer>
    )
}