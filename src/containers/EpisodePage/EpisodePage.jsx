import React, { useEffect } from 'react';
import './EpisodePage.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, useSelector, shallowEqual } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'
import { podcastDetailsSelector, podcastEpisodesSelector } from '../../shared/redux/selectors/podcasts/selector'
import { useParams } from "react-router-dom";
import PodcastDetails from '../../components/PodcastDetails/PodcastDetails';
import EpisodeDetails from '../../components/EpisodeDetails/EpisodeDetails'
const EpisodePage = ({ initGetPodcastDetails, initGetPodcastEpisodes }) => {


    const { idPodcast } = useParams()
    console.log({ idPodcast })

    const podcastDetails = useSelector(podcastDetailsSelector, shallowEqual);
    const podcastEpisodes = useSelector(podcastEpisodesSelector, shallowEqual);

    useEffect(() => {
        initGetPodcastDetails(idPodcast)
        initGetPodcastEpisodes(idPodcast);
    }, [idPodcast])

    console.log({ podcastDetails })
    console.log({ podcastEpisodes })
    useEffect(() => {
        return;
    }, []);

    return (
        <>
            <div className="flex py-10">
                <PodcastDetails podcastDetails={podcastDetails} />
                <EpisodeDetails />
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        storeState: {
            ...state.podcastList,
        }
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            ...podcastsActions,
        },
        dispatch
    )
}
EpisodePage.defaultProps = {
}

EpisodePage.propTypes = {
    initGetPodcastDetails: PropTypes.func.isRequired,
    initGetPodcastEpisodes: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(EpisodePage)
