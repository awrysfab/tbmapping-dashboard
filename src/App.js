import React, { Component } from 'react';
import { HashRouter, Redirect, Switch } from 'react-router-dom';
import './scss/style.scss';
import { PublicRoute, PrivateRoute } from './utils/RedirectRoute';
import TheLayout from './containers/TheLayout';
import Login from './views/pages/login/Login';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Redirect exact from="/" to="/admin/dashboard"/>
            <PublicRoute exact path="/login" name="Login Page" component={Login} />
            <PrivateRoute path="/admin" name="Home" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
