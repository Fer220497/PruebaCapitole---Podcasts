import React from 'react';
import './Header.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";


const Header = () => {
    let navigate = useNavigate();

    const handleClickPodcast = () => {
        navigate("/");
    }

    return (
        <>
            <header className="bg-white w-min cursor-pointer ">
                <div onClick={handleClickPodcast}>
                    Podcaster
                </div>
            </header>
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
Header.defaultProps = {
}

Header.propTypes = {
    podcast: PropTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
