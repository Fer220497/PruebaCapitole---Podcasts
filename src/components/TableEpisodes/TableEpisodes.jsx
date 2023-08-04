import React from 'react';
import './TableEpisodes.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, useSelector, shallowEqual } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'
import moment from 'moment';
import { podcastEpisodesLoading } from '../../shared/redux/selectors/podcasts/selector'
import Loader from '../Loader/Loader';
import { useNavigate, useParams } from "react-router-dom";

const TableEpisodes = ({ podcastEpisodes }) => {
    let navigate = useNavigate();
    const { idPodcast } = useParams()

    const episeodesLoading = useSelector(podcastEpisodesLoading, shallowEqual);
    const handleOnClick = (episode) => {
        console.log({ episode })
        const route = `/podcast/${idPodcast}/episode/${episode?.trackId}`
        navigate(route);
    }
    return (
        <>
            {episeodesLoading ? (
                <>
                    <Loader></Loader>
                </>
            ) : (
                <div className=" bg-white rounded-lg shadow-md p-6 w-3/4">
                    <h2 className="text-2xl font-semibold mb-4">Episodes: {podcastEpisodes?.length}</h2>
                    <table className="w-full border-collapse  ">
                        <thead>
                            <tr>
                                <th className="text-left w-4/6">Title</th>
                                <th className="text-left w-1/5">Date</th>
                                <th className="text-center w-1/5">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {podcastEpisodes?.map((episode, index) => {
                                const rowClass = index % 2 === 0 ? "bg-gray-100" : "bg-white";
                                return (
                                    <tr key={episode?.trackId} className={rowClass}>
                                        <td className="py-2 border-t-2 text-left text-blue-500 underline hover:text-blue-700 cursor-pointer"
                                            onClick={() => handleOnClick(episode)}
                                        >{episode.trackName}</td>
                                        <td className="py-2 border-t-2 text-left">{moment(episode?.releaseDate).format('DD/MM/YYYY')}</td>
                                        <td className="py-2 border-t-2 text-center">{moment.utc(episode.trackTimeMillis).format("mm:ss")}</td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            )}

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
TableEpisodes.defaultProps = {
}

TableEpisodes.propTypes = {
    podcastEpisodes: PropTypes.object.isRequired,

}
export default connect(mapStateToProps, mapDispatchToProps)(TableEpisodes)
