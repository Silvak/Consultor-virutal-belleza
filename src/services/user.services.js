const { apiInstance } = require('./api');

export const login = (credentials) =>
	apiInstance.post('/users/login', credentials);

export const signUp = (userData) =>
	apiInstance.post('/users/register', userData);
