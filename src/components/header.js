import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="Hacker Nooz Logo" className="logo" />
        <NavLink to="/" className="header-title">
          Hacker Nooz
        </NavLink>
      </div>
      <div className="flex">
        <NavLink to="/login" className="header-link">
          login
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(Header);
