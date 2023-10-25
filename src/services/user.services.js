import { apiInstance } from './api';

console.log(apiInstance);

export const login = (credentials) =>
	apiInstance.post('/users/login', credentials);

export const signUp = (userData) =>
	apiInstance.post('/users/register', userData);
