import { all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../../actions/podcasts/podcasts-types'
import {
    initGetAllPodcastSaga,
    getAllPodcastSaga
} from '../../sagas/podcasts/podcasts-sagas'

export function* watchPodcasts() {
    yield all([
        takeLatest(actionTypes.INIT_GET_DATA_ALL_PODCAST, initGetAllPodcastSaga),
        takeLatest(actionTypes.GET_ALL_PODCAST_DATA, getAllPodcastSaga),
    ])
}