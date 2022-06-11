import { useEffect, useState } from 'react'
import axios from 'axios';
import { TablaPeticiones } from './TablaPeticiones';

export const PeticionList = () => {

    const [peticionesActivas, setPeticionesActivas] = useState([]);
    const [peticionesCompletadas, setPeticionesCompletadas] = useState([]);

    const [typeView, setTypeView] = useState(true);
    const [charged, setCharged] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4000/peticiones/table/all").then((resp) => {
            setPeticionesActivas(resp.data[0]);
            setPeticionesCompletadas(resp.data[1]);
            setCharged(true);
        });
    }, []);

    return (
        <div className='container-fluid mt-5 mb-5'>

            {/* TITULO Y BOTONES */}

            <div className='row flex justify-between'>
                <div className='col-6 mt-3'>
                    {
                        (typeView)
                            ? <h1 className='text-3xl text-gray-200'> Peticiones - <span className='text-red-400'>Activas</span> </h1>
                            : <h1 className='text-3xl text-gray-200'> Peticiones - <span className='text-teal-400'>Completadas</span> </h1>
                    }
                </div>
                <div className='col-5'>
                    <div className='row'>
                        <div className='col-6'>
                            <button
                                className="p-3 rounded-lg bg-red-900 text-gray-100 mb-3 w-100 hover:bg-teal-900 hover:text-gray-300 mt-1"
                                onClick={() => { setTypeView(true) }}
                            >
                                <p className="font-medium text-xl">Activas</p>
                            </button>
                        </div>
                        <div className='col-6'>
                            <button
                                className="p-3 rounded-lg bg-blue-900 text-gray-100 mb-3 w-100 hover:bg-indigo-900 hover:text-gray-100 mt-1"
                                onClick={() => { setTypeView(false) }}
                            >
                                <p className="font-medium text-xl">Completadas</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex mt-1 items-center">
                <div className="flex-grow border-t border-indigo-400"></div>
                <div className="flex-grow border-t border-indigo-400"></div>
            </div>

            {/* CONTENIDO */}

            {
                (charged)
                &&
                (
                    <>
                        {
                            (peticionesActivas.length === 0 && peticionesCompletadas.length === 0)
                                ?
                                (
                                    <div className='container mt-5 p-4 bg-dark rounded-2xl'>
                                        <h2 className='text-center mt-2 fst-italic text-cyan-400'>
                                            El sistema Actualmente no Posee ningun tipo de Peticiones
                                        </h2>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        {
                                            (typeView)
                                                ?
                                                (
                                                    <>
                                                        {
                                                            (peticionesActivas.length === 0)
                                                                ?
                                                                (
                                                                    <div className='container mt-5 p-4 bg-dark rounded-2xl'>
                                                                        <h2 className='text-center mt-2 fst-italic text-white'>
                                                                            El sistema Actualmente no Posee Peticiones Activas
                                                                        </h2>
                                                                    </div>
                                                                )
                                                                :
                                                                (
                                                                    <div className='mt-5'>
                                                                        <TablaPeticiones peticiones={peticionesActivas} />
                                                                    </div>
                                                                )
                                                        }
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        {
                                                            (peticionesCompletadas.length === 0)
                                                                ?
                                                                (
                                                                    <div className='container mt-5 p-4 bg-dark rounded-2xl'>
                                                                        <h2 className='text-center mt-2 fst-italic text-white'>
                                                                            El sistema Actualmente no Posee Peticiones Completadas
                                                                        </h2>
                                                                    </div>
                                                                )
                                                                :
                                                                (
                                                                    <div className='mt-5'>
                                                                        <TablaPeticiones peticiones={peticionesCompletadas} />
                                                                    </div>
                                                                )
                                                        }
                                                    </>
                                                )
                                        }
                                    </>
                                )
                        }
                    </>
                )
            }
        </div>
    )
}