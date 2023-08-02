import { put, call } from 'redux-saga/effects';
import * as actions from '../../actions/podcasts/podcasts-actions'
import axios from 'axios';
const url = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

export const dataBuilder = (data) => {
    const dataBuilded = data.map(element => {
        console.log({ element })
        return {
            category: element?.category,
            id: element?.id,
            artist: element?.["im:artist"],
            contentType: element?.["im:contentType"],
            image: element?.["im:image"],
            name: element?.["im:name"],
            price: element?.["im:price"],
            releaseDate: element?.["im:releaseDate"],
            link: element?.["im:artist"],
            rights: element?.rights,
            summary: element?.summary,
            title: element?.title,
        }
    });
    return dataBuilded;
}

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
            const data = response.data.feed.entry;
            const dataBuilded = dataBuilder(data);
            console.log({ dataBuilded })
            window.cachedData = dataBuilded;
            console.log('getFromAxios')
            yield put(actions.getAllDataPodcastSuccess(dataBuilded))
        }
    } catch (error) {
        yield put(actions.getAllDataPodcastError(error))
    }
}