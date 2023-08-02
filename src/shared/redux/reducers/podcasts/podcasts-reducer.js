import * as podcastActionTypes from "../../actions/podcasts/podcasts-types";

const initialState = {
    podcastData: []
}

export const reducer = (state = initialState, action = {}) => {
    console.log({ action })
    let newState = {};
    switch (action.type) {
        case podcastActionTypes.GET_ALL_PODCAST_DATA_SUCCESS:
            console.log({ action })
            newState = {
                ...state,
                podcastData: action.data
            }
            return newState
        case podcastActionTypes.GET_ALL_PODCAST_DATA_ERROR:
            console.error(action.error)
            return newState;
        default:
            return state;
    }

}


export default reducer;