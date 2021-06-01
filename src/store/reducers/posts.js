import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: null,
    error: null,
    loading: false
};

const fetchPostsStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchPostsSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.posts,
        error: null,
        loading: false
    });
};

const fetchPostsFail = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        default: return state;
    };
};

export default reducer;