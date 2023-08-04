import * as podcastActionTypes from "../../actions/podcasts/podcasts-types";

const initialState = {
    podcastList: [],
    podcastDetails: {},
    episodesList: [],
    episodesLoading: false,
    episodeDetails: {},
    podcastLoading: false
}

export const reducer = (state = initialState, action = {}) => {
    let newState = {};
    switch (action.type) {
        case podcastActionTypes.GET_ALL_PODCAST_DATA_SUCCESS:
            newState = {
                ...state,
                podcastList: action.data
            }
            return newState
        case podcastActionTypes.GET_ALL_PODCAST_DATA_ERROR:
            console.error(action.error)
            return newState;
        case podcastActionTypes.INIT_GET_PODCAST_DETAILS:
            newState = {
                ...state,
                podcastLoading: true,
                podcastDetails: action?.payload
            }
            return newState
        case podcastActionTypes.GET_PODCAST_DETAILS_SUCCESS:
            newState = {
                ...state,
                podcastLoading: false,
                podcastDetails: action?.payload
            }
            return newState
        case podcastActionTypes.GET_PODCAST_DETAILS_ERROR:
            console.error(action.error)
            return newState;

        case podcastActionTypes.INIT_GET_PODCAST_EPISODES:
            newState = {
                ...state,
                episodesLoading: true,
            }
            return newState;
        case podcastActionTypes.GET_PODCAST_EPISODES_SUCCESS:
            newState = {
                ...state,
                episodesList: action.payload,
                episodesLoading: false,

            }
            return newState
        case podcastActionTypes.GET_PODCAST_EPISODES_ERROR:
            console.error(action.error)
            return newState;

        case podcastActionTypes.GET_EPISODE_DETAILS_SUCCESS:
            newState = {
                ...state,
                episodeDetails: action?.payload
            }
            return newState
        case podcastActionTypes.GET_EPISODE_DETAILS_ERROR:
            console.error(action.error)
            return newState;
        default:
            return state;
    }

}


export default reducer;