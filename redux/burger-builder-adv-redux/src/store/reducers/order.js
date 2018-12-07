import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility'
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.id })
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}
const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading: false })
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true })
}
const initPurchase = (state, action) => {
    return updateObject(state, { purchased: false })
}
const fetchOrderFailed = (state, action) => {
    return updateObject(state, { loading: false })
}
const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false })
}
const fetchOrderInit = (state, action) => {
    return updateObject(state, { loading: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.BURGER_PURCHASE_SUCCESS): return purchaseBurgerSuccess(state, action)
        case (actionTypes.BURGER_PURCHASE_FAILED): return purchaseBurgerFailed(state, action)
        case (actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state, action)
        case (actionTypes.INIT_PURCHASE): return initPurchase(state, action)
        case (actionTypes.FETCH_ORDER_FAILED): return fetchOrderFailed(state, action)
        case (actionTypes.FETCH_ORDER_SUCCESS): return fetchOrderSuccess(state, action)
        case (actionTypes.FETCH_ORDER_INIT): return fetchOrderInit(state, action);
        default: return state
    }
}
export default reducer;