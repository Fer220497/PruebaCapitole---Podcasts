import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TableEpisodes from './TableEpisodes';
import mockPodcastEpisodes from '../../testsUtils/podcastEpisodesList.mock.json'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import mockList from '../../testsUtils/listPodcast.mock.json'
import podcastDetailsMock from '../../testsUtils/podcastDetails.mock.json'
import podcastEpisodesList from '../../testsUtils/podcastEpisodesList.mock.json'
import moment from 'moment';

describe('TableEpisodes Component', () => {

    jest.mock('moment', () => {
        const moment = () => ({
            format: () => '24/07/2023',
        });

        moment.utc = () => ({
            format: () => '01:38',
        });

        return moment;
    });

    const mockStore = configureStore([]);

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

    const MOCK_PROPS = {
        podcastEpisodes: mockPodcastEpisodes
    }


    it('renders table rows with correct data', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <Router>
                        <TableEpisodes {...MOCK_PROPS} />
                    </Router>
                </Provider>
            );
        });
        const table = screen.getByTestId('table-episodes')
        expect(table).toBeInTheDocument(true);

        const tableRows = screen.getByTestId('table-episodes').querySelectorAll('tbody tr');
        expect(tableRows.length).toBe(mockPodcastEpisodes.length);
        expect(screen.getAllByText(mockPodcastEpisodes[1].trackName)[0]).toBeInTheDocument();
        expect(screen.getAllByText(moment(mockPodcastEpisodes[1].releaseDate).format('DD/MM/YYYY'))[0]).toBeInTheDocument();
        expect(screen.getAllByText(moment.utc(mockPodcastEpisodes[1].trackTimeMillis).format("mm:ss"))[0]).toBeInTheDocument(); // Example time, adjust based on your data

    });

    it('navigates to correct episode on row click', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <Router>
                        <TableEpisodes {...MOCK_PROPS} />
                    </Router>
                </Provider>
            );
        });

        fireEvent.click(screen.getByText(mockPodcastEpisodes[1].trackName));
        expect(window.location.pathname).toContain('episode')
        expect(window.location.pathname).toContain(mockPodcastEpisodes[1].trackId)

    });

});
