import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import { getPurchasesThunk } from './purchases.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) =>{
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.actions;

export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const addToCartThunk = (product) => dispatch => {
    dispatch(setIsLoading(true))
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", product, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)))
}

export const buyCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", undefined, getConfig())
        .then(() =>{ 
            dispatch(getPurchasesThunk())
            dispatch(setCart([]))
        })
        .finally(() => dispatch(setIsLoading(false)))
}

export default cartSlice.reducer;
