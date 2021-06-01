import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authUserSignUp = (email, name, password) => {
    return {
        type: actionTypes.AUTH_USER_SIGNUP,
        email: email,
        name: name,
        password: password
    };
};

export const authSignUpStart = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_START
    };
};

export const authSignUpSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS,
        payload: payload
    };
};

export const authSignUpFail = (error) => {
    return {
        type: actionTypes.AUTH_SIGNUP_FAIL,
        error: error
    };
};

export const authUserLoadedSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_USER_LOADED_SUCCESS,
        payload: payload
    };
};

export const authUserLoadedFail = () => {
    return {
        type: actionTypes.AUTH_USER_LOADED_FAIL,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};

export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password
    };
};

export const authLoadUser = () => {
    return {
        type: actionTypes.AUTH_LOAD_USER
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};