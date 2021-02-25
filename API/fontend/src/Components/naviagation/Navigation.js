


import React from 'react'
import Login from '../login/Login'
import Signup from '../signup/SignUp'
import Dashboard from '../dashboard/Dashboard'
import Home from "../home/Home";
import AppRoute from '../routes/AppRouting'
import { UseGlobalState, UseGlobalStateUpdate } from "../../context/context"


import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";


function Navigation() {

    const globalState = UseGlobalState();
    const setGlobalState = UseGlobalStateUpdate()




    return (
        <>
            <Router>
                <AppRoute />
                {globalState.loginStatus === false ?
                    <>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </>
                    : null}
                {globalState.loginStatus === true ?
                    <>
                        {/* <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route> */}
                        <Route path="/">
                            <Dashboard />
                        </Route>
                    </>
                    : null}

            </Router>
        </>
    )
}


export default Navigation;

