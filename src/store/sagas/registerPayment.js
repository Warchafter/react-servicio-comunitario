import { put } from '@redux-saga/core/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export function* registerPaymentSaga(action) {
    try {
        yield put(actions.registerPaymentStart());
        const response = yield axios.post('https://condominio-santa-rita-default-rtdb.firebaseio.com/payments.json?auth=' + action.token, action.postData);
        yield put(actions.registerPaymentSuccess(response.data.name, action.postData));
        yield put(actions.enqueueSnackbar(getSnackbarData('¡Se guardó la publicación!', 'success')));
    } catch (error) {
        yield put(actions.registerPaymentFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo guardar la publicación', 'error')));
    }
}