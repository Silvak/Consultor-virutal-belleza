import { apiInstanceWithAuth } from './api';

export const createCategory = (category) =>
	apiInstanceWithAuth.post('/category', category);

export const editCategory = (categoryId, categoryData) =>
	apiInstanceWithAuth.patch(`/category/${categoryId}`, categoryData);

export const deleteCategory = (categoryId) => () =>
	apiInstanceWithAuth.delete(`/category/${categoryId}`);

export const getCategories = () => apiInstanceWithAuth.get('/category');

export const getCategory = (categoryId) =>
	apiInstanceWithAuth.get(`/category/${categoryId}`);
