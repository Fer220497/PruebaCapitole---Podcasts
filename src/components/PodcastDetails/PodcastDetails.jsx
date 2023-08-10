import React from 'react';
import './PodcastDetails.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";

const PodcastDetails = ({ podcastDetails, idPodcast }) => {
    let navigate = useNavigate();
    const isClickable = idPodcast ? 'cursor-pointer' : ''
    const handleOnClick = () => {
        if (idPodcast) {
            const route = `/podcast/${idPodcast}`
            navigate(route);
        }

    }
    return (
        <>
            <div className='w-1/4 bg-white rounded-lg shadow-md p-6 mr-8' data-testid="podcast-details">
                <div onClick={handleOnClick} className={`${isClickable}`}>
                    <img src={podcastDetails?.image?.[2].label} alt="Product Image" className="p-6 w-full  rounded-lg" />
                    <div className='border-t-2 border-solid pt-2 pb-2'>
                        <p className="text-xl font-semibold">{podcastDetails?.name?.label}</p>
                        <p className="text-xl font-semibold">by {podcastDetails?.artist?.label}</p>
                    </div>
                </div>
                <div className='border-t-2 border-solid'>
                    <p className='text-l font-semibold pt-2'>Description: </p>
                    <p className='italic text-sm'> {podcastDetails?.summary?.label}</p>
                </div>
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
PodcastDetails.defaultProps = {
    idPodcast: ''
}

PodcastDetails.propTypes = {
    podcastDetails: PropTypes.object.isRequired,
    idPodcast: PropTypes.string
}
export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetails)
