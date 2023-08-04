import { all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../../actions/podcasts/podcasts-types'
import {
    initGetAllPodcastSaga,
    getAllPodcastSaga,
    initGetPodcastDetailsSaga,
    getPodcastDetailsSaga,
    initGetPodcastEpisodesSaga,
    getPodcastEpisodesSaga
} from '../../sagas/podcasts/podcasts-sagas'

export function* watchPodcasts() {
    yield all([
        takeLatest(actionTypes.INIT_GET_DATA_ALL_PODCAST, initGetAllPodcastSaga),
        takeLatest(actionTypes.GET_ALL_PODCAST_DATA, getAllPodcastSaga),
        takeLatest(actionTypes.INIT_GET_PODCAST_DETAILS, initGetPodcastDetailsSaga),
        takeLatest(actionTypes.GET_PODCAST_DETAILS, getPodcastDetailsSaga),
        takeLatest(actionTypes.INIT_GET_PODCAST_EPISODES, initGetPodcastEpisodesSaga),
        takeLatest(actionTypes.GET_PODCAST_EPISODES, getPodcastEpisodesSaga)
    ])
}