import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../services/authService';
import { getAllVotings } from '../services/votingService';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/votings');
      return;
    }

    fetchData();
  }, [isAdmin, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersData, votingsData] = await Promise.all([
        getAllUsers(),
        getAllVotings()
      ]);

      setUsers(usersData);
      setVotings(votingsData);
    } catch (err) {
      setError('Failed to load data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteUser(userId);
      alert('User deleted successfully!');
      fetchData();
    } catch (err) {
      alert(`Failed to delete user: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading dashboard data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-purple-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users and view voting statistics</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card title="User Statistics" className="h-full">
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-4xl font-bold text-purple-700">{users.length}</p>
              <p className="text-gray-600 mt-2">Total Users</p>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <p className="text-4xl font-bold text-teal-600">{users.filter(user => user.role === 'admin').length}</p>
              <p className="text-gray-600 mt-2">Admins</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-4xl font-bold text-blue-600">{users.filter(user => user.role !== 'admin').length}</p>
              <p className="text-gray-600 mt-2">Regular Users</p>
            </div>
          </div>
        </Card>

        <Card title="Voting Statistics" className="h-full">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-4xl font-bold text-purple-700">{votings.length}</p>
              <p className="text-gray-600 mt-2">Total Votings</p>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <p className="text-4xl font-bold text-teal-600">
                {votings.reduce((total, voting) => total + (voting.voteCount || 0), 0)}
              </p>
              <p className="text-gray-600 mt-2">Total Votes</p>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => navigate('/create-voting')}
            className="mt-2"
          >
            Create New Voting
          </Button>
        </Card>
      </div>

      <Card title="User Management">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.username || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                        }`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.id === localStorage.getItem('userId')}
                        className="text-xs"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
};

export default AdminDashboard;
