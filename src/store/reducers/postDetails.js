import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    postData: null,
    error: null,
    loading: false,
    postId: null,
};

const fetchPostDetailsStart = (state, action) => {
    return updateObject(state, { error: null, loading: true, postId: action.postId });
};

const fetchPostDetailsSuccess = (state, action) => {
    return updateObject(state, {
        postData: action.postData,
        error: null,
        loading: false,
        postId: null
    });
};

const fetchPostDetailsFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false, postId: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POST_DETAILS_START: return fetchPostDetailsStart(state, action);
        case actionTypes.FETCH_POST_DETAILS_SUCCESS: return fetchPostDetailsSuccess(state, action);
        case actionTypes.FETCH_POST_DETAILS_FAILED: return fetchPostDetailsFail(state, action);
        default: return state;
    };
};

export default reducer;