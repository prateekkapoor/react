import * as actionTypes from './actionTypes';

const initialState = {
    counter: 0,
    results: []
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.INCREMENT):
            state = {
                ...state,
                counter: state.counter + 1
            }
            break;
        case (actionTypes.DECREMENT):
            state = {
                ...state,
                counter: state.counter - 1
            }
            break;
        case (actionTypes.ADD_COUNTER):
            state = {
                ...state,
                counter: state.counter + action.value
            }
            break;
        case (actionTypes.SUBTRACT_COUNTER):
            state = {
                ...state,
                counter: state.counter - action.value
            }
            break;
        case (actionTypes.STORE_RESULT):
            state = {
                ...state,
                results: state.results.concat({ id: new Date(), value: state.counter })
            }
            break;
        case (actionTypes.DELETE_RESULT):
            /*   let id = 2;
              const newArray = [...state.results];
              newArray.slice(id, 1) */
            const updateArray = state.results.filter(result => result.id !== action.resultElId)
            state = {
                ...state,
                results: updateArray
            }
    }
    return state;
}

export default reducer;