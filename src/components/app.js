import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './auth/login';
import Header from './header';
import LinkList from './link/link-list';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="route-container">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route path="/login" component={Login} />
            <Route path="/new/:page" component={LinkList} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
