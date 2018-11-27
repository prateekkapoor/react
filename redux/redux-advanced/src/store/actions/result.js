import * as actionTypes from './actionsTypes';

export const storeResult = (res) => {
    return (dispatch, getState) => {
        setTimeout(() => {
            const oldCounter = getState().ctr.counter;
            console.log("oldCounter: " + oldCounter)
            dispatch(saveResult(res))
        },
            2000);
    }
}
const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    }
};
export const deleteResult = (resultElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resultElId
    }
}