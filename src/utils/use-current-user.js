import React from 'react';
import firebase from '../firebase';

function useCurrentUser(params) {
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => setCurrentUser(user || null));
    return () => unsubscribe();
  }, []);

  return currentUser;
}

export default useCurrentUser;
