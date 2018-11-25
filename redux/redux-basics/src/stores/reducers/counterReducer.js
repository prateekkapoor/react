import * as actionTypes from '../actionTypes';

const initialState = {
    counter: 0
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
    }
    return state;
}

export default reducer;