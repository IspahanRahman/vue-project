import axios from './axiosInstance'
import { useRouter } from 'vue-router';

export const register = (username: string, password: string) => {
  return axios.post('/auth/register', { username, password })
}

export const login = async (username: string, password: string) => {
  const response = await axios.post('http://localhost:3001/api/auth/login', { username, password })
  localStorage.setItem('token', response.data.token)  // Store token in local storage
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data
}

export const logout = async () => {
  // Optionally call the backend logout endpoint
  await fetch('http://localhost:3001/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });
  // Remove token and user data from local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Redirect to login page
  const router = useRouter();
  router.push({ name: 'Login' });
};