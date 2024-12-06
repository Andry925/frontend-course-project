import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

import products from '../utils/products';


export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const data = products;

        const filteredData = keyword
            ? data.filter(product =>
                product.name.toLowerCase().includes(keyword.toLowerCase())
            )
            : data;
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: filteredData,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message,
        });
    }
};


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const product = products.find((p) => p.id === id);

        if (product) {
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: product,
            });
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message,
        });
    }
};
