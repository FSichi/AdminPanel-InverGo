import { Link } from 'react-router-dom'

export const SideBar = () => {
    return (
        <div className="bg-gray-800 h-100">
            <div className="flex flex-col">
                <div className="h-screen">
                    <div className="flex items-center justify-start mx-6 mt-10">
                        <Link to="/dashboard">
                            <img className="h-12" src={`../../assets/logo.svg`} alt='PhotoSidebar' />
                        </Link>
                        <span className="text-gray-200 ml-4 text-2xl font-bold mt-1">
                            Admin Panel
                        </span>
                    </div>
                    <nav className="mt-10 px-6">
                        <p className="text-gray-400 ml-2 mb-3 text-md">
                            Usuarios
                        </p>

                        <Link to='/con/add' className="hover:text-gray-200 hover:bg-gray-900 flex items-center p-3 my-2 text-gray-300 rounded-lg ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="mx-4 text-lg font-normal">
                                Agregar
                            </span>
                            <span className="flex-grow text-right"></span>
                        </Link>
                        <Link to='/con/list' className="hover:text-gray-200 hover:bg-gray-900 flex items-center p-3 my-2 text-gray-300 rounded-lg ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="mx-4 text-lg font-normal">
                                Listado
                            </span>
                            <span className="flex-grow text-right"></span>
                        </Link>
                        <p className="text-gray-400 ml-2 mb-3 mt-3 text-md">
                            Herramientas
                        </p>

                        <Link to='/commerce' className="hover:text-gray-200 hover:bg-gray-900 flex items-center p-3 my-2 text-gray-300 rounded-lg ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="mx-4 text-lg font-normal">
                                Commerce
                            </span>
                            <span className="flex-grow text-right"></span>
                        </Link>
                        
                        <Link to='/peticiones/list' className="hover:text-gray-200 hover:bg-gray-900 flex items-center p-3 my-2 text-gray-300 rounded-lg ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                            <span className="mx-4 text-lg font-normal">
                                Peticiones
                            </span>
                            <span className="flex-grow text-right"></span>
                        </Link>

                        <a
                            href={`https://console.firebase.google.com/u/4/project/invergo---mongo/overview?hl=es-419`}
                            target="_blank"
                            rel='noreferrer'
                            className="hover:text-gray-200 hover:bg-gray-900 flex items-center p-3 my-2 text-gray-300 rounded-lg "
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <span className="mx-4 text-lg font-normal">
                                Link Firebase
                            </span>
                            <span className="flex-grow text-right"></span>
                        </a>

                    </nav>
                </div>
            </div>
        </div>

    )
}