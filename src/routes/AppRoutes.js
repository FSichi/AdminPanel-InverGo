import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { Commerce } from '../components/Commerce/Commerce'
import { PeticionList } from '../components/Peticiones/PeticionList'
import { PeticionScreen } from '../components/Peticiones/PeticionScreen'
import { Dashboard } from '../components/UI/Dashboard/Dashboard'
import { SideBar } from '../components/UI/SideBar'
import { AddUser } from '../components/Users/AddUser'
import { UserList } from '../components/Users/UserList'
import { UserScreen } from '../components/Users/UserScreen'

export const AppRoutes = () => {

    return (
        <Router>
            <div className='row w-full'>

                <div className='col-3'>
                    <SideBar />
                </div>

                <div className='col-9'>

                    <Switch>

                        <Route path="/dashboard" component={Dashboard}></Route>

                        {/* RUTAS USUARIOS */}

                        <Route path="/con/add" component={AddUser}></Route>
                        <Route path="/con/list" component={UserList}></Route>
                        <Route exact path="/con/:id" component={UserScreen}></Route>

                        {/* RUTAS HERRAMIENTAS */}

                        <Route path="/commerce" component={Commerce}></Route>
                        <Route path="/peticiones/list" component={PeticionList}></Route>
                        <Route path="/peticiones/:id" component={PeticionScreen}></Route>

                        <Redirect to={'/dashboard'} />

                    </Switch>
                </div>

            </div>
        </Router>

    )
}