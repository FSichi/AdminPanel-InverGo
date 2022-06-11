import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { updateUserInfoDB } from '../../redux/actions/auth';
import axios from 'axios';

export const UserScreen = () => {

    const dispatch = useDispatch();

    const { id } = useParams();
    const [user, setUser] = useState({});
    const [regActivo, setRegActivo] = useState({});

    const [licenciaState, setLicenciaState] = useState(false);
    const [changePlan, setChangePlan] = useState('');
    const [editarState, setEditarState] = useState(false);
    const [render, setRender] = useState(false);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        axios.get(`https://backend-invergo-production.up.railway.app/usuarios/${id}`).then((resp) => {
            setUser(resp.data);
            setLicenciaState(resp.data.licencia.activa);

            (resp.data.licencia.tipo === 'PV') ? setChangePlan('PV') : setChangePlan('PA');

            axios.get("https://backend-invergo-production.up.railway.app/registros/estado/activo").then((resp) => {
                setRegActivo(resp.data);
                setRender(true);
            });
        });
    }, [id]);

    const onSubmit = (data) => {

        var tipoLic = '';
        var fechaFin = '';

        if (changePlan === 'PA') {
            tipoLic = 'PA';
            fechaFin = data.fin
        } else {
            tipoLic = 'PV';
            fechaFin = '';
        }

        var usuario = {
            _id: user._id,
            nombre: data.nombre,
            correo: data.correo,
            telefono: data.phone,
            fechas: {
                inicio: data.inicio,
                finalizacion: fechaFin
            },
            licencia: {
                tipo: tipoLic,
                activa: licenciaState
            },
            uidFirebase: user.uidFirebase
        }

        var regModify = {
            _id: regActivo._id,
            estado: regActivo.estado,
            cantidadLicencias: {
                anuales: regActivo.cantidadLicencias.anuales,
                vitalicias: regActivo.cantidadLicencias.vitalicias
            },
            registro: {
                dineroTotal: regActivo.registro.dineroTotal,
                fechaPago: regActivo.registro.fechaPago
            }
        }

        if (tipoLic === 'PA' && tipoLic !== user.tipoLicencia) {
            regModify.cantidadLicencias.anuales = parseInt(regModify.cantidadLicencias.anuales) + 1;
            regModify.cantidadLicencias.vitalicias = parseInt(regModify.cantidadLicencias.vitalicias) - 1;
            regModify.registro.dineroTotal = parseInt(regModify.registro.dineroTotal) - 300;
        }

        if (tipoLic === 'PV' && tipoLic !== user.tipoLicencia) {
            regModify.cantidadLicencias.vitalicias = parseInt(regModify.cantidadLicencias.vitalicias) + 1;
            regModify.cantidadLicencias.anuales = parseInt(regModify.cantidadLicencias.anuales) - 1;
            regModify.registro.dineroTotal = parseInt(regModify.registro.dineroTotal) + 300;
        }

        dispatch(updateUserInfoDB(usuario, regModify));
    }

    return (
        <div className='container mt-5 mb-3'>

            {
                (!editarState)
                    ? <h1 className='text-3xl text-gray-200'> Pantalla Administracion de Usuario - <span className='text-teal-300'>Visualizacion </span> </h1>
                    : <h1 className='text-3xl text-gray-200'> Pantalla Administracion de Usuario - <span className='text-teal-300'>Edicion </span> </h1>
            }

            <div className="relative flex mt-3 items-center">
                <div className="flex-grow border-t border-indigo-400"></div>
                <div className="flex-grow border-t border-indigo-400"></div>
            </div>

            {
                (render)
                &&
                (
                    <>
                        {
                            (!editarState)
                                ?
                                (
                                    <div className='mt-4 bg-gray-800 rounded-2xl p-4'>
                                        <div className='row flex justify-between'>

                                            {/* FORMULARIOS */}

                                            <div className='col-5'>
                                                <div className='col-12 text-center'>
                                                    <div className="form-outline form-white mb-4">
                                                        <span className="fs-5 text-gray-300">Nombre y Apellidos</span>
                                                        <input
                                                            type="text" value={user.nombre} disabled
                                                            className="form-control form-control-lg text-center mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className='col-12 text-center'>
                                                    <div className="form-outline form-white mb-4">
                                                        <span className="fs-5 text-gray-300">Correo Electronico</span>
                                                        <input
                                                            type="email" value={user.correo} disabled
                                                            className="form-control form-control-lg text-center mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className='col-12 text-center'>
                                                    <div className="form-outline form-white mb-4">
                                                        <span className="fs-5 text-gray-300">Telefono</span>
                                                        <input
                                                            type="email" disabled value={user.telefono}
                                                            className="form-control form-control-lg text-center mt-2"
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            {/* PLANES */}

                                            <div className='col-6'>

                                                {
                                                    (user.licencia.tipo === 'PA')
                                                        ?
                                                        (
                                                            <div className='row'>

                                                                <div className='col-12 text-center'>
                                                                    <p className='text-teal-300 text-3xl mt-2 '> Posee Plan Anual </p>
                                                                </div>

                                                                <div className='col-12 text-center mt-3'>
                                                                    <div className='row'>
                                                                        <div className='col-6'>
                                                                            <div className="form-outline form-white mb-4">
                                                                                <span className="fs-5 text-gray-300">Inicio</span>
                                                                                <input
                                                                                    type="date" name='fechaI' value={user.fechas.inicio} disabled autoComplete='off'
                                                                                    className="form-control form-control-lg text-center mt-1"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className='col-6'>
                                                                            <div className="form-outline form-white mb-4">
                                                                                <span className="fs-5 text-gray-300">Finalizacion</span>
                                                                                <input
                                                                                    type="date" name='fechaF' value={user.fechas.finalizacion} autoComplete='off' disabled
                                                                                    className="form-control form-control-lg text-center mt-1"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div className='row flex justify-center'>

                                                                <div className='col-12 text-center'>
                                                                    <p className='text-teal-300 text-3xl mt-2 '> Posee Plan Vitalicio </p>
                                                                </div>

                                                                <div className='col-8 text-center mt-3'>
                                                                    <div className="form-outline form-white mb-4">
                                                                        <span className="fs-5 text-gray-300">Inicio</span>
                                                                        <input
                                                                            type="date" name='fechaI' value={user.fechas.inicio} autoComplete='off' disabled
                                                                            className="form-control form-control-lg text-center mt-1"
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                }

                                                {/* LICENCIAS Y BOTON EDICION */}

                                                <div className='row flex justify-center'>
                                                    <div className='col-12 text-center'>
                                                        {
                                                            (user.licencia.activa === true)
                                                                ? <p className='text-blue-600 text-2xl mt-3'> Licencia Actualmente Activa </p>
                                                                : <p className='text-red-300 text-2xl mt-3'> Licencia Actualmente Inactiva </p>
                                                        }
                                                    </div>
                                                    <div className='col-12 mt-4 text-center'>
                                                        <button
                                                            className="p-3 rounded-lg bg-indigo-900 text-gray-100 mb-3 w-50 hover:bg-indigo-600 hover:text-gray-200 mt-1"
                                                            onClick={() => setEditarState(true)}
                                                        >
                                                            <p className="font-medium text-xl">Editar</p>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='col-12  mt-2'>
                                                <p className='text-teal-300 text-3xl mt-2 '> Uid - Firebase : <span className='text-2xl text-gray-200'>{user.uidFirebase}</span> </p>
                                            </div>

                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div className="mt-4 bg-gray-800 rounded-2xl p-4">

                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className='row flex justify-between'>

                                                {/* FORMULARIO */}

                                                <div className='col-5'>

                                                    <div className='col-12'>
                                                        <div className="form-outline form-white mb-4">
                                                            <span className="fs-5 text-gray-300">Nombre y Apellidos</span>
                                                            <input
                                                                type="text" defaultValue={user.nombre} {...register("nombre")}
                                                                className="form-control form-control-lg text-center mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='col-12'>
                                                        <div className="form-outline form-white mb-4">
                                                            <span className="fs-5 text-gray-300">Correo Electronico</span>
                                                            <input
                                                                type="email" defaultValue={user.correo} {...register("correo")}
                                                                className="form-control form-control-lg text-center mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='col-12'>
                                                        <div className="form-outline form-white">
                                                            <span className="fs-5 text-gray-300">Telefono</span>
                                                            <input
                                                                type="text" defaultValue={user.telefono} {...register("phone")}
                                                                className="form-control form-control-lg text-center mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* PLANES Y LICENCIA */}

                                                <div className='col-6'>

                                                    {/* BOTONES - ANUAL Y VITALICIO */}

                                                    <div className='col-12'>
                                                        <div className='row mt-1 flex justify-center'>
                                                            <div className='col-5 ms-4'>
                                                                <button type='button' className="p-3 rounded-lg bg-gray-900 text-teal-300 mb-3 w-100 hover:bg-indigo-600 hover:text-gray-200" onClick={() => { setChangePlan('PA') }}>
                                                                    <p className="font-medium text-xl">Anual</p>
                                                                </button>
                                                            </div>
                                                            <div className='col-5 ms-4'>
                                                                <button type='button' className="p-3 rounded-lg bg-gray-900 text-teal-300 mb-3 w-100 hover:bg-indigo-600 hover:text-gray-200" onClick={() => { setChangePlan('PV') }}>
                                                                    <p className="font-medium text-xl">Vitalicio</p>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='bg-gray-900 rounded-2xl p-3'>
                                                        {
                                                            (changePlan === 'PA')
                                                                ?
                                                                (
                                                                    <div className='row'>

                                                                        <div className='col-12 text-center'>
                                                                            <p className='text-teal-300 text-2xl mt-2'> Seleccionaste Plan Anual </p>
                                                                        </div>

                                                                        <div className='col-12 mt-3'>
                                                                            <div className='row'>
                                                                                <div className='col-6 text-center'>
                                                                                    <div className="form-outline form-white mb-4">
                                                                                        <span className="fs-5 text-gray-300">Inicio</span>
                                                                                        <input
                                                                                            type="date" defaultValue={user.fechas.inicio} {...register("inicio")}
                                                                                            className="form-control text-center mt-1"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-6 text-center'>
                                                                                    <div className="form-outline form-white mb-4">
                                                                                        <span className="fs-5 text-gray-300">Finalizacion</span>
                                                                                        <input
                                                                                            type="date" defaultValue={user.fechas.finalizacion} {...register("fin")}
                                                                                            className="form-control text-center mt-1"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )
                                                                :
                                                                (
                                                                    <div className='row flex justify-center'>

                                                                        <div className='col-12 text-center'>
                                                                            <p className='text-teal-300 text-2xl mt-2'> Seleccionaste Plan Vitalicio </p>
                                                                        </div>

                                                                        <div className='col-8 text-center mt-2'>
                                                                            <div className="form-outline form-white mb-4">
                                                                                <span className="fs-5 text-gray-300">Inicio</span>
                                                                                <input
                                                                                    type="date" defaultValue={user.fechas.inicio} {...register("inicio")}
                                                                                    className="form-control form-control-lg text-center mt-1"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )
                                                        }

                                                    </div>

                                                    {/* SWITCH */}

                                                    <div className='col-12'>
                                                        <div className='bg-gray-900 rounded-2xl p-3 mt-3'>

                                                            {
                                                                (licenciaState)
                                                                    ?
                                                                    (
                                                                        <div className="flex items-center gap-8 justify-center">
                                                                            <label className="inline-flex items-center">
                                                                                <input type="radio" name="vehicle" className="h-5 w-5 text-red-600" defaultChecked />
                                                                                <span className="ml-2 text-gray-200">
                                                                                    Licencia Activa
                                                                                </span>
                                                                            </label>
                                                                            <label className="inline-flex items-center">
                                                                                <input type="radio" name="vehicle" className="h-5 w-5 text-red-600" onClick={() => { setLicenciaState(false) }} />
                                                                                <span className="ml-2 text-gray-200">
                                                                                    Licencia Inactiva
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                    :
                                                                    (
                                                                        <div className="flex items-center gap-8 justify-center">
                                                                            <label className="inline-flex items-center">
                                                                                <input type="radio" name="vehicle" className="h-5 w-5 text-red-600" onClick={() => { setLicenciaState(true) }} />
                                                                                <span className="ml-2 text-gray-200">
                                                                                    Licencia Activa
                                                                                </span>
                                                                            </label>
                                                                            <label className="inline-flex items-center">
                                                                                <input type="radio" name="vehicle" className="h-5 w-5 text-red-600" defaultChecked />
                                                                                <span className="ml-2 text-gray-200">
                                                                                    Licencia Inactiva
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    )
                                                            }

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            {/* BOTONES CANCELAR Y CONFIRMAR */}

                                            <div className='row'>

                                                <div className='col-2'>
                                                    <button
                                                        className="p-3 rounded-lg bg-red-900 text-gray-100 mb-3 w-100 hover:bg-gray-900 hover:text-teal-300 mt-1"
                                                        onClick={() => setEditarState(false)}
                                                        type='button'
                                                    >
                                                        <p className="font-medium text-xl">Cancelar</p>
                                                    </button>
                                                </div>

                                                <div className='col-2'>
                                                    <button
                                                        className="p-3 rounded-lg bg-blue-900 text-gray-100 mb-3 w-100 hover:bg-gray-900 hover:text-teal-300 mt-1"
                                                        type='submit'
                                                    >
                                                        <p className="font-medium text-xl">Confirmar</p>
                                                    </button>
                                                </div>

                                            </div>

                                        </form>

                                    </div>
                                )
                        }
                    </>
                )
            }

        </div>
    )
}