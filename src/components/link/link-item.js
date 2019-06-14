import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { FirebaseContext } from '../../firebase';

const getDomain = url => url.replace(/^https?:\/\//i, '');

function LinkItem({ link, index, showCount, history }) {
  const { firebase, currentUser } = React.useContext(FirebaseContext);

  async function handleAddVote() {
    if (!currentUser) {
      history.push('/login');
      return;
    }
    const linkRef = firebase.db.collection('links').doc(link.id);
    const doc = await linkRef.get();
    if (doc.exists) {
      const previousVotes = doc.data().votes;
      const newVote = { votedBy: { id: currentUser.uid, name: currentUser.displayName } };
      linkRef.update({ votes: [...previousVotes, newVote] });
    }
  }

  async function handleDelete() {
    try {
      const linkRef = firebase.db.collection('links').doc(link.id);
      await linkRef.delete();
    } catch (error) {
      console.log(`ERROR! Unable to delete link ${link.id}`, error.message);
    }
  }

  const isLinkOwner = currentUser && currentUser.uid === link.postedBy.id;

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        {/* TODO: hide vote button if currentUser is the link owner or has already voted before */}
        <div className="vote-button" onClick={handleAddVote}>
          ▲
        </div>
      </div>
      <div className="ml1">
        <div>
          {link.description} <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes &bull; by {link.postedBy.name} &bull;{' '}
          {distanceInWordsToNow(link.createdAt)} ago &bull;{' '}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0 ? `${link.comments.length} comments` : 'discuss'}
          </Link>
          {isLinkOwner && (
            <>
              {' '}
              &bull;{' '}
              <span className="delete-button" onClick={handleDelete}>
                delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
