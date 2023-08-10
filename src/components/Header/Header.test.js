import React from 'react';
import Header from '../Header/Header';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react'
import mockList from '../../testsUtils/listPodcast.mock.json'
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
        podcastReducer: {
            podcastList: mockList,
            podcastDetails: {},
            episodesList: [],
            episodesLoading: {},
            episodeDetails: {}
        }
    })
    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        )
    })

    it('test if change route if click on Header Element', async () => {
        const headerElement = screen.getByTestId('header');
        fireEvent.click(headerElement)
        expect(window.location.pathname).toContain('/')
    })
})