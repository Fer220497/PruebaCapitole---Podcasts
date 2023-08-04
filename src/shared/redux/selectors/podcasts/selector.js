export const allPodcastsDataSelector = (state) => state?.podcastReducer?.podcastList;
export const podcastDetailsSelector = (state) => state?.podcastReducer?.podcastDetails;
export const podcastEpisodesSelector = (state) => state?.podcastReducer?.episodesList;
export const podcastEpisodesLoading = (state) => state?.podcastReducer?.episodesLoading;
