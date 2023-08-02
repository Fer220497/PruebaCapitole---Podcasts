import React from 'react';
import './Header.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'


const Header = () => {



    return (
        <>
            <header className="bg-white">
                Podcaster
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
