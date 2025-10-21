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