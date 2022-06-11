import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Toast } from '../../helpers/Toast';

export const PeticionScreen = () => {

    const { id } = useParams();
    const [peticion, setPeticion] = useState({});
    const [idUser, setIdUser] = useState('');

    useEffect(() => {
        axios.get(`https://backend-invergo-production.up.railway.app/peticiones/${id}`).then((resp) => {
            setPeticion(resp.data[0]);
            setIdUser(resp.data[1]);
        });
    }, [id]);

    const handleEndPeticion = () => {

        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido).toISOString();
        const fechaFinal = hoy[0] + hoy[1] + hoy[2] + hoy[3] + '-' + hoy[5] + hoy[6] + '-' + hoy[8] + hoy[9]

        const peticionEdit = {
            _id: peticion._id,
            nombre: peticion.nombre,
            correo: peticion.correo,
            tipoLicencia: peticion.tipoLicencia,
            fechas: {
                newFechaFin: peticion.newFechaFin,
                accion: fechaFinal
            },
            estado: true,
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción Actualizara la Peticion como Atendida y Finalizada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Actualizar',
            cancelButtonText: 'No, Cancelar',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {

                axios.put(`https://backend-invergo-production.up.railway.app/peticiones/${id}`, peticionEdit).then((resp) => {

                    Toast.fire({ icon: 'success', title: 'Peticion Actualizada, Recuerda enviar un correo avisando al usuario' }).then(() => {
                        /*                         setTimeout(() => {
                                                    window.location.reload();
                                                }, 1100); */
                        window.location.reload();
                    });
                });
            }
        });
    }

    return (
        <div className='container mt-5 mb-3'>


            <div className='row flex justify-between'>
                <div className='col-9 mt-4'>
                    <h1 className='text-3xl text-gray-200'> Pantalla Administracion de Peticion </h1>
                </div>
                <div className='col-3'>
                    {
                        (!peticion.estado)
                        &&
                        (
                            <button
                                className="p-3 rounded-lg bg-red-900 text-gray-100 mb-3 w-100 hover:bg-teal-900 hover:text-gray-300 mt-1"
                                onClick={handleEndPeticion}
                            >
                                <p className="font-medium text-xl">Finalizar Peticion</p>
                            </button>
                        )
                    }
                </div>
            </div>

            <div className="relative flex items-center">
                <div className="flex-grow border-t border-indigo-400"></div>
                <div className="flex-grow border-t border-indigo-400"></div>
            </div>

            {/* CONTENIDO */}

            <div className='mt-4 bg-gray-800 rounded-2xl p-4'>
                <div className='row flex justify-between'>

                    {/* FORMULARIOS */}

                    <div className='col-5'>
                        <div className='col-12 text-center'>
                            <div className="form-outline form-white mb-4">
                                <span className="fs-5 text-gray-300">Nombre y Apellidos</span>
                                <input
                                    type="text" value={peticion.nombre} disabled
                                    className="form-control form-control-lg text-center mt-2"
                                />
                            </div>
                        </div>

                        <div className='col-12 text-center'>
                            <div className="form-outline form-white mb-4">
                                <span className="fs-5 text-gray-300">Correo Electronico</span>
                                <input
                                    type="email" value={peticion.correo} disabled
                                    className="form-control form-control-lg text-center mt-2"
                                />
                            </div>
                        </div>

                    </div>

                    {/* PLANES */}

                    <>
                        {
                            (peticion.estado)
                                ?
                                (
                                    <div className='col-6'>

                                        {
                                            (peticion.tipoLicencia === 'PA')
                                                ?
                                                (
                                                    <div className='row'>
                                                        <div className='col-12 text-center'>
                                                            <p className='text-gray-200 text-2xl mt-2'> El usuario solicito Ampliacion Anual </p>
                                                            <p className='text-teal-300 text-2xl mt-3'> Pago $150 </p>
                                                            <p className='text-cyan-300 text-2xl mt-3'> Fecha de Accion : {peticion.fechas.accion} </p>
                                                        </div>

                                                        <div className="relative flex mt-3 items-center">
                                                            <div className="flex-grow border-t border-indigo-400"></div>
                                                            <div className="flex-grow border-t border-indigo-400"></div>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='row flex justify-center'>
                                                        <div className='col-12 text-center'>
                                                            <p className='text-gray-200 text-2xl mt-2'> El usuario solicito Ampliacion Vitalicia </p>
                                                            <p className='text-teal-300 text-2xl mt-3'> Pago $450 </p>
                                                            <p className='text-cyan-300 text-2xl mt-3'> Fecha de Accion : {peticion.fechas.accion} </p>
                                                        </div>
                                                        <div className="relative flex mt-3 items-center">
                                                            <div className="flex-grow border-t border-indigo-400"></div>
                                                            <div className="flex-grow border-t border-indigo-400"></div>
                                                        </div>
                                                    </div>
                                                )
                                        }

                                        {/* BOTON ADMINISTRACION */}

                                        <div className='col-12 mt-4 text-center'>
                                            <Link
                                                className='btn p-3 mt-2 rounded-xl bg-indigo-600 text-gray-200 hover:bg-indigo-800 hover:text-gray-200'
                                                style={{ fontFamily: 'Josefin Sans' }}
                                                to={`/con/${idUser}`}
                                            >
                                                Ir Hacia el Usuario
                                            </Link>
                                        </div>

                                    </div>
                                )
                                :
                                (
                                    <div className='col-6'>

                                        {
                                            (peticion.tipoLicencia === 'PA')
                                                ?
                                                (
                                                    <div className='row'>
                                                        <div className='col-12 text-center'>
                                                            <p className='text-gray-200 text-3xl mt-2'> Solicita Ampliacion Anual </p>
                                                            <p className='text-cyan-200 text-2xl mt-3'> Nueva Fecha Fin: {peticion.fechas.newFechaFin} </p>
                                                            <p className='text-teal-300 text-2xl mt-3'> Debe Pagar $150 </p>
                                                        </div>

                                                        <div className="relative flex mt-3 items-center">
                                                            <div className="flex-grow border-t border-indigo-400"></div>
                                                            <div className="flex-grow border-t border-indigo-400"></div>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='row flex justify-center'>
                                                        <div className='col-12 text-center'>
                                                            <p className='text-gray-200 text-3xl mt-2'> Solicita Ampliacion Vitalicia </p>
                                                            <p className='text-teal-300 text-2xl mt-3'> Debe Pagar $450 </p>
                                                        </div>
                                                        <div className="relative flex mt-3 items-center">
                                                            <div className="flex-grow border-t border-indigo-400"></div>
                                                            <div className="flex-grow border-t border-indigo-400"></div>
                                                        </div>
                                                    </div>
                                                )
                                        }

                                        {/* BOTON ADMINISTRACION */}

                                        <div className='col-12 mt-4 text-center'>
                                            <Link
                                                className='btn p-3 mt-2 rounded-xl bg-indigo-600 text-gray-200 hover:bg-indigo-800 hover:text-gray-200'
                                                style={{ fontFamily: 'Josefin Sans' }}
                                                to={`/con/${idUser}`}
                                            >
                                                Ir Hacia el Usuario
                                            </Link>
                                        </div>

                                    </div>
                                )
                        }
                    </>

                </div>
            </div>

        </div>
    )
}