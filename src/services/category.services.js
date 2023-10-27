import { apiInstanceWithAuth } from './api';

export const createCategory = (category) =>
	apiInstanceWithAuth.post('/category', category);

export const editCategory = (categoryId) => (category) =>
	apiInstanceWithAuth.patch(`/category/${categoryId}`, category);

export const deleteCategory = (categoryId) => () =>
	apiInstanceWithAuth.delete(`/category/${categoryId}`);

export const getCategories = () => apiInstanceWithAuth.get('/category');

export const getCategory = (categoryId) =>
	apiInstanceWithAuth.get(`/category/${categoryId}`);
