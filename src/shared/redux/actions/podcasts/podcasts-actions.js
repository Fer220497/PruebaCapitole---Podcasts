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

export const initGetPodcastDetails = podcastId => {
    return {
        type: podcastActionTypes.INIT_GET_PODCAST_DETAILS,
        podcastId
    }

}
export const getPodcastDetails = (podcastId) => {
    return {
        type: podcastActionTypes.GET_PODCAST_DETAILS,
        podcastId
    }
}

export const getPodcastDetailsSuccess = (payload) => {
    return {
        type: podcastActionTypes.GET_PODCAST_DETAILS_SUCCESS,
        payload
    }
}
export const getPodcastDetailsError = (error) => {
    return {
        type: podcastActionTypes.GET_PODCAST_DETAILS_ERROR,
        error
    }
}


export const initGetPodcastEpisodes = podcastId => {
    return {
        type: podcastActionTypes.INIT_GET_PODCAST_EPISODES,
        podcastId
    }

}
export const getPodcastEpisodes = (podcastId) => {
    return {
        type: podcastActionTypes.GET_PODCAST_EPISODES,
        podcastId
    }
}

export const getPodcastEpisodesSuccess = (payload) => {
    return {
        type: podcastActionTypes.GET_PODCAST_EPISODES_SUCCESS,
        payload
    }
}
export const getPodcastEpisodesError = (error) => {
    return {
        type: podcastActionTypes.GET_PODCAST_EPISODES_ERROR,
        error
    }
}

