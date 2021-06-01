import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    checkAuthTimeoutSaga,
    logoutSaga,
    authUserSaga,
    authLoadUserSaga,
    authUserSignUpSaga,
    authCheckStateSaga
} from './auth';

import {
    fetchPostDetailsSaga,
    fetchPostsSaga,
} from './posts';

import {
    publishPostSaga,
} from './postBuilder';

import {
    registerPaymentSaga
} from './registerPayment';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_USER_SIGNUP, authUserSignUpSaga),
        takeEvery(actionTypes.AUTH_LOAD_USER, authLoadUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
};

export function* watchPosts() {
    yield all([
        takeEvery(actionTypes.FETCH_POST_DETAILS, fetchPostDetailsSaga),
        takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga),
        takeLatest(actionTypes.PUBLISH_POST, publishPostSaga),
    ]);
};

export function* watchPayments() {
    yield all([
        takeLatest(actionTypes.REGISTER_PAYMENT, registerPaymentSaga),
    ]);
};