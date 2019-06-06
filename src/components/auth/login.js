import React, { useState } from 'react';

function Login(props) {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div>
      <h2 className="mv3">{isLogin ? 'Login' : 'Create Account'}</h2>
      <form className="flex flex-column">
        {!isLogin && <input type="text" placeholder="Name" autoComplete="off" />}
        <input type="email" placeholder="Email" autoComplete="off" />
        <input type="password" placeholder="Password" />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button type="button" className="button pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Already have an account'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
