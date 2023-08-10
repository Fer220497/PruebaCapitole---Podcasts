import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import EpisodePage from './EpisodePage';
import episodeDetails from '../../testsUtils/episodeDetails.mock.json'
import { act } from 'react-dom/test-utils';
import podcastDetailsMock from '../../testsUtils/podcastDetails.mock.json'


describe('EpisodePage Component', () => {
    const mockStore = configureStore([]);

    const store = mockStore({
        podcastReducer: {
            podcastList: {},
            podcastDetails: podcastDetailsMock,
            episodesList: {},
            episodesLoading: false,
            episodeDetails: episodeDetails,
            podcastLoading: false,
        }
    });

    const MOCK_PROPS = {

    }

    it('renders', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <Router>
                        <EpisodePage {...MOCK_PROPS} />
                    </Router>
                </Provider>
            );
        })
        const descriptionElement = screen.getByTestId('episode-description');
        expect(descriptionElement).toBeInTheDocument();
    });

});