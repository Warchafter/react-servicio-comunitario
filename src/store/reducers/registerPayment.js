import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    payments: [],
    loading: false,
    registered: false
};

const registerPaymentStart = (state, action) => {
    return updateObject(state, { loading: true, registered: false });
};

const registerPaymentSuccess = (state, action) => {
    const newPayment = updateObject(action.paymentData, { id: action.paymentId });
    return updateObject(state, {
        loading: false,
        payments: state.payments.concat(newPayment),
        registered: true
    });
};

const registerPaymentFail = (state, action) => {
    return updateObject(state, { loading: false, registered: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_PAYMENT_START: return registerPaymentStart(state, action);
        case actionTypes.REGISTER_PAYMENT_SUCCESS: return registerPaymentSuccess(state, action);
        case actionTypes.REGISTER_PAYMENT_FAIL: return registerPaymentFail(state, action);
        default: return state;
    };
};

export default reducer;