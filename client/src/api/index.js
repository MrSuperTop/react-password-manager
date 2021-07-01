import axios from 'axios';

const API = axios.create({
  baseUrl: 'https://localhost:5000/api',
  transformResponse: [function (data) {
    let errorMessage = 'Some invalid data was passed. Errors:\n';
    data = JSON.parse(data)

    if (data.errors) {
      data.errors.map((item) => {
        errorMessage += `${item.msg}\n`;
      });

      console.error(errorMessage);
    }

    return data;
  }]
});

API.interceptors.request.use((req) => {
  // TODO: Может в хук?
  const user = JSON.parse(localStorage.getItem('userData'))
  if (user) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
})

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
