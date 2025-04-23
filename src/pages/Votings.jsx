import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVotings, vote, deleteVoting } from '../services/votingService';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const Votings = () => {
  const [votings, setVotings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVoting, setSelectedVoting] = useState(null);
  const { user, isAdmin } = useAuth();
  const [hasVoted, setHasVoted] = useState(false);
  const [alreadyVotedFor, setAlreadyVotedFor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVotings();
    if (user && user.votedFor) {
      setAlreadyVotedFor(user.votedFor);
    }
  }, [user]);

  const fetchVotings = async () => {
    try {
      setLoading(true);
      const data = await getAllVotings();
      setVotings(data);
    } catch (err) {
      setError('Failed to load votings. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVotingSelect = (votingId) => {
    if (alreadyVotedFor !== null) {
      return;
    }
    setSelectedVoting(votingId);
  };

  const handleVote = async (votingId) => {
    try {
      if (!votingId) {
        alert('Please select a voting option');
        return;
      }

      if (alreadyVotedFor !== null) {
        alert('You have already voted!');
        return;
      }

      await vote(votingId);
      await fetchVotings();

      setAlreadyVotedFor(votingId);
      setSelectedVoting(null);
      alert('Vote submitted successfully!');
    } catch (err) {
      alert(`Failed to submit vote: ${err.message}`);
    }
  };

  const handleDeleteVoting = async (votingId) => {
    if (!confirm('Are you sure you want to delete this voting?')) {
      return;
    }

    try {
      await deleteVoting(votingId);
      alert('Voting deleted successfully!');
      fetchVotings();
    } catch (err) {
      alert(`Failed to delete voting: ${err.message}`);
    }
  };

  const handleCreateVoting = () => {
    navigate('/create-voting');
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading votings...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold text-purple-800">Votings</h1>
          {!user.votedFor && <Button
            onClick={handleCreateVoting}
            variant="primary"
            className="bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 shadow-md"
          >
            Create New Voting
          </Button>}
        </div>
        <p className="text-gray-600">Select a voting option and submit your vote</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {votings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg text-center"
        >
          <p className="text-gray-600 mb-4">No votings available at the moment.</p>
          <Button
            onClick={handleCreateVoting}
            variant="primary"
            className="mt-4 bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 shadow-md"
          >
            Create Your First Voting
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-5 bg-gradient-to-r from-purple-100 to-pink-100 border-b border-purple-200">
            <h2 className="text-xl font-medium text-purple-800">Available Votings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
            {votings.map((voting) => {
              const userHasVoted = alreadyVotedFor !== null;
              const userHasVotedForThis = alreadyVotedFor === voting.id;
              return (
                <motion.div
                  key={voting.id}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)' }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all cursor-pointer relative ${selectedVoting === voting.id ? 'ring-2 ring-purple-400' : ''} ${userHasVoted ? 'bg-purple-50' : ''}`}
                  onClick={() => handleVotingSelect(voting.id)}
                >
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 flex justify-between items-center">
                    <h3 className="font-medium text-purple-900 truncate">{voting.name}</h3>
                    <div className="text-sm bg-white text-purple-800 px-3 py-1 rounded-full shadow-sm">
                      {voting.voteCount} {voting.voteCount === 1 ? 'vote' : 'votes'}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">{voting.description}</p>

                    {userHasVoted ? (
                      userHasVotedForThis ? (
                        <div className="bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full inline-flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          You voted this
                        </div>
                      ) : null
                    ) : (
                      <div className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full inline-flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                        </svg>
                        Available to vote
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 p-3 bg-gray-50 flex items-center">
                    <input
                      type="radio"
                      id={`voting-${voting.id}`}
                      name="voting"
                      checked={selectedVoting === voting.id}
                      onChange={() => handleVotingSelect(voting.id)}
                      disabled={userHasVoted}
                      className="h-5 w-5 text-purple-600 focus:ring-purple-500 disabled:opacity-50"
                    />
                    <label
                      htmlFor={`voting-${voting.id}`}
                      className={`ml-2 text-sm font-medium cursor-pointer ${userHasVoted ? 'text-gray-500' : 'text-purple-700'}`}
                    >
                      {userHasVoted ? 'Already voted' : 'Select to vote'}
                    </label>

                    {isAdmin && (
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVoting(voting.id);
                        }}
                        className="ml-auto text-xs px-3 py-1 rounded-full bg-red-400 hover:bg-red-500 text-white shadow-sm"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="p-5 bg-gradient-to-r from-purple-100 to-pink-100 border-t border-purple-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-purple-700">
                {selectedVoting ? 'Click Submit to confirm your vote' : 'Select a voting option above'}
              </p>
              <Button
                onClick={() => handleVote(selectedVoting)}
                disabled={!selectedVoting}
                variant="primary"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 text-base"
              >
                Submit Vote
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </Layout>
  );
};

export default Votings;
