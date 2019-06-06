import React from 'react';
import useFormValidation from '../../utils/use-form-validation';

const initialState = {
  name: '',
  email: '',
  password: '',
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(initialState);
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <div>
      <h2 className="mv3">{isLogin ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!isLogin && (
          <input
            name="name"
            type="text"
            placeholder="Name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
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
