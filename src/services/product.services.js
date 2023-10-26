import { apiInstanceWithAuth } from './api';

export const createProduct = (productData) =>
	apiInstanceWithAuth.post('/product', productData);

export const editProduct = (productId) => (productData) =>
	apiInstanceWithAuth.patch(`/product/${productId}`, productData);

export const deleteProduct = (productId) => () =>
	apiInstanceWithAuth.delete(`/product/${productId}`);
