import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './auth/login';
import Header from './header';
import LinkList from './link/link-list';
import useCurrentUser from '../utils/use-current-user';
import firebase, { FirebaseContext } from '../firebase';

function App() {
  const currentUser = useCurrentUser();

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
            </Switch>
          </div>
        </div>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
