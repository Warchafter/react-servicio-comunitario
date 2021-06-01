import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('localId'),
    user: localStorage.getItem('name'),
    isAuthenticated: false,
    error: null,
    loading: false,
    authRedirectPath: '/posts'
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        isAuthenticated: true,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        token: null,
        isAuthenticated: false,
        error: action.error,
        loading: false,
        user: null
    });
};

const authSignUpStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSignUpSuccess = (state, action) => {
    return updateObject(state, {
        user: action.payload,
        error: null,
        loading: false,
        token: null,
        isAuthenticated: false
    })
}

const authSignUpFail = (state, action) => {
    return updateObject(state, {
        token: null,
        isAuthenticated: false,
        error: action.error,
        loading: false,
        user: null
    })
}

const authUserLoadedSuccess = (state, action) => {
    return updateObject(state, {
        user: action.payload
    });
};

const authUserLoadedFail = (state, action) => {
    return updateObject(state, {
        user: null
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        isAuthenticated: false,
        userId: null,
        user: null,
        rememberMe: false
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SIGNUP_START: return authSignUpStart(state, action);
        case actionTypes.AUTH_SIGNUP_SUCCESS: return authSignUpSuccess(state, action);
        case actionTypes.AUTH_SIGNUP_FAIL: return authSignUpFail(state, action);
        case actionTypes.AUTH_USER_LOADED_SUCCESS: return authUserLoadedSuccess(state, action);
        case actionTypes.AUTH_USER_LOADED_FAIL: return authUserLoadedFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    };
};

export default reducer;