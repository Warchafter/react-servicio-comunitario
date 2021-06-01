import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: [],
    loading: false,
    published: false
};

const publishPostStart = (state, action) => {
    return updateObject(state, { loading: true, published: false });
};

const publishPostSuccess = (state, action) => {
    const newPost = updateObject(action.postData, { id: action.postId });
    return updateObject(state, {
        loading: false,
        posts: state.posts.concat(newPost),
        published: true
    });
};

const publishPostFail = (state, action) => {
    return updateObject(state, { loading: false, published: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PUBLISH_POST_START: return publishPostStart(state, action);
        case actionTypes.PUBLISH_POST_SUCCESS: return publishPostSuccess(state, action);
        case actionTypes.PUBLISH_POST_FAIL: return publishPostFail(state, action);
        default: return state;
    };
};

export default reducer;