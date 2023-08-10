import React from 'react';
import MainPage from '../MainPage/MainPage';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import mockList from '../../testsUtils/listPodcast.mock.json'
import { BrowserRouter } from 'react-router-dom';

describe('MainPage Component', () => {
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        BrowserRouter: ({ children }) => <>{children}</>,
    }));

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

    const MOCK_PROPS = {

    }

    beforeEach(() => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MainPage {...MOCK_PROPS} />
                </BrowserRouter>
            </Provider>
        )
    })

    it('should render list', () => {
        const mainPage = screen.getByTestId('listElements');
        expect(mainPage).toBeInTheDocument();
    })

    it('should render multiple CardPodcast', async () => {
        act(() => {
            const listCardPodcast = screen.getAllByTestId('CardPodcast');
            expect(listCardPodcast.length).toBeGreaterThan(1);
        })
    })
    it('test if change route if click on element', async () => {

        act(() => {
            const firstElement = screen.getAllByTestId('CardPodcast')[0];
            fireEvent.click(firstElement)

        })
        expect(window.location.pathname).toContain('podcast')
    })

    it('list should change when searching', async () => {
        let searchBar;
        act(() => {
            searchBar = screen.getByTestId('searchBar');
        })
        expect(searchBar).toBeInTheDocument();
        expect(screen.getByText(mockList[0].title.label)).toBeInTheDocument();
        expect(screen.getByText(mockList[1].title.label)).toBeInTheDocument();
        act(() => {
            fireEvent.change(searchBar, { target: { value: 'Metallica' } })
        })
        expect(screen.getByText(mockList[0].title.label)).toBeInTheDocument();
        expect(screen.queryByText(mockList[1].title.label)).toBeNull();

    })
})