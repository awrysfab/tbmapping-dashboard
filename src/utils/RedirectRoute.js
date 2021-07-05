import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './LocalStorage'

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/admin/dashboard' }} />}
    />
  )
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export { PublicRoute, PrivateRoute };