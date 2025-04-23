import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const Home = () => {
  const { user, isAdmin } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">Welcome to the Voting System</h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern platform for creating and participating in votes
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-teal-600 mb-4">For Voters</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Vote on existing topics
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Add custom options
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure authentication
                </li>
              </ul>
            </div>

            <div className="text-left">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">For Administrators</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Create and manage votings
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  View detailed voting results
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Manage user accounts
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/votings">
                <Button variant="primary" className="px-8 py-3">
                  View Votings
                </Button>
              </Link>
              
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="secondary" className="px-8 py-3">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="primary" className="px-8 py-3">
                  Login
                </Button>
              </Link>
              
              <Link to="/register">
                <Button variant="outline" className="px-8 py-3">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
