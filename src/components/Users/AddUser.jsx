import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../redux/actions/auth';
import validator from 'validator'
import axios from 'axios';

export const AddUser = () => {

    const dispatch = useDispatch();

    const [changePlan, setChangePlan] = useState(true);
    const [regActivo, setRegActivo] = useState({});

    useEffect(() => {
        axios.get("http://localhost:4000/registros/estado/activo").then((resp) => {
            setRegActivo(resp.data);
        });
    }, []);

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        phone: '',
        fechaInicio: '',
        fechaFinalizacion: '',
    });

    const { name, email, phone, fechaInicio, fechaFinalizacion } = formValues;

    const handleRegister = (e) => {

        var tipoLic = '';
        var fechaFin = '';

        if (changePlan) {
            tipoLic = 'PA';
            fechaFin = fechaFinalizacion
        } else {
            tipoLic = 'PV';
            fechaFin = '';
        }

        var usuario = {
            nombre: name,
            correo: email,
            telefono: phone,
            fechas: {
                inicio: fechaInicio,
                finalizacion: fechaFin
            },
            licencia: {
                tipo: tipoLic,
                activa: true
            }
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

        if (tipoLic === 'PA') {
            regModify.cantidadLicencias.anuales = parseInt(regModify.cantidadLicencias.anuales) + 1;
            regModify.registro.dineroTotal = parseInt(regModify.registro.dineroTotal) + 150;
        } else {
            regModify.cantidadLicencias.vitalicias = parseInt(regModify.cantidadLicencias.vitalicias) + 1;
            regModify.registro.dineroTotal = parseInt(regModify.registro.dineroTotal) + 450;
        }

        if (isFormValid()) {
            axios.put(`http://localhost:4000/registros/${regActivo._id}`, regModify).then(() => {
                dispatch(startRegisterWithEmailPasswordName(email, name, usuario));
            });
        }
    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            return false;
        } else if (!validator.isEmail(email)) {
            return false;
        }

        return true;
    }

    return (
        <div className='container mt-5 mb-3'>

            <h1 className='text-3xl text-gray-200'> Agregar un Usuario </h1>

            <div className="relative flex mt-3 items-center">
                <div className="flex-grow border-t border-indigo-400"></div>
                <div className="flex-grow border-t border-indigo-400"></div>
            </div>

            <div className="mt-4 bg-gray-800 rounded-2xl p-4">

                <div className='row flex justify-between'>

                    {/* FORMULARIO */}

                    <div className='col-7'>

                        <div className='row'>

                            {/* NOMBRE Y AP */}

                            <div className='col-12'>
                                <div className="form-outline form-white mb-4">
                                    <span className="fs-5 text-gray-300">Nombre y Apellidos</span>
                                    <input
                                        type="text" autoComplete='off' placeholder='Nombre...'
                                        className="form-control form-control-lg text-center mt-2"
                                        name='name' value={name} onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* CORREO */}

                            <div className='col-7'>
                                <div className="form-outline form-white mb-4">
                                    <span className="fs-5 text-gray-300">Correo Electronico</span>
                                    <input
                                        type="email" autoComplete='off' placeholder='Correo Electronico'
                                        className="form-control form-control-lg text-center mt-2"
                                        name='email' value={email} onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className='col-5'>
                                <div className="form-outline form-white mb-4">
                                    <span className="fs-5 text-gray-300">Telefono</span>
                                    <input
                                        type="email" autoComplete='off' placeholder='Telefono...'
                                        className="form-control form-control-lg text-center mt-2"
                                        name='phone' value={phone} onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* BOTONES */}

                    <div className='col-4 mt-4 me-4 bg-cyan-900 rounded-2xl'>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <button
                                    className="p-3 rounded-lg bg-gray-900 text-teal-300 mb-4 w-100 hover:bg-indigo-600 hover:text-gray-200"
                                    onClick={() => { setChangePlan(true) }}
                                >
                                    <p className="font-medium text-xl">Anual</p>
                                </button>
                            </div>
                            <div className='col-12'>
                                <button
                                    className="p-3 rounded-lg bg-gray-900 text-teal-300 w-100 hover:bg-indigo-600 hover:text-gray-200"
                                    onClick={() => { setChangePlan(false) }}
                                >
                                    <p className="font-medium text-xl">Vitalicio</p>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* TIPO DE PLAN */}

                <div className='mt-2'>
                    {
                        (changePlan)
                            ?
                            (
                                <>
                                    <p className='text-teal-300 text-2xl'> Seleccionaste Plan Anual </p>

                                    <div className='row mt-3'>
                                        <div className='col-4'>
                                            <div className="form-outline form-white mb-4">
                                                <span className="fs-5 text-gray-300">Fecha de Inicio</span>
                                                <input
                                                    type="date" autoComplete='off'
                                                    className="form-control form-control-lg text-center mt-1"
                                                    name='fechaInicio' value={fechaInicio} onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="form-outline form-white mb-4">
                                                <span className="fs-5 text-gray-300">Fecha de Finalizacion</span>
                                                <input
                                                    type="date" autoComplete='off'
                                                    className="form-control form-control-lg text-center mt-1"
                                                    name='fechaFinalizacion' value={fechaFinalizacion} onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4 mt-4 text-center'>
                                            <button className="p-3 rounded-lg bg-indigo-900 text-gray-100 mb-3 w-75 hover:bg-indigo-600 hover:text-gray-200 mt-1" onClick={() => { handleRegister() }}>
                                                <p className="font-medium text-xl">Registrar</p>
                                            </button>
                                        </div>
                                    </div>

                                </>
                            )
                            :
                            (
                                <>
                                    <p className='text-teal-300 text-2xl'> Seleccionaste Plan Vitalicio </p>

                                    <div className='row mt-3 flex justify-between'>
                                        <div className='col-6'>
                                            <div className="form-outline form-white mb-4">
                                                <span className="fs-5 text-gray-300">Fecha de Inicio</span>
                                                <input
                                                    type="date" autoComplete='off'
                                                    className="form-control form-control-lg text-center mt-1"
                                                    name='fechaInicio' value={fechaInicio} onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-4 mt-4'>
                                            <button className="p-3 rounded-lg bg-indigo-900 text-gray-100 mb-3 w-75 hover:bg-indigo-600 hover:text-gray-200 mt-1" onClick={() => { handleRegister() }}>
                                                <p className="font-medium text-xl">Registrar</p>
                                            </button>
                                        </div>
                                    </div>

                                </>
                            )
                    }
                </div>

            </div>

        </div>
    )
}