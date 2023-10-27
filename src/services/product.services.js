import { apiInstanceWithAuth } from './api';

export const createProduct = (productData) =>
	apiInstanceWithAuth.post('/product', productData);

export const editProduct = (productId) => (productData) =>
	apiInstanceWithAuth.patch(`/product/${productId}`, productData);

export const deleteProduct = (productId) => () =>
	apiInstanceWithAuth.delete(`/product/${productId}`);

export const getProducts = async ({ limit, offset }) => {
	const data = await apiInstanceWithAuth.get('/product', {
		params: { limit, offset },
	});

	return data.data;
};

export const getProduct = (productId) =>
	apiInstanceWithAuth.get(`/product/${productId}`);
