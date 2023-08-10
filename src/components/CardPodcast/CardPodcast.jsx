import React from 'react';
import './CardPodcast.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";


const CardPodcast = ({ podcast }) => {
    let navigate = useNavigate();

    const handleClickPodcast = () => {
        const route = `/podcast/${podcast?.id?.attributes?.["im:id"]}`
        navigate(route);
    }
    return (
        <>
            <div key={podcast?.id.attributes?.id} className="flex flex-col" onClick={handleClickPodcast} data-testid="CardPodcast">
                <div className='flex justify-center items-center cursor-pointer'>
                    <img className="items-center rounded-full relative top-12" width={"120px"} src={podcast?.image[0].label} ></img>
                </div>
                <div className="px-6 py-6 border-2 pt-12 cursor-pointer" >
                    <div className="font-bold text-xl mb-2">{podcast?.title?.label}</div>
                    <div className='text-center'>{podcast?.artist?.label}</div>
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
CardPodcast.defaultProps = {
}

CardPodcast.propTypes = {
    podcast: PropTypes.object,
}
export default connect(mapStateToProps, mapDispatchToProps)(CardPodcast)
