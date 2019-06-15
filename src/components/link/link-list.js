import React from 'react';
import { FirebaseContext } from '../../firebase';
import LinkItem from './link-item';

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  // const isInNewRoute = props.location.pathname.includes('new');
  const isInTopRoute = props.location.pathname.includes('top'); // top-voted

  const getLinksCallback = React.useCallback(() => {
    const linksCollection = firebase.db.collection('links');
    const orderBy = isInTopRoute ? 'voteCount' : 'createdAt';
    return linksCollection.orderBy(orderBy, 'desc').onSnapshot(handleSnapshot);
  }, [firebase.db, isInTopRoute]);

  React.useEffect(() => {
    const unsubscribe = getLinksCallback();
    return () => unsubscribe();
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
