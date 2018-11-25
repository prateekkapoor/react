import * as actionTypes from '../actionTypes';

const initialState = {
    results: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case (actionTypes.STORE_RESULT):
            state = {
                ...state,
                results: state.results.concat({ id: new Date(), value: action.counterResult })
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