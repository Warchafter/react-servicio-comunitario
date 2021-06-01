import { put } from '@redux-saga/core/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

// publishing post stept:
// after post request with postData (that has userId which is the localId)
// we get the response.data which has a .name property
// that name is the id for the registry of the post published in the DB
// so we dispatch publishPostSuccess(response.data.name, action.postData)
// publishPostSuccess in action.js recieves (id, postData) and then returns
// type:type: actionTypes.PUBLISH_POST_SUCCESS,
// postId: id,
// postData: postData

export function* publishPostSaga(action) {
    try {
        yield put(actions.publishPostStart());
        const response = yield axios.post('https://condominio-santa-rita-default-rtdb.firebaseio.com/posts.json?auth=' + action.token, action.postData);
        yield put(actions.publishPostSuccess(response.data.name, action.postData));
        yield put(actions.enqueueSnackbar(getSnackbarData('¡Se guardó la publicación!', 'success')));
    } catch (error) {
        yield put(actions.publishPostFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo guardar la publicación', 'error')));
    }
}