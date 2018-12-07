import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const burgerPurchaseFailed = (error) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAILED,
        error: error
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart)
        axios.post('/orders.json', orderData).then(response => {
            console.log(response.data);
            dispatch(burgerPurchaseSuccess(response.data.name, orderData))
        }).catch(error => {
            console.log(error)
            dispatch(burgerPurchaseFailed(error))
        })
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
        loading: true
    }
}

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE,
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_INIT,
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    }
}

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart());

        axios.get('/orders.json').then(response => {
            let transformedOrder = [];
            for (let key in response.data) {
                transformedOrder.push({ ...response.data[key], id: key })
            }
            dispatch(fetchOrderSuccess(transformedOrder))
        }).catch(error => {
            dispatch(fetchOrderFailed(error))
        });
    }
}