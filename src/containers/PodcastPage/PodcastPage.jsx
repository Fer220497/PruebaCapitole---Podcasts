import React, { useEffect } from 'react';
import './PodcastPage.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, useSelector, shallowEqual } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import PropTypes from 'prop-types'
import { podcastDetailsSelector, podcastEpisodesSelector } from '../../shared/redux/selectors/podcasts/selector'
import { useParams } from "react-router-dom";
import PodcastDetails from '../../components/PodcastDetails/PodcastDetails';
import TableEpisodes from '../../components/TableEpisodes/TableEpisodes'

const PodcastPage = ({ initGetPodcastDetails, initGetPodcastEpisodes }) => {


  const { idPodcast } = useParams()

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
      <div className="flex py-10">
        <PodcastDetails podcastDetails={podcastDetails} />
        <TableEpisodes podcastEpisodes={podcastEpisodes} />
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
PodcastPage.defaultProps = {
}

PodcastPage.propTypes = {
  initGetPodcastDetails: PropTypes.func.isRequired,
  initGetPodcastEpisodes: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(PodcastPage)
