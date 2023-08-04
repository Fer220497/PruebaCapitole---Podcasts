import React, { useEffect } from 'react';
import './PodcastPage.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, useSelector, shallowEqual } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'
import { podcastDetailsSelector, podcastEpisodesSelector, podcastLoadingSelector, podcastEpisodesLoading } from '../../shared/redux/selectors/podcasts/selector'
import { useParams } from "react-router-dom";
import PodcastDetails from '../../components/PodcastDetails/PodcastDetails';
import TableEpisodes from '../../components/TableEpisodes/TableEpisodes'
import Loader from '../../components/Loader/Loader';

const PodcastPage = ({ initGetPodcastDetails, initGetPodcastEpisodes }) => {


  const { idPodcast } = useParams()

  const episodeLoading = useSelector(podcastEpisodesLoading, shallowEqual);
  const podcastLoading = useSelector(podcastLoadingSelector, shallowEqual);

  const podcastDetails = useSelector(podcastDetailsSelector, shallowEqual);
  const podcastEpisodes = useSelector(podcastEpisodesSelector, shallowEqual);

  useEffect(() => {
    initGetPodcastDetails(idPodcast)
    initGetPodcastEpisodes(idPodcast);
  }, [idPodcast])

  useEffect(() => {
    return;
  }, []);

  return (
    <>
      {(episodeLoading || podcastLoading) ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <div className="flex py-10">
          <PodcastDetails podcastDetails={podcastDetails} />
          <TableEpisodes podcastEpisodes={podcastEpisodes} />
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
PodcastPage.defaultProps = {
}

PodcastPage.propTypes = {
  initGetPodcastDetails: PropTypes.func.isRequired,
  initGetPodcastEpisodes: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(PodcastPage)
