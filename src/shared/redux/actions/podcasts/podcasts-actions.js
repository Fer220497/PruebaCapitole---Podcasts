import * as podcastActionTypes from "./podcasts-types";

export const initGetAllDataPodcast = () => {
    return {
        type: podcastActionTypes.INIT_GET_DATA_ALL_PODCAST,

    }
}

export const getAllDataPodcast = () => {
    return {
        type: podcastActionTypes.GET_ALL_PODCAST_DATA,

    }
}

export const getAllDataPodcastSuccess = (data) => {
    return {
        type: podcastActionTypes.GET_ALL_PODCAST_DATA_SUCCESS,
        data,
    }
}

export const getAllDataPodcastError = (error) => {
    return {
        type: podcastActionTypes.GET_ALL_PODCAST_DATA_ERROR,
        error,
    }
}