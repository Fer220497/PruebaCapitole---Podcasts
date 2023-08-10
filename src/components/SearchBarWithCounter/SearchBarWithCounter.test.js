import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBarWithCounter from './SearchBarWithCounter';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import mockList from '../../testsUtils/listPodcast.mock.json'
import podcastDetailsMock from '../../testsUtils/podcastDetails.mock.json'
import podcastEpisodesList from '../../testsUtils/podcastEpisodesList.mock.json'

describe('SearchBarWithCounter Component', () => {

    const mockHandleOnChange = jest.fn();

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
        items: mockList,
        handleOnChange: mockHandleOnChange,
        filter: ''
    }

    it('renders search bar with valid counter', () => {
        render(
            <Provider store={store}>
                <Router>
                    <SearchBarWithCounter {...MOCK_PROPS} />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId('itemsCounter')).toHaveTextContent(mockList.length);
    });

});
