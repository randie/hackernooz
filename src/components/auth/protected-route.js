import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

const ProtectedRoute = ({ component: Component, ...attributes }) => {
  const { currentUser } = React.useContext(FirebaseContext);

  console.log('>> 3 currentUser:', currentUser);
  debugger;

  return (
    <Route
      {...attributes}
      render={props => (currentUser ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
