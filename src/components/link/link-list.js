import React from 'react';
import useCurrentUser from '../../utils/use-current-user';

function LinkList() {
  const currentUser = useCurrentUser();
  console.log('>> currentUser:', currentUser);
  return <div>LinkList</div>;
}

export default LinkList;
