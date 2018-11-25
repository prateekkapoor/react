import * as actionTypes from './action';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGRIDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.IngridentName]: state.ingredients[action.IngridentName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.IngridentName]
            }

        case (actionTypes.REMOVE_INGRIDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.IngridentName]: state.ingredients[action.IngridentName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.IngridentName]
            }

        default: return state;
    }
}
export default reducer;