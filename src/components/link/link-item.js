import React from 'react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

const getDomain = url => url.replace(/^https?:\/\//i, '');

function LinkItem({ link, index, showCount }) {
  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button">▲</div>
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
        </div>
      </div>
    </div>
  );
}

export default LinkItem;
