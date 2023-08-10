import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import PodcastPage from './PodcastPage';
import mockList from '../../testsUtils/listPodcast.mock.json'
import podcastDetailsMock from '../../testsUtils/podcastDetails.mock.json'
import podcastEpisodesList from '../../testsUtils/podcastEpisodesList.mock.json'
import { act } from 'react-dom/test-utils';


describe('PodcastPage Component', () => {
    const mockStore = configureStore([]);

    const MOCK_PROPS = {

    }

    const store = mockStore({
        podcastReducer: {
            podcastList: mockList,
            podcastDetails: podcastDetailsMock,
            episodesList: podcastEpisodesList,
            episodesLoading: false,
            episodeDetails: {},
            podcastLoading: false,
        }
    });
    const storeLoading = mockStore({
        podcastReducer: {
            podcastList: mockList,
            podcastDetails: podcastDetailsMock,
            episodesList: podcastEpisodesList,
            episodesLoading: true,
            episodeDetails: {},
            podcastLoading: true,
        }
    });

    it('renders Loader when episode or podcast is loading', () => {
        render(
            <Provider store={storeLoading}>
                <Router>
                    <PodcastPage {...MOCK_PROPS} />
                </Router>
            </Provider>
        );

        const loaderElement = screen.getByTestId('loader');
        expect(loaderElement).toBeInTheDocument();
    });

    it('renders PodcastDetails and TableEpisodes when loading is complete', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <Router>
                        <PodcastPage {...MOCK_PROPS} />
                    </Router>
                </Provider>
            );
        })
        const podcastDetailsElement = screen.getByTestId('podcast-details');
        const tableEpisodesElement = screen.getByTestId('table-episodes');

        expect(podcastDetailsElement).toBeInTheDocument();
        expect(tableEpisodesElement).toBeInTheDocument();
    });

    it('check elements are displayed', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <Router>
                        <PodcastPage {...MOCK_PROPS} />
                    </Router>
                </Provider>
            );
        })

        expect(screen.getByText(podcastDetailsMock.name?.label)).toBeInTheDocument();
        expect(screen.getByText(`by ${podcastDetailsMock?.artist?.label}`)).toBeInTheDocument();
        podcastEpisodesList.forEach((episode) => {
            expect(screen.getByText(episode.trackName)).toBeInTheDocument();
        });
    });
});
