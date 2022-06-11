import { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';


export const TablaHistorial = ({ registros }) => {

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
                        <TableCell className='text-center' style={{ color: '#E5E7EB', fontWeight: 'bold' }}>ESTADO</TableCell>
                        <TableCell className='text-center' style={{ color: '#E5E7EB', fontWeight: 'bold' }}>ANUALES</TableCell>
                        <TableCell className='text-center' style={{ color: '#E5E7EB', fontWeight: 'bold' }}>VITALICIOS</TableCell>
                        <TableCell className='text-center d-md-none d-lg-block' style={{ color: '#E5E7EB', fontWeight: 'bold' }}>DINERO TOTAL</TableCell>
                        <TableCell className='text-center' style={{ color: '#E5E7EB', fontWeight: 'bold' }}>FACUNDO</TableCell>
                        <TableCell className='text-center' style={{ color: '#E5E7EB', fontWeight: 'bold' }}>MATEO</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className='bg-gray-800'>
                    {registros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row._id}>

                            <TableCell className='text-center'>
                                <Typography
                                    style={{
                                        backgroundColor:
                                            (
                                                (row.estado === true && '#5EEAD4') ||
                                                (row.estado === false && '#FD8469')
                                            ),
                                        fontWeight: 'normal',
                                        color: 'white',
                                        fontSize: '1rem',
                                        borderRadius: 15,
                                        padding: '7px 15px',
                                        display: 'inline-block',
                                        fontFamily: 'Josefin Sans'
                                    }}
                                >
                                    {
                                        (row.estado === true)
                                            ? <span className='text-gray-900'>Activo</span>
                                            : <span className='text-gray-900'>Inactivo</span>
                                    }
                                </Typography>
                                <Typography><span className='text-gray-400 text-md' style={{ fontFamily: 'Josefin Sans' }}>
                                    {
                                        (row.registro.fechaPago === '-')
                                            ? <>-</>
                                            :
                                            (
                                                row.registro.fechaPago[8] + row.registro.fechaPago[9] + '/' +
                                                row.registro.fechaPago[5] + row.registro.fechaPago[6] + '/' +
                                                row.registro.fechaPago[0] + row.registro.fechaPago[1] + row.registro.fechaPago[2] + row.registro.fechaPago[3]
                                            )
                                    }
                                </span></Typography>
                            </TableCell>

                            <TableCell className='text-center'>
                                <Typography><span className='text-gray-100 text-xl ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>{row.cantidadLicencias.anuales}</span></Typography>
                                <Typography><span className='text-teal-600 text-lg ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>$ {(row.cantidadLicencias.anuales * 150)}</span></Typography>
                            </TableCell>

                            <TableCell className='text-center'>
                                <Typography><span className='text-gray-100 text-xl ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>{row.cantidadLicencias.vitalicias}</span></Typography>
                                <Typography><span className='text-teal-600 text-lg ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>$ {(row.cantidadLicencias.vitalicias * 450)}</span></Typography>
                            </TableCell>

                            <TableCell className='text-center'>
                                <Typography><span className='text-gray-200 text-xl ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>$ {row.registro.dineroTotal}</span></Typography>
                            </TableCell>

                            <TableCell className='text-center'>
                                <Typography><span className='text-gray-200 text-xl ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>$ {row.registro.dineroTotal * 0.8}</span></Typography>
                            </TableCell>

                            <TableCell className='text-center'>
                                <Typography><span className='text-gray-200 text-xl ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>$ {row.registro.dineroTotal * 0.2}</span></Typography>
                            </TableCell>

                        </TableRow>
                    ))}

                    <TableRow className='border-t-4 border-gray-900'>
                        <TablePagination
                            rowsPerPageOptions={[3, 5, 10, 15]}
                            count={registros.length}
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