import axios from 'axios';

export const login = (username, password) => axios.post("/auth/login", { username: username, password: password });

export const getCurrentUser = () => axios.get('/api/users/current')