import { useEffect, useState } from 'react'
import axios from 'axios';
import { ordenarRegistrosByEstado } from '../../helpers/Selectores';
import { Toast } from '../../helpers/Toast';
import { TablaHistorial } from './TablaHistorial';

export const Commerce = () => {

    const [listOfRegistros, setListOfRegistros] = useState([]);
    const [registroActivoInfo, setRegistroActivoInfo] = useState({});

    const [viewState, setViewState] = useState(false);
    const [charged, setCharged] = useState(false);

    useEffect(() => {
        axios.get("https://backend-invergo-production.up.railway.app/registros").then((resp) => {
            setListOfRegistros(ordenarRegistrosByEstado(resp.data));
        });
        axios.get("https://backend-invergo-production.up.railway.app/registros/dash/all").then((resp) => {
            setRegistroActivoInfo(resp.data);
            setCharged(true);
        });
    }, []);

    const handleEndRegister = () => {

        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido).toISOString();
        const fechaFinal = hoy[0] + hoy[1] + hoy[2] + hoy[3] + '-' + hoy[5] + hoy[6] + '-' + hoy[8] + hoy[9]

        var regOld = {
            _id: registroActivoInfo[0]._id,
            estado: false,
            cantidadLicencias: {
                anuales: registroActivoInfo[0].cantidadLicencias.anuales,
                vitalicias: registroActivoInfo[0].cantidadLicencias.vitalicias
            },
            registro: {
                dineroTotal: registroActivoInfo[0].registro.dineroTotal,
                fechaPago: fechaFinal
            }
        }

        var regNuevo = {
            estado: true,
            cantidadLicencias: {
                anuales: '0',
                vitalicias: '0',
            },
            registro: {
                dineroTotal: '0',
                fechaPago: '-',
            }
        }

        axios.put(`https://backend-invergo-production.up.railway.app/registros/${registroActivoInfo[0]._id}`, regOld);

        axios.post("https://backend-invergo-production.up.railway.app/registros", regNuevo).then((resp) => {
            Toast.fire({ icon: 'success', title: 'Registro Finalizado Con Exito. Se ha creado un nuevo Registro.' }).then(() => {
                /*                 setTimeout(() => {
                                    window.location.reload();
                                }, 1100); */
                window.location.reload();
            });
        });

    }

    return (
        <div className='container text-gray-100 mt-5'>

            {
                (charged)
                &&
                (
                    <>
                        {/* TITULO Y BOTONES [ FINALIZAR Y HISTORIAL ] */}

                        <div className='row flex justify-between'>
                            <div className='col-5 mt-3'>
                                <h1 className='text-3xl text-gray-200'> Registro de Dinero </h1>
                            </div>
                            <div className='col-6'>
                                <div className='row'>

                                    <div className='col-6'>
                                        <button
                                            className="p-3 rounded-lg bg-red-900 text-gray-100 mb-3 w-100 hover:bg-teal-900 hover:text-gray-300 mt-1"
                                            onClick={() => handleEndRegister()}
                                        >
                                            <p className="font-medium text-xl">Finalizar Registro</p>
                                        </button>
                                    </div>

                                    <div className='col-6'>
                                        <button
                                            className="p-3 rounded-lg bg-blue-900 text-gray-100 mb-3 w-100 hover:bg-indigo-900 hover:text-gray-100 mt-1"
                                            onClick={() => setViewState(!viewState)}
                                        >
                                            <p className="font-medium text-xl">Historial</p>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="relative flex mt-1 items-center">
                            <div className="flex-grow border-t border-indigo-400"></div>
                            <div className="flex-grow border-t border-indigo-400"></div>
                        </div>

                        <>

                            {
                                (!viewState)
                                    ?
                                    (
                                        <>
                                            {/* CARDS */}

                                            <div className='row mt-4 flex justify-center'>

                                                <div className='col-4'>
                                                    <div className="shadow-lg rounded-2xl w-100 p-3 bg-gray-800 ">
                                                        <p className="text-2xl text-gray-200 text-center"> Registro Actual</p>
                                                        <div className="flex flex-col justify-start">
                                                            <p className="text-2xl text-cyan-300 text-center font-bold my-2">
                                                                {
                                                                    parseInt(registroActivoInfo[0].cantidadLicencias.anuales) +
                                                                    parseInt(registroActivoInfo[0].cantidadLicencias.vitalicias)
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-4'>
                                                    <div className="shadow-lg rounded-2xl w-100 p-3 bg-gray-800 ">
                                                        <p className="text-2xl text-gray-200 text-center"> Licencias Anuales </p>
                                                        <div className="flex flex-col justify-start">
                                                            <p className="text-2xl text-green-300 text-center font-bold my-2">
                                                                {registroActivoInfo[0].cantidadLicencias.anuales}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-4'>
                                                    <div className="shadow-lg rounded-2xl w-100 p-3 bg-gray-800 ">
                                                        <p className="text-2xl text-gray-200 text-center"> Licencias Vitalicia</p>
                                                        <div className="flex flex-col justify-start">
                                                            <p className="text-2xl text-indigo-300 text-center font-bold my-2">
                                                                {registroActivoInfo[0].cantidadLicencias.vitalicias}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* CARDS 2 */}

                                            <div className='row mt-4'>

                                                <div className='col-4'>
                                                    <div className="shadow-lg rounded-xl p-6 bg-gray-800 relative overflow-hidden">
                                                        <p className="text-white text-xl">
                                                            Distribución Ganancias
                                                        </p>
                                                        <div className="flex items-center my-4 text-blue-500 rounded justify-between">
                                                            <span className="rounded-lg p-2 bg-white">
                                                                <svg width="30" height="30" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            <div className="flex flex-col w-full ml-5 items-start justify-evenly">
                                                                <p className="text-white text-2xl">
                                                                    $ {registroActivoInfo[1]}
                                                                </p>
                                                                <p className="text-blue-200 text-lg">
                                                                    Licencias Anuales
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center text-blue-500 rounded justify-between">
                                                            <span className="rounded-lg p-2 bg-white">
                                                                <svg width="30" height="30" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                                                                    </path>
                                                                </svg>
                                                            </span>
                                                            <div className="flex flex-col w-full ml-5 items-start justify-evenly">
                                                                <p className="text-white text-2xl">
                                                                    $ {registroActivoInfo[2]}
                                                                </p>
                                                                <p className="text-blue-200 text-lg">
                                                                    Licencias Vitalicias
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-8'>

                                                    <div className="bg-gray-800 overflow-hidden shadow rounded-2xl w-100 h-100 relative">
                                                        <img src="https://img.clankapp.com/symbol/btc.svg" alt="btc logo" className="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4" />
                                                        <div className="px-4 py-4">
                                                            <dl>
                                                                <p className="text-4xl font-medium text-gray-300">
                                                                    Ganacias Totales
                                                                </p>
                                                                <dd className="mt-3 text-3xl font-semibold text-teal-300">
                                                                    $ {registroActivoInfo[3]}
                                                                </dd>
                                                                <div className="shadow-lg rounded-2xl p-1 bg-gray-900 mt-2">
                                                                    <div className='row'>
                                                                        <div className='col-6'>
                                                                            <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                                                                                <span className="rounded-lg p-2 bg-white ml-5">
                                                                                    <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                                                                                        </path>
                                                                                    </svg>
                                                                                </span>
                                                                                <div className="flex flex-col w-full ml-5 items-start justify-evenly">
                                                                                    <p className="text-white text-xl">
                                                                                        $ {registroActivoInfo[4]}
                                                                                    </p>
                                                                                    <p className="text-blue-200 text-lg">
                                                                                        Facundo
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-6'>
                                                                            <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                                                                                <span className="rounded-lg p-2 bg-white ml-5">
                                                                                    <svg width="25" height="25" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                                                                                        </path>
                                                                                    </svg>
                                                                                </span>
                                                                                <div className="flex flex-col w-full ml-5 items-start justify-evenly">
                                                                                    <p className="text-white text-xl">
                                                                                        $ {registroActivoInfo[5]}
                                                                                    </p>
                                                                                    <p className="text-blue-200 text-lg">
                                                                                        Mateo
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </dl>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </>
                                    )
                                    :
                                    (
                                        <div className='mt-5'>
                                            <TablaHistorial registros={listOfRegistros} />
                                        </div>
                                    )
                            }
                        </>
                    </>
                )
            }

        </div>
    )
}