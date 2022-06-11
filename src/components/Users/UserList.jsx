import { useEffect, useState } from 'react'
import { TablaContactos } from './TablaContactos';
import { getUsuariosByEmail, ordenarUsuariosByFecha } from '../../helpers/Selectores';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

export const UserList = () => {

    const [listUsuarios, setListUsuarios] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/usuarios").then((resp) => {
            setListUsuarios(ordenarUsuariosByFecha(resp.data));
        });
    }, []);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    const clientesFilter = getUsuariosByEmail(search, listUsuarios);

    return (
        <div className='container-fluid mt-5 mb-5'>

            <h1 className='text-3xl text-gray-200'> Listado de Usuarios </h1>

            <div className="relative flex mt-3 items-center">
                <div className="flex-grow border-t border-indigo-400"></div>
                <div className="flex-grow border-t border-indigo-400"></div>
            </div>

            {
                (listUsuarios.length !== 0)
                    ?
                    (
                        <div>

                            <div className='row me-4 mt-4 d-flex justify-content-end'>

                                <div className='col-2'>
                                    <span className='fs-2 text-gray-200'>Buscar</span>
                                </div>

                                <div className='col-4 ms-3'>
                                    <input
                                        type="text" autoComplete='off' placeholder='Correo'
                                        className="form-control form-control-lg text-center bg-dark text-white"
                                        name='search' value={search} onChange={handleInputChange}
                                    />
                                </div>

                            </div>

                            <div className='me-3 mt-4'>

                                {
                                    (search === '') && <TablaContactos usuarios={listUsuarios} />
                                }
                                {
                                    (search !== '' && clientesFilter.length !== 0) && <TablaContactos usuarios={clientesFilter} />
                                }
                                {
                                    (search !== '' && clientesFilter.length === 0) &&
                                    (
                                        <div className='container mt-5 p-3 bg-danger rounded-2xl'>
                                            <h2 className='text-center mt-2 fst-italic text-white'>
                                                No Existe el cliente que buscas
                                            </h2>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='container mt-5 p-4 bg-dark rounded-2xl'>
                            <h2 className='text-center mt-2 fst-italic text-white'>
                                El sistema Actualmente no Posee Clientes Registrados..
                            </h2>
                        </div>
                    )
            }

        </div>
    )
}