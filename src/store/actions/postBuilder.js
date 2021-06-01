import * as actionTypes from './actionTypes';

export const publishPost = (postData, token) => {
    return {
        type: actionTypes.PUBLISH_POST,
        postData: postData,
        token: token
    };
};

export const publishPostStart = () => {
    return {
        type: actionTypes.PUBLISH_POST_START
    };
};

export const publishPostSuccess = (id, postData) => {
    return {
        type: actionTypes.PUBLISH_POST_SUCCESS,
        postId: id,
        postData: postData
    };
};

export const publishPostFail = (error) => {
    return {
        type: actionTypes.PUBLISH_POST_FAIL,
        error: error
    };
};