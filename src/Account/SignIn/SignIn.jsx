import React, { useContext, useState } from 'react';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import { AuthContext } from '../../Provider/Provider';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { logIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    setPasswordValid(regex.test(password));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
        setError('');
        navigate('/');
      })
      .catch((error) => {
        let errorMessage = 'An error occurred. Please try again.';
        switch (error.code) {
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credentials. Please check your email and password.';
            break;
          default:
            errorMessage = error.message;
        }
        setError(errorMessage);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSignIn} className="px-2">
          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">What is your mail?</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                name="email"
                placeholder="mail@site.com"
                required
                aria-describedby="email-hint"
              />
            </label>
            <div id="email-hint" className="validator-hint hidden">
              Enter valid email address
            </div>
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-white">What is your Password?</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                minLength="8"
                onChange={handlePasswordChange}
                aria-describedby="password prof-hint"
              />
            </label>
            <p
              id="password-hint"
              className={`validator-hint ${passwordValid ? 'hidden' : ''}`}
            >
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>
          </fieldset>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full border-[2px] bg-[#FB2C36] font-bold border-gray-300 py-2 rounded-lg cursor-pointer ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In Account'}
          </button>
        </form>

        <div className="divider">OR</div>

        <div>
          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default SignIn;