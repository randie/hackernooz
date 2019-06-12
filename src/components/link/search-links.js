import React from 'react';
import LinkItem from './link-item';
import { FirebaseContext } from '../../firebase';

function SearchLinks() {
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [filteredLinks, setFilteredLinks] = React.useState([]);

  const getLinksCallback = React.useCallback(() => {
    firebase.db
      .collection('links')
      .get()
      .then(snapshot => {
        const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLinks(links);
      });
  }, [firebase.db]);

  React.useEffect(() => {
    getLinksCallback();
  }, [getLinksCallback]);

  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter(
      link =>
        link.url.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query),
    );
    setFilteredLinks(matchedLinks);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        Search <input type="text" onChange={event => setFilter(event.target.value)} />
        <button type="submit">OK</button>
      </form>
      {filteredLinks.map((link, index) => (
        <LinkItem key={link.id} link={link} showCount={false} index={index} />
      ))}
    </div>
  );
}

export default SearchLinks;
