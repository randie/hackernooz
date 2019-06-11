import React from 'react';
import { FirebaseContext } from '../../firebase';
import LinkItem from './link-item';

function LinkList() {
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);

  const getLinksCallback = React.useCallback(
    () => firebase.db.collection('links').onSnapshot(handleSnapshot),
    [firebase.db],
  );

  React.useEffect(() => {
    getLinksCallback();
  }, [getLinksCallback]);

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLinks(links);
  }

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} link={link} showCount={true} index={index + 1} />
      ))}
    </div>
  );
}

export default LinkList;
