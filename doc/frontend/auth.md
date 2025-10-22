# Authentication against backend GraphQL service using Relay

## Install Dependencies

```bash
npm install react-relay relay-runtime graphql
npm install --save-dev relay-compiler
```

Add to `package.json`:

```json
"scripts": {
  "relay": "relay-compiler --src ./src --schema ../backend_app/priv/schema.graphql"
}
```


### 🧠 Meaning

This defines an **npm script** named `"relay"` that runs the **Relay Compiler** — the tool that processes your `graphql` tags into generated files Relay can use at runtime.

Let’s go through each part:

| Part                                        | What it does                                                                                                                                                                                                                                       |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `relay-compiler`                            | Runs the Relay compiler CLI. It scans your React source code for `graphql` template literals (like `graphql\`mutation { ... }``) and generates query artifacts.                                                                                    |
| `--src ./src`                               | Tells Relay where to look for your frontend source files. It will recursively search inside `./src` for any file using the `graphql` tag.                                                                                                          |
| `--schema ../backend_app/priv/schema.graphql` | Specifies the path to your GraphQL schema file — this is a `.graphql` file that describes all the types, queries, and mutations your backend exposes. In your setup, it’s located one folder up (`../backend_app/priv/`) from your frontend project. |

---

### ⚙️ Why it’s needed

Relay can’t interpret your `graphql` tags directly — they must be compiled into structured data ahead of time.
This compiler step ensures:

* Queries are validated against your schema.
* You catch GraphQL type errors before runtime.
* Relay gets efficient, pre-parsed query artifacts.

---

## How to **generate** `schema.graphql` from Phoenix (Absinthe) backend

To install absinthe introspection tool, in your Phoenix backend, run:

```bash
mix deps.get absinthe absinthe_plug absinthe_phoenix
```

(You probably already have these.)

Then make sure your endpoint exposes `/graphql` for introspection — usually Absinthe does by default.

Run this from your **backend project root**:

```bash
mix absinthe.schema.sdl --schema BackendWeb.Schema --output priv/schema.graphql
```

This creates:

```
./priv/schema.graphql
```

---
## Keeping Relay schema **automatically in sync**

You can define a **Mix alias** so you regenerate the schema automatically whenever you run `mix compile` or a custom command.

### 1️⃣ In your `mix.exs`

Add this inside your `def project` function:

```elixir
def project do
  [
    app: :login_app,
    version: "0.1.0",
    elixir: "~> 1.15",
    start_permanent: Mix.env() == :prod,
    deps: deps(),
    aliases: aliases()
  ]
end
```

Then add a new `aliases/0` function at the bottom:

```elixir
defp aliases do
  [
    "schema.gen": ["absinthe.schema.sdl --schema BackendWeb.Schema --output priv/schema.graphql"],
    compile: ["compile", "schema.gen"]
  ]
end
```

### 💡 What that does

Now every time you run:

```bash
mix compile
```

it will automatically regenerate `priv/schema.graphql`.

You can also manually run:

```bash
mix schema.gen
```

to refresh it anytime.

---

## ⚙️ Point Relay to it

Copy the file to frontend project repo, or point Relay to it directly.

---

## Add replay conifg 
You need to create a Relay configuration file:

```json
{
  "src": "./src",
  "schema": "../backend_app/priv/schema.graphql",
  "language": "javascript",
  "artifactDirectory": "./src/__generated__",
  "exclude": [
    "**/node_modules/**",
    "**/__mocks__/**",
    "**/__generated__/**"
  ],
  "eagerEsModules": true
}
```

Create the directory manually:
```bash
mkdir -p src/__generated__
```

## Update your npm script

In `package.json`, you can simplify the script since the config file will be automatically picked up:

```json
{
  "scripts": {
    "relay": "relay-compiler"
  }
}
```

After creating the config file, run `npm run relay` again and it should work properly.

The `artifactDirectory` is recommended to keep all generated Relay files in one organized location.

## Set up Babel

```bash
npm install -D @babel/core babel-plugin-relay
```

Create `babel.config.js` in the root directory:

```javascript
module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: [
    'relay',
  ],
};
```

### Update Vite configuration

Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          'relay',
        ],
      },
    }),
  ],
  define: {
    'process.env': {}
  }
})
```

## Run the Relay compiler

Before starting Vite, generate Relay artifacts:

```bash
npx relay-compiler
```
---

Restart Vite

Finally:

```bash
npm run dev
```
---

## Configure Relay in code

Create `src/relay/environment.js`:

```jsx
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

async function fetchGraphQL(params, variables) {
  // Retrieve the JWT token (adjust depending on your app)
  const token = localStorage.getItem('authToken'); 
  // or, if your AuthContext stores it somewhere globally accessible:
  // const token = getAuthToken(); 

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return await response.json();
}

export const createEnvironment = () => {
  const network = Network.create(fetchGraphQL);
  const store = new Store(new RecordSource());

  return new Environment({ network, store });
};

export const environment = createEnvironment();

```

## Create GraphQL Queries and Mutations

Create `src/graphql/userMutations.js`:

```jsx
import { graphql } from 'react-relay';

export const RegisterUserMutation = graphql`
  mutation userMutationsRegisterUserMutation(
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

export const LoginUserMutation = graphql`
  mutation userMutationsLoginUserMutation(
    $email: String!
    $password: String!
  ) {
    loginUser(email: $email, password: $password)
  }
`;

export const AddPhoneNumberMutation = graphql`
  mutation userMutationsAddPhoneNumberMutation(
    $phoneNumber: String!
  ) {
    addPhoneNumber(phoneNumber: $phoneNumber) {
      id
      email
      name
      phoneNumber
    }
  }
`;
```

## Create Auth Context

Create `src/context/AuthContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Create Relay-Enabled Login Component

Update `src/components/Login.jsx`:

```jsx
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
```

## Step 7: Update App.jsx with Relay and Auth Providers

Update `src/App.jsx`:

```jsx
import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { environment } from './relay/environment';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}

function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <AppContent />
        </Suspense>
      </AuthProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
```

## Step 8: Create Dashboard Component

Create `src/components/Dashboard.jsx`:

```jsx
import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const AddPhoneNumberMutation = graphql`
  mutation DashboardAddPhoneNumberMutation(
    $phoneNumber: String!
  ) {
    addPhoneNumber(phoneNumber: $phoneNumber) {
      id
      email
      name
      phoneNumber
    }
  }
`;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const [addPhoneMutation, isAddingPhone] = useMutation(AddPhoneNumberMutation);

  const handleAddPhone = () => {
    if (!phoneNumber.trim()) return;

    addPhoneMutation({
      variables: { phoneNumber: phoneNumber.trim() },
      onCompleted: (response, errors) => {
        if (errors) {
          setMessage(`Error: ${errors[0].message}`);
          return;
        }
        setMessage('Phone number added successfully!');
        setPhoneNumber('');
      },
      onError: (error) => {
        setMessage(`Error: ${error.message}`);
      },
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>Welcome to your Dashboard!</h2>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="user-info">
          <h3>User Information</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phoneNumber || 'Not set'}</p>
        </div>

        <div className="phone-section">
          <h3>Add Phone Number</h3>
          <div className="phone-input-group">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="phone-input"
            />
            <button 
              onClick={handleAddPhone} 
              disabled={isAddingPhone || !phoneNumber.trim()}
              className="add-phone-button"
            >
              {isAddingPhone ? 'Adding...' : 'Add Phone'}
            </button>
          </div>
          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

## Step 9: Add Dashboard CSS

Create `src/components/Dashboard.css`:

```css
.dashboard-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.dashboard-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e1e5e9;
}

.dashboard-header h2 {
  color: #333;
  margin: 0;
}

.logout-button {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background: #c82333;
}

.user-info {
  margin-bottom: 2rem;
}

.user-info h3 {
  color: #333;
  margin-bottom: 1rem;
}

.user-info p {
  margin: 0.5rem 0;
  color: #666;
}

.phone-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.phone-input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.phone-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
}

.phone-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-phone-button {
  padding: 0.75rem 1.5rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-phone-button:hover:not(:disabled) {
  background: #218838;
}

.add-phone-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.message {
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
```

## Step 10: Update Login CSS

Add these styles to `src/components/Login.css`:

```css
.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
  font-size: 0.9rem;
}

.link-button {
  background: none;
  border: none;
  color: #667eea;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
}

.link-button:hover {
  color: #5a6fd8;
}

.link-button:disabled {
  color: #999;
  cursor: not-allowed;
}

.login-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
}

.login-button:disabled:hover {
  transform: none;
  box-shadow: none;
}
```

Now you have a complete authentication system with:

- ✅ **User registration** with Relay mutation
- ✅ **User login** with JWT token storage
- ✅ **Authentication context** for state management
- ✅ **Phone number addition** functionality
- ✅ **Protected routes** (dashboard only accessible when authenticated)
- ✅ **Error handling** and loading states
- ✅ **Responsive design**


