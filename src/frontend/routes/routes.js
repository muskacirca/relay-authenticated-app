import React from 'react';
import { IndexRoute, Route } from 'react-router';

import authService from '../components/utils/AuthService'

import ViewerQuery from '../queries/ViewerQueries'

import MainApp from '../components/MainApp'
import Shops from '../components/shop/Shops'
import Login from '../components/login'


function logout(nextState, replace) {
    authService.logout()
    replace('/login')
}

function requireAuth(nextState, replace) {
    if (!JSON.parse(localStorage.getItem('user'))) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function getUser(){
    return {viewerId: JSON.parse(localStorage.getItem('user')).id }
}

export default  <Route>
                    <Route path="/" component={MainApp} queries={ViewerQuery}>

                        <IndexRoute component={Shops} queries={ViewerQuery} onEnter={requireAuth}
                                    prepareParams={() => getUser()} />
                        
                        <Route path="shops" component={Shops} queries={ViewerQuery} onEnter={requireAuth} 
                               prepareParams={() => getUser()} />

                    </Route>

                    <Route path="login" component={Login} />
                    <Route path="logout" component={Login} onEnter={logout} />

                </Route>
