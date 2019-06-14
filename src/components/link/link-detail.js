import React from 'react';
import { FirebaseContext } from '../../firebase';
import LinkItem from '../link/link-item';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

function LinkDetail(props) {
  const { firebase, currentUser } = React.useContext(FirebaseContext);
  const [link, setLink] = React.useState(null);
  const [commentText, setCommentText] = React.useState('');
  const linkId = props.match.params.linkId;

  const linkRef = firebase.db.collection('links').doc(linkId);

  const getLinkCallback = React.useCallback(() => {
    linkRef.get().then(doc => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }, [linkRef]);

  React.useEffect(() => {
    getLinkCallback();
  }, [getLinkCallback]);

  async function handleAddComment() {
    if (!currentUser) {
      props.history.push('/login');
      return;
    }
    const doc = await linkRef.get();
    if (doc.exists) {
      const previousComments = doc.data().comments;
      const newComment = {
        postedBy: { id: currentUser.uid, name: currentUser.displayName },
        createdAt: Date.now(),
        text: commentText,
      };
      const comments = [...previousComments, newComment];
      linkRef.update({ comments });
      setLink(previousState => ({ ...previousState, comments }));
      setCommentText('');
    }
  }

  return !link ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <LinkItem link={link} showCount={false} />
      <textarea
        onChange={event => setCommentText(event.target.value)}
        value={commentText}
        rows="5"
        cols="60"
      />
      <div>
        <button className="button" onClick={handleAddComment}>
          Add comment
        </button>
      </div>
      {link.comments.map((comment, index) => (
        <div key={index}>
          <p className="comment-author">
            {comment.postedBy.name} &bull; {distanceInWordsToNow(comment.createdAt)}
          </p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default LinkDetail;
