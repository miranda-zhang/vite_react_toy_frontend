# Login feature
From simple skeleton to fully working.

## Create React App with Vite
If you haven't done this already

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

## Create a Login Component

Create `src/components/Login.jsx`:

```jsx
import { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation - no real authentication
    if (formData.username && formData.password) {
      alert(`Login successful!\nUsername: ${formData.username}\nPassword: ${formData.password}\nRemember me: ${formData.rememberMe}\n\n(This is just a demo - no real authentication)`);
      
      // Reset form
      setFormData({
        username: '',
        password: '',
        rememberMe: false
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              required
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
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

## Create the CSS Styles

Create `src/components/Login.css`:

```css
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.login-header p {
  color: #666;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input::placeholder {
  color: #999;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #555;
}

.checkbox-label input {
  margin-right: 0.5rem;
  width: auto;
}

.forgot-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.login-button:active {
  transform: translateY(0);
}

.login-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e1e5e9;
}

.login-footer p {
  color: #666;
  font-size: 0.9rem;
}

.login-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-footer a:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
```

## Update App.jsx

Replace `src/App.jsx`:

```jsx
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  )
}

export default App
```

## Update App.css

Replace `src/App.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
}

.App {
  text-align: center;
}

/* Remove any default margins and ensure full height */
#root {
  min-height: 100vh;
}
```

## Run the Project

```bash
npm run dev
```

## Features of This Login Component:

- ✅ **Clean, modern design** with gradient background
- ✅ **Responsive layout** that works on mobile
- ✅ **Form validation** (basic frontend only)
- ✅ **"Remember me" checkbox**
- ✅ **Forgot password link**
- ✅ **Sign up link**
- ✅ **Smooth animations and hover effects**
- ✅ **No real authentication** - just demonstrates the UI/UX
- ✅ **Fully functional form handling** with React state

The component captures all form data and shows it in an alert when submitted, but doesn't actually authenticate against any backend service. Perfect for demos, prototypes, or as a starting point for real authentication implementation.

Next [Authenticate against backend GraphQL service using Relay](auth.md)
--