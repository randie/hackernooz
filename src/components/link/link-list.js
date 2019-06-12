import React from 'react';
import { FirebaseContext } from '../../firebase';
import LinkItem from './link-item';

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const sortByNewest = props.location.pathname.includes('new');

  const getLinksCallback = React.useCallback(
    () =>
      firebase.db
        .collection('links')
        .orderBy('createdAt', 'desc')
        .onSnapshot(handleSnapshot),
    [firebase.db],
  );

  React.useEffect(() => {
    const unsubscribe = getLinksCallback();
    return () => unsubscribe();
  }, [getLinksCallback]);

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLinks(links);
  }

  function sortLinks() {
    if (sortByNewest) {
      return links;
    }
    // else sort by top voted
    return links.slice().sort((link1, link2) => link2.votes.length - link1.votes.length);
  }

  return (
    <div>
      {sortLinks().map((link, index) => (
        <LinkItem key={link.id} link={link} showCount={true} index={index + 1} />
      ))}
    </div>
  );
}

export default LinkList;
