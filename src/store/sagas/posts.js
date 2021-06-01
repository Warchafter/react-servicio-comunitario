import { element } from 'prop-types';
import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export function* fetchPostsSaga(action) {
    yield put(actions.fetchPostsStart());
    const access = yield localStorage.getItem('token');
    const queryParams = yield '?auth=' + access;
    const url = 'https://condominio-santa-rita-default-rtdb.firebaseio.com/posts.json';
    try {
        const response = yield axios.get(url + queryParams); // Esta manera está piche para la solicitud
        // const response = yield call(axios.get, [(url + queryParams)]);
        const fetchedPosts = [];
        for (let key in response.data) {
            fetchedPosts.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchPostsSuccess(fetchedPosts));
        // const response = yield call(axios.get, [(url)]);
    } catch (error) {
        yield put(actions.fetchPostsFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No pudimos obtener el listado de Publicaciones', 'error')));
    };
};

export function* fetchPostDetailsSaga(action) {
    yield put(actions.fetchPostDetailsStart());
    const access = yield localStorage.getItem('token');
    // const queryParams = yield '?auth=' + access + '&orderBy="postId"&equalTo="' + action.postId + '"';
    const queryParams = yield '?auth=' + access;
    const url = 'https://condominio-santa-rita-default-rtdb.firebaseio.com/posts.json';
    try {
        const response = yield axios.get(url + queryParams);
        const fetchedPosts = [];
        for (let key in response.data) {
            fetchedPosts.push({
                ...response.data[key],
                id: key
            });
        }
        let correctPost = null;
        fetchedPosts.forEach((element) => {
            if (element.postId === action.postId) {
                correctPost = element
            }
        });
        console.log(response.data);
        console.log(correctPost);
        yield put(actions.fetchPostDetailsSuccess(correctPost));
    } catch (error) {
        yield put(actions.fetchPostDetailsFailed(error));
        console.log(error);
        yield put(actions.enqueueSnackbar(getSnackbarData('No pudimos obtener la publicación.', 'error')));
    };
};