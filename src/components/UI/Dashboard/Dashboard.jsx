import { useEffect, useState } from 'react'
import axios from 'axios';
import { Cards, CardsMoney } from './Cards';

export const Dashboard = () => {

    const [usersLength, setUsersLength] = useState({});
    const [moneyDist, setMoneyDist] = useState({});

    const [render, setRender] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4000/usuarios/dash/all").then((resp) => {

            setUsersLength(resp.data);

            axios.get("http://localhost:4000/usuarios/dash/money").then((resp) => {
                setMoneyDist(resp.data);
                setRender(true);
            });
        });

    }, []);

    return (
        <div className='container text-gray-100 mt-5'>

            <h1 className='text-3xl text-gray-200'> Dashboard </h1>

            <div className="relative flex mt-3 items-center">
                <div className="flex-grow border-t border-indigo-400"></div>
                <div className="flex-grow border-t border-indigo-400"></div>
            </div>

            {
                render &&
                (
                    <>
                        <Cards data={usersLength} />

                        <CardsMoney data={moneyDist} />
                    </>
                )
            }

        </div>
    )
}