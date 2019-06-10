import React from 'react';
import { FirebaseContext } from '../../firebase';

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [accountEmail, setAccountEmail] = React.useState('');
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);

  const handleResetPassword = async event => {
    event.preventDefault();
    try {
      await firebase.resetPassword(accountEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (error) {
      console.error('ERROR! Unable to reset password', error.message);
      setIsPasswordReset(false);
      setPasswordResetError('Password reset failed!');
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <input
        type="email"
        className="input"
        placeholder="account email"
        onChange={event => setAccountEmail(event.target.value)}
      />
      <div className="mt1 mb3">
        <button type="submit" className="button">
          Reset password
        </button>
      </div>
      {isPasswordReset && (
        <p className="success-text">Check your email for password reset instructions</p>
      )}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </form>
  );
}

export default ForgotPassword;
