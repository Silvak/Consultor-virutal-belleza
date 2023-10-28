import { apiInstance, apiInstanceWithAuth } from './api';

export const login = (credentials) =>
	apiInstance.post('/user/login', credentials);

export const signUp = (userData) =>
	apiInstance.post('/user/register', userData);

	export const uploadUserImage = (userId, image) =>
	apiInstanceWithAuth.post(`/files/user/${userId}`, image, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const deleteUser = (userId) => () =>
	apiInstanceWithAuth.delete(`/user/${userId}`);

export const getUsers = () => apiInstanceWithAuth.get('/user');

export const getUser = (userId) => apiInstanceWithAuth.get(`/user/${userId}`);
