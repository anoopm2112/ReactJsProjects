import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';
import action from './action';
import { types as UserActionTypes } from '../modules/user/actions';
import { getUserAuthData } from '../modules/user/selectors';
import { URL } from './url';
import { ERROR_CODES } from './constants';
import { warningNotify } from '../utils/ReactReduxNotifyUtils';
import { I18n } from '../common/components';
const nonRestrictedURLs = ['users/signup', 'user/otp', 'otp/verify', 'user/reset-password'];

function isNonRestrictedURL(url) {
    return _.filter(nonRestrictedURLs, function (value) {
        return url.indexOf(value) !== -1;
    }).length;
}

function* invokeApi(api, url, payload) {
    const types = payload.types ? payload.types : ['REQUEST', 'SUCCESS', 'FAILURE'];

    let authHeaders = {};
    if (url.indexOf(URL.USER.AUTHENTICATE) !== -1) {
        authHeaders = {};
    } else if (!isNonRestrictedURL(url)) {
        const authData = yield select(getUserAuthData);

        let bearerToken = authData && authData.access_token ? authData.access_token : null;
        if (bearerToken) {
            authHeaders = { Authorization: `Bearer ${bearerToken}` };
        } else {
            window.location.hash = '/';
            return;
        }
    }
    payload.headers = Object.assign({}, payload.headers, authHeaders);
    yield put(action(types[0]));
    const { response, error } = yield call(api, url, payload);

    if (error) {
        let errorCode = error ? error.error_cd : null;
        if (errorCode === ERROR_CODES.JWT_EXPIRED) {
            //Expired token
            yield call(warningNotify, I18n.t('token_expired'), 10000);
        } else if (errorCode === 4403) {
            //Invalid token
            yield put(action(UserActionTypes.LOGOUT_USER)); // if invalid token error, logout the user
            return { error };
        } else {
            yield put(action(types[2], { error: error }));
        }
    } else {
        if (response.error) {
            yield put(action(types[2], { error: response.error }));
        } else {
            yield put(action(types[1], { data: response }));
        }
    }
    return { response, error };
}

export function* handleAPIRequest(apiFn, ...requestData) {
    let { api, url, payload } = apiFn(...requestData);
    return yield call(invokeApi, api, url, payload);
}
