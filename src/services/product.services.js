import { apiInstanceWithAuth } from './api';

export const createProduct = (productData) =>
	apiInstanceWithAuth.post('/product', productData);

export const editProduct = (productId) => (productData) =>
	apiInstanceWithAuth.patch(`/product/${productId}`, productData);

export const deleteProduct = (productId) => () =>
	apiInstanceWithAuth.delete(`/product/${productId}`);

export const getProducts = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/product', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const getProduct = (productId) =>
	apiInstanceWithAuth.get(`/product/${productId}`);

export const uploadProductImage = (productId, formData) =>
	apiInstanceWithAuth.post(`/files/product/${productId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const getProductImage = (productImage) =>
	apiInstanceWithAuth.get(`/files/product/${productImage}`);
