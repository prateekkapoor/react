import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility'
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false

}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const addIngrident = (state, action) => {
    let updateIngrident = updateObject(state.ingredients, { [action.IngridentName]: state.ingredients[action.IngridentName] + 1 })
    return updateObject(state, { ingredients: updateIngrident, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.IngridentName] });
}
const removeIngrident = (state, action) => {
    let updateIng = updateObject(state.ingredients, { [action.IngridentName]: state.ingredients[action.IngridentName] - 1 })
    return updateObject(state, { ingredients: updateIng, totalPrice: state.totalPrice - INGREDIENT_PRICES[action.IngridentName] });
}
const setIngrident = (state, action) => {
    console.log('action' + JSON.stringify(action))
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    })
}
const fetchIngridentsFailed = (state, action) => {
    return updateObject(state, { error: true });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGRIDIENT): return addIngrident(state, action);
        case (actionTypes.REMOVE_INGRIDIENT): return removeIngrident(state, action);
        case (actionTypes.SET_INGRIDIENT): return setIngrident(state, action)
        case (actionTypes.FETCH_INGRIDENTS_FAILED): return fetchIngridentsFailed(state, action)
        default: return state;
    }
}
export default reducer;