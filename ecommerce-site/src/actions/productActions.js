import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants';

import products from '../utils/products';

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

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
