import React from 'react';
import './App.css';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import MainPage from '../containers/MainPage/MainPage';
import Header from '../components/Header/Header'
import PodcastPage from '../containers/PodcastPage/PodcastPage';
import EpisodePage from '../containers/EpisodePage/EpisodePage'
function App() {
    return (<>


        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/podcast/:idPodcast" element={<PodcastPage />} />
                <Route path="/podcast/:idPodcast/episode/:idEpisode" element={<EpisodePage />} />
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default App;
