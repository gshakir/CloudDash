import React from 'react'
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router'
import MainTemplate from '../components/MainTemplate'
import LoginFormContainer from '../containers/LoginFormContainer'
import LogoutContainer from '../containers/LogoutContainer'
import DashboardContainer from '../containers/DashboardContainer'
import ServiceContainer from '../containers/ServiceContainer'
import PreferredRegionsContainer from '../containers/PreferredRegionsContainer'
import PreferredServicesContainer from '../containers/PreferredServicesContainer'
import { isLoggedIn } from '../utils/AwsHelpers'

function requireAuth(nextState, replace) {
    console.log("Require auth")
    if (!isLoggedIn()) {
        replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
        })
    }
}

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={MainTemplate}>
      <IndexRedirect to='/dashboard' />
      <Route path='login' header='Login' component={LoginFormContainer} />
      <Route path='logout' header='Logout' component={LogoutContainer} />
      <Route path='regions' header='AWS Regions' component={PreferredRegionsContainer} />
      <Route path='services' header='AWS Regions' component={PreferredServicesContainer} />
      <Route path='dashboard' header='Dashboard' component={DashboardContainer} onEnter={requireAuth} />
      <Route path='services/:service/:component' header='Service Details' component={ServiceContainer} onEnter={requireAuth}  />
    </Route>
  </Router>
);

export default routes
