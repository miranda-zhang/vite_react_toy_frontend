import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const LoginUserMutation = graphql`
  mutation LoginLoginUserMutation(
    $email: String!
    $password: String!
  ) {
    loginUser(email: $email, password: $password)
  }
`;

const RegisterUserMutation = graphql`
  mutation LoginRegisterUserMutation(
    $email: String!
    $password: String!
  ) {
    registerUser(email: $email, password: $password) {
      id
      email
      name
      phoneNumber
    }
  }
`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const [loginMutation] = useMutation(LoginUserMutation);
  const [registerMutation] = useMutation(RegisterUserMutation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (isLogin) {
      // Login mutation
      loginMutation({
        variables: {
          email: formData.email,
          password: formData.password,
        },
        onCompleted: (response, errors) => {
          setLoading(false);
          if (errors) {
            setError(errors[0].message);
            return;
          }
          
          if (response.loginUser) {
            login(
              { email: formData.email },
              response.loginUser
            );
          }
        },
        onError: (error) => {
          setLoading(false);
          setError(error.message || 'Login failed');
        },
      });
    } else {
      // Register mutation
      registerMutation({
        variables: {
          email: formData.email,
          password: formData.password,
        },
        onCompleted: (response, errors) => {
          setLoading(false);
          if (errors) {
            setError(errors[0].message);
            return;
          }
          
          if (response.registerUser) {
            // Auto-login after successful registration
            loginMutation({
              variables: {
                email: formData.email,
                password: formData.password,
              },
              onCompleted: (loginResponse, loginErrors) => {
                if (loginErrors) {
                  setError(loginErrors[0].message);
                  return;
                }
                
                if (loginResponse.loginUser) {
                  login(
                    response.registerUser,
                    loginResponse.loginUser
                  );
                }
              },
              onError: (loginError) => {
                setError(loginError.message || 'Auto-login failed after registration');
              },
            });
          }
        },
        onError: (error) => {
          setLoading(false);
          setError(error.message || 'Registration failed');
        },
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Please sign in to your account' : 'Sign up for a new account'}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={loading}
                minLength={6}
              />
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              className="link-button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData(prev => ({ ...prev, confirmPassword: '' }));
              }}
              disabled={loading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
