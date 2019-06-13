import React from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../utils/use-form-validation';
import firebase from '../../firebase';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const isValidEmail = email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

function validateLoginValues({ email, password }) {
  const errors = {};

  // valid email?
  if (!email) {
    errors.email = 'Email required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email address';
  }

  // valid password?
  if (!password) {
    errors.password = 'Password required';
  } else if (password.length < 8) {
    errors.password = 'Password must at least 8 characters';
  }

  return errors;
}

function Login(props) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [authenticationError, setAuthenticationError] = React.useState(null);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    isSubmitting,
  } = useFormValidation(initialState, validateLoginValues, authenticateUser);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      isLogin
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push('/');
    } catch (error) {
      setAuthenticationError('Login failed!');
      console.error('ERROR! Authentication failed:', error.message);
    }
  }

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
          onBlur={handleBlur}
          onChange={handleChange}
          className={errors.email && 'error-input'}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          className={errors.password && 'error-input'}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {authenticationError && <p className="error-text">{authenticationError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            Submit
          </button>
          <button type="button" className="button pointer" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Already have an account'}
          </button>
        </div>
      </form>
      {isLogin && (
        <div className="forgot-password">
          <Link to="/forgot">Forgot password?</Link>
        </div>
      )}
    </div>
  );
}

export default Login;
