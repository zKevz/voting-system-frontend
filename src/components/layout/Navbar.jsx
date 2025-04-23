import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-purple-600">VoteSystem</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, <span className="font-medium">{user.name || user.username}</span>
                </span>
                
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" className="text-sm">
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                
                <Link to="/votings">
                  <Button variant="ghost" className="text-sm">
                    Votings
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  className="text-sm text-red-500 hover:text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="text-sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
