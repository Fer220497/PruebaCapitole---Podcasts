import { put, call } from 'redux-saga/effects';
import * as actions from '../../actions/podcasts/podcasts-actions'
import axios from 'axios';

const urlAllPodcast = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

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
    yield put(actions.getAllDataPodcast())
}

export function get(url) {
    return axios.get(`${url}`);
}

export function* getAllPodcastSaga() {
    try {
        const cachedData = JSON.parse(localStorage.getItem('podcastList'));
        if (cachedData) {
            yield put(actions.getAllDataPodcastSuccess(cachedData))
        } else {
            const response = yield call(get, urlAllPodcast)
            const data = response.data.feed.entry;
            const dataBuilded = dataBuilder(data);
            localStorage.setItem('podcastList', JSON.stringify(dataBuilded));

            yield put(actions.getAllDataPodcastSuccess(dataBuilded))
        }
    } catch (error) {
        yield put(actions.getAllDataPodcastError(error))
    }
}

export function* initGetPodcastEpisodesSaga(action) {
    yield put(actions.getPodcastEpisodes(action.podcastId))

}

async function fetchData(action) {
    const urlDetails = `https://itunes.apple.com/lookup?id=${action.podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
    const dataResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(urlDetails)}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            return JSON.parse(data?.contents);
        }
        );
    return dataResponse;
}

export function* getPodcastEpisodesSaga(action) {
    try {
        const cachedData = JSON.parse(localStorage.getItem(action.podcastId));
        if (cachedData) {
            yield put(actions.getPodcastEpisodesSuccess(cachedData));
        } else {

            const data = yield call(fetchData, action);
            localStorage.setItem(action.podcastId, JSON.stringify(data.results));
            yield put(actions.getPodcastEpisodesSuccess(data.results));

        }
    } catch (error) {
        yield put(actions.getPodcastEpisodesError(error))
    }
}


export function* initGetPodcastDetailsSaga(action) {
    yield put(actions.getPodcastDetails(action.podcastId))

}
export function* getPodcastDetailsSaga(action) {
    try {
        const cachedData = JSON.parse(localStorage.getItem('podcastList'));
        if (cachedData) {
            const podcastDetail = cachedData.find((item) => item.id.attributes["im:id"] === action.podcastId)
            yield put(actions.getPodcastDetailsSuccess(podcastDetail))
        } else {
            const response = yield call(get, urlAllPodcast)
            const data = response.data.feed.entry;
            const dataBuilded = dataBuilder(data);
            const podcastDetail = dataBuilded.find((item) => item.id.attributes["im:id"] === action.podcastId)

            yield put(actions.getPodcastDetailsSuccess(podcastDetail));
        }
    } catch (error) {
        yield put(actions.getPodcastDetailsError(error))
    }
}
/*

console.log('action saga', action);
    try {
        const urlDetails = `https://itunes.apple.com/lookup?id=${action.podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
        console.log({ urlDetails })
        const response = yield call(fetch, `https://api.allorigins.win/get?url=${urlDetails}`);
        if (response.ok) {
            const data = yield response.json();
            console.log({ data })
            const parsedData = JSON.parse(data?.contents);
            console.log({ parsedData })

            yield put(actions.getPodcastDetailsSuccess(parsedData.results[0]));
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        yield put(actions.getPodcastDetailsError(error))
    }
*/
