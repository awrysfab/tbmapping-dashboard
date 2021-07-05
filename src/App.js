import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { PublicRoute, PrivateRoute } from './utils/RedirectRoute';
import TheLayout from './containers/TheLayout';
import Login from './views/pages/login/Login';
import Page404 from './views/pages/page404/Page404';

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
            {/* <PublicRoute exact path="/login" name="Login Page" render={props => <Login {...props} />} /> */}
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            {/* <Route path="/admin" name="Home" render={props => <TheLayout {...props} />} /> */}

            <PublicRoute exact path="/login" name="Login Page" component={Login} />
            <PrivateRoute path="/admin" name="Home" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
