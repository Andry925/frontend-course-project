import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'
import products from '../utils/products';


export const addToCart = (id, qty) => (dispatch, getState) => {
    const product = products.find((p) => p._id === id);

    if (product) {
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty,
            },
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } else {
        console.error(`Product with id ${id} not found`);
    }
};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch(
        {
            type: CART_REMOVE_ITEM,
            payload :id
        }
    )
    localStorage.setItem('cartItems'. JSON.stringify(getState().cart.cartItems))

}