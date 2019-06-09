import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './auth/login';
import ProtectedRoute from './auth/protected-route';
import Header from './header';
import LinkList from './link/link-list';
import CreateLink from './link/create-link';
import useCurrentUser from '../utils/use-current-user';
import firebase, { FirebaseContext } from '../firebase';

function App() {
  const currentUser = useCurrentUser();

  console.log('>> 1 currentUser:', currentUser);
  debugger;

  return (
    <Router>
      <FirebaseContext.Provider value={{ currentUser, firebase }}>
        <div className="app-container">
          <Header />
          <div className="route-container">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/new/1" />} />
              <Route path="/login" component={Login} />
              <Route path="/new/:page" component={LinkList} />
              <ProtectedRoute path="/create" component={CreateLink} />
            </Switch>
          </div>
        </div>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
