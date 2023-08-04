import React from 'react';
import './SearchBarWithCounter.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'


const SearchBarWithCounter = ({ items, handleOnChange, filter }) => {

    return (
        <>
            <div className='w-full flex justify-end'>
                <div className='border-2 rounded-lg bg-blue-500 p-1 text-white text-2sm font-bold inline-block'>{items?.length}</div>
                <input
                    type="text"
                    value={filter}
                    onChange={handleOnChange}
                    placeholder="Filter podcasts..."
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg'
                />
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

SearchBarWithCounter.defaultProps = {
}

SearchBarWithCounter.propTypes = {
    items: PropTypes.array,
    handleOnChange: PropTypes.func,
    filter: PropTypes.string,

}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarWithCounter)
