import * as actionTypes from './actionTypes';

export const registerPayment = (paymentData, token) => {
    return {
        type: actionTypes.REGISTER_PAYMENT,
        paymentData: paymentData,
        token: token
    };
};

export const registerPaymentStart = () => {
    return {
        type: actionTypes.REGISTER_PAYMENT_START
    };
};

export const registerPaymentSuccess = (id, paymentData) => {
    return {
        type: actionTypes.REGISTER_PAYMENT_SUCCESS,
        postId: id,
        paymentData: paymentData
    };
};

export const registerPaymentFail = (error) => {
    return {
        type: actionTypes.REGISTER_PAYMENT_FAIL,
        error: error
    };
};