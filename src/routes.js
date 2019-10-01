import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from './Services/Authentication';

import Home from './Views/Home';
import Profile from './Views/Profile';
import NotFound from './Views/NotFound'
import Login from './Views/Login'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route  {...rest} render={props => (
        isAuthenticated() ?
            (<Component {...props} />)
            :
            (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    )} />
)

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Routes;