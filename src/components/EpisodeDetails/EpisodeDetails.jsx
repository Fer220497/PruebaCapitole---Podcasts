import React, { useEffect } from 'react';
import './EpisodeDetails.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, shallowEqual, useSelector } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import { episodeDetailsSelector } from '../../shared/redux/selectors/podcasts/selector'

const EpisodeDetails = ({ initGetEpisodeDetails }) => {
    const { idEpisode, idPodcast } = useParams()

    const episodeDetails = useSelector(episodeDetailsSelector, shallowEqual)

    useEffect(() => {
        initGetEpisodeDetails(idEpisode, idPodcast)
    }, [idEpisode])

    return (
        <>

            <div className=" bg-white rounded-lg shadow-md p-6 w-3/4">
                <div className='border-t-2 border-solid pt-2 pb-2'>
                    <p className="text-xl font-semibold">{episodeDetails?.trackName}</p>
                    <div className="whitespace-pre-line italic" >{episodeDetails?.description} </div>
                </div>
                <audio controls className='w-full'>
                    <source src={episodeDetails?.episodeUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

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
EpisodeDetails.defaultProps = {
}

EpisodeDetails.propTypes = {
    initGetEpisodeDetails: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetails)
