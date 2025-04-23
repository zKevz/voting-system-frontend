import apiClient from './api';

export const getAllVotings = async () => {
  return apiClient.get('/api/v1/votings');
};

export const createVoting = async (votingData) => {
  return apiClient.post('/api/v1/votings', votingData);
};

export const vote = async (votingId) => {
  return apiClient.get(`/api/v1/votings/vote?id=${votingId}`);
};

export const deleteVoting = async (votingId) => {
  return apiClient.delete(`/api/v1/votings?id=${votingId}`);
};
