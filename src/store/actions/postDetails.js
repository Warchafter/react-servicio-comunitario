import * as actionTypes from './actionTypes';

export const fetchPostDetails = (postId) => {
    return {
        type: actionTypes.FETCH_POST_DETAILS,
        postId: postId
    };
};

export const fetchPostDetailsStart = () => {
    return {
        type: actionTypes.FETCH_POST_DETAILS_START
    };
};

export const fetchPostDetailsSuccess = (postData) => {
    return {
        type: actionTypes.FETCH_POST_DETAILS_SUCCESS,
        postData: postData
    };
};

export const fetchPostDetailsFailed = (error) => {
    return {
        type: actionTypes.FETCH_POST_DETAILS_FAILED,
        error: error
    };
};