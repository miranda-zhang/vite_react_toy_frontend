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
