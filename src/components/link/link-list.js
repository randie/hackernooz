import React from 'react';
import { FirebaseContext } from '../../firebase';

function LinkList() {
  const { firebase } = React.useContext(FirebaseContext);

  const getLinksCallback = React.useCallback(
    () => firebase.db.collection('links').onSnapshot(handleSnapshot),
    [firebase.db],
  );

  React.useEffect(() => {
    getLinksCallback();
  }, [getLinksCallback]);

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('>> links:', links);
  }

  return <div>LinkList</div>;
}

export default LinkList;
