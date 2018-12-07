import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngrident = (name) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        IngridentName: name
    }
}

export const removeIngrident = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        IngridentName: name
    }
}
export const setIngredients = (ingredients) => {
    //console.log('ingridents' + ingredients)
    return {
        type: actionTypes.SET_INGRIDIENT,
        ingredients: ingredients
    }
}
export const initIngridents = () => {
    return dispatch => {
        axios.get('https://react-my-brger.firebaseio.com/ingredients.json').then(response => {
            //console.log(JSON.stringify(response.data))
            dispatch(setIngredients(response.data))
        }).catch(error => {
            this.setState({ error: true });
        })
    }
}
export const fetchInfridentsFailed = () => {
    return {
        type: actionTypes.FETCH_INGRIDENTS_FAILED
    }
}