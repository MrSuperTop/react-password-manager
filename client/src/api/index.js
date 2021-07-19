import axios from 'axios';
import useUser from '../hooks/user.hook';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

API.interceptors.request.use((req) => {
  const { token } = useUser();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  };

  return req;
});


// Auth
export const logIn = async (formData) => await API.post('/api/auth/login', formData);
export const register = async (formData) => await API.post('/api/auth/register', formData);

// Credentials
export const fetchCredentials = async () => await API.get('/api/credentials');
export const addOne = async (formData) => await API.post('/api/credentials/create', formData);
export const deleteOne = async (id) => await API.delete(`/api/credentials/${id}`);
export const getOne = async (id) => await API.get(`/api/credentials/${id}`);
export const editOne = async (id, formData) => await API.post(`/api/credentials/edit/${id}`, formData);

// Users
export const getUserEmails = async () => await API.get('/api/users/emails');
