import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVoting } from '../services/votingService';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';

const CreateVoting = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const votingData = {
        name: formData.name,
        description: formData.description,
      };

      await createVoting(votingData);
      alert('Voting created successfully!');
      navigate('/votings');
      window.location.reload();
    } catch (err) {
      setErrors({ general: err.message || 'Failed to create voting. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg rounded-xl"
        >
          <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">Create New Voting</h1>

          {errors.general && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200"
            >
              {errors.general}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Input
                label="Name"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter voting name"
                error={errors.name}
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Input
                label="Description"
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter voting description"
                error={errors.description}
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/votings')}
                className="order-2 sm:order-1 w-full sm:w-auto border border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="order-1 sm:order-2 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Voting'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CreateVoting;
