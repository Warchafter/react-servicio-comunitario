import { put, delay, call } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../actions/index';
import { getSnackbarData } from '../../shared/utility';


export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "userId");
    yield call([localStorage, 'removeItem'], "name");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    let expDate = action.expirationTime * 1000

    yield delay(expDate);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCafYKuE-piSNlfpmmfw0tpXIc5ENbjEWw';
    try {
        const response = yield axios.post(url, authData)

        const expirationDate = yield new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        );

        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.authLoadUser());
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.logout());
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.error.message, 'error')));
        yield put(actions.authFail(error.response.data.error));
    };
}

// if (!action.isSignup) {
//     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCafYKuE-piSNlfpmmfw0tpXIc5ENbjEWw';
// }

export function* authUserSignUpSaga(action) {
    yield put(actions.authSignUpStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCafYKuE-piSNlfpmmfw0tpXIc5ENbjEWw';
    try {
        let response = yield axios.post(url, authData)
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('userId', response.data.localId);
        const userData = {
            username: action.name,
            userId: response.data.localId
        }
        response = yield axios.post('https://condominio-santa-rita-default-rtdb.firebaseio.com/usersCustomUsername.json?auth=' + response.data.idToken, userData)
        yield call([localStorage, 'removeItem'], "token");
        yield call([localStorage, 'removeItem'], "userId");
        yield put(actions.authSignUpSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('¡Cuenta creada! Ahora inicie sesión.', 'success')));
    } catch (error) {
        yield put(actions.logout());
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.error.message, 'error')))
        yield put(actions.authSignUpFail(error.response.data.error))
    };
};

export function* authLoadUserSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
        yield put(actions.authUserLoadedFail());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            try {
                const userId = yield localStorage.getItem('userId');
                const queryParams = yield '?auth=' + token;
                const url = 'https://condominio-santa-rita-default-rtdb.firebaseio.com/usersCustomUsername.json';
                const response = yield call(axios.get, [(url + queryParams)]);
                const fetchedUsernames = [];
                for (let key in response.data) {
                    fetchedUsernames.push({
                        ...response.data[key],
                        id: key
                    });
                }
                let correctUsername = "";
                fetchedUsernames.forEach((element) => {
                    if (element.userId === userId) {
                        correctUsername = element.username
                    }
                });
                yield localStorage.setItem('name', correctUsername);
                yield put(actions.authUserLoadedSuccess(correctUsername));
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            let expDate = (expirationDate.getTime() - new Date().getTime()) / 1000
            yield put(actions.checkAuthTimeout(expDate));
        }
    }
}