export const reduxProfileInitialState = (successName, errorName) => {
    return {
            START: false,
            SUCCESS: false,
            FAIL: false,
            [successName]: null,
            [errorName]: null,
    }
}

//actionname=name of the state, payload=actual success or error response of api
export const reduxProfileUpdateState = (state, actionName, actionType, successName, errorName, payload=null) => {
    switch (actionType) {
        case 'pending':
            state[actionName].START = true;
            state[actionName].SUCCESS = false;
            state[actionName].FAIL = false;
            state[actionName][successName] = null;
            state[actionName][errorName] = null;
            break;
        case 'fulfilled':
            state[actionName].START = false;
            state[actionName].SUCCESS = true;
            state[actionName].FAIL = false;
            state[actionName][successName] = payload;
            state[actionName][errorName] = null;
            break;
        case 'rejected':
            state[actionName].START = false;
            state[actionName].SUCCESS = false;
            state[actionName].FAIL = true;
            state[actionName][successName] = null;
            state[actionName][errorName] = payload;
            break;
        default:
            console.error('Invalid actionType');
    }
};