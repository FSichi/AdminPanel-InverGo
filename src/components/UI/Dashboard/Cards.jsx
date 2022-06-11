
export const Cards = ({ data }) => {
    return (
        <div className='row mt-4 flex justify-center'>
            <Card info={data[0]} title='Usuarios Activos' color='text-cyan-300' />
            <Card info={data[1]} title='Licencias Anuales' color='text-green-300' />
            <Card info={data[2]} title='Licencias Vitalicia' color='text-indigo-300' />
        </div>
    )
}

const Card = ({ info, title, color }) => {
    return (
        <div className='col-4'>
            <div className="shadow-lg rounded-2xl w-100 p-3 bg-gray-800 ">
                <p className="text-2xl text-gray-200 text-center">{title}</p>
                <div className="flex flex-col justify-start">
                    <p className={`text-2xl ${color} text-center font-bold my-2`}>{info}</p>
                </div>
            </div>
        </div>
    )
}

export const CardsMoney = ({ data }) => {
    return (
        <div className='row mt-4'>
            <CardMoney1 data1={data[0]} data2={data[1]} />
            <CardMoney2 data2={data[2]} data3={data[3]} data4={data[4]} />
        </div>
    )
}

const CardMoney1 = ({ data1, data2 }) => {
    return (
        <div className='col-4'>
            <div className="shadow-lg rounded-xl p-6 bg-gray-800 relative overflow-hidden">
                <p className="text-white text-xl"> Distribución Ganancias </p>
                <div className="flex items-center my-4 text-blue-500 rounded justify-between">
                    <span className="rounded-lg p-2 bg-white">
                        <svg width="30" height="30" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z">
                            </path>
                        </svg>
                    </span>
                    <div className="flex flex-col w-full ml-5 items-start justify-evenly">
                        <p className="text-white text-2xl"> $ {data1} </p>
                        <p className="text-blue-200 text-lg"> Licencias Anuales </p>
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
                        <p className="text-white text-2xl"> $ {data2} </p>
                        <p className="text-blue-200 text-lg"> Licencias Vitalicias </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CardMoney2 = ({ data2, data3, data4 }) => {
    return (
        <div className='col-8'>

            <div className="bg-gray-800 overflow-hidden shadow rounded-2xl w-100 h-100 relative">
                <img src="https://img.clankapp.com/symbol/btc.svg" alt="btc logo" className="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4" />
                <div className="px-4 py-4">
                    <dl>
                        <p className="text-4xl font-medium text-gray-300"> Ganacias Totales </p>
                        <dd className="mt-3 text-3xl font-semibold text-teal-300"> $ {data2} </dd>
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
                                            <p className="text-white text-xl"> $ {data3} </p>
                                            <p className="text-blue-200 text-lg"> Facundo </p>
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
                                            <p className="text-white text-xl"> $ {data4} </p>
                                            <p className="text-blue-200 text-lg"> Mateo </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    )
}