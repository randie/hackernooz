import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { FirebaseContext } from '../firebase';

function Header() {
  const { currentUser } = React.useContext(FirebaseContext);
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="Hacker Nooz Logo" className="logo" />
        <NavLink to="/" className="header-title">
          Hacker Nooz
        </NavLink>
      </div>
      <div className="flex">
        {currentUser ? (
          <>
            <div className="header-name">{currentUser.displayName}</div>
            <div className="divider">|</div>
            <div className="header-button">logout</div>
          </>
        ) : (
          <NavLink to="/login" className="header-link">
            login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
