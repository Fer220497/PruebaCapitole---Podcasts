import React from 'react';
import './CardPodcast.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'


const MainPage = ({ podcast }) => {

    //place-self-center rounded overflow-hidden shadow-lg inline-block w-20 flex-none

    return (
        <>
            <div className="flex flex-col " >
                <div className='flex justify-center items-center'>
                    <img className="items-center rounded-full relative top-12" width={"120px"} src={podcast?.image[0].label} ></img>
                </div>
                <div className="px-6 py-6 border-2 pt-12" >

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
            ...state.podcastData,
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
MainPage.defaultProps = {
}

MainPage.propTypes = {
    podcast: PropTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
