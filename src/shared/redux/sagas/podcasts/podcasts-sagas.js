import { put, call } from 'redux-saga/effects';
import * as actions from '../../actions/podcasts/podcasts-actions'
import axios from 'axios';
const url = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

export function* initGetAllPodcastSaga() {
    console.log('as')
    yield put(actions.getAllDataPodcast())
}

export function getPodcast() {
    return axios.get(`${url}`);
}

export function* getAllPodcastSaga() {
    try {
        const cachedData = window.cachedData;
        if (cachedData) {
            console.log('getFromCache')
            yield put(actions.getAllDataPodcastSuccess(cachedData))
        } else {
            const response = yield call(getPodcast)
            const data = response.data;
            window.cachedData = data;
            console.log('getFromAxios')
            yield put(actions.getAllDataPodcastSuccess(data))
        }
    } catch (error) {
        yield put(actions.getAllDataPodcastError(error))
    }
}