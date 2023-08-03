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

function App() {
    return (<>


        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/podcast/:id" element={<PodcastPage />} />
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default App;
