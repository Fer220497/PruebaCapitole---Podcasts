import React, { useEffect } from 'react';
import './MainPage.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import { selectPodcast } from '../../shared/redux/selectors/podcasts/selector'
import PropTypes from 'prop-types'

import { shallowEqual, useSelector } from 'react-redux';

const MainPage = ({ initGetAllDataPodcast }) => {

  useEffect(() => {
    initGetAllDataPodcast();
  }, [])

  const listItem = useSelector(selectPodcast, shallowEqual);

  console.log({ listItem })
  return (
    <>
      <h1>Main Page</h1>
      <>
        <div>
          {listItem?.feed?.entry?.map((podcast) => {
            return (
              <div key={podcast?.id.attributes?.["im:id"]}>{podcast?.["im:name"]?.label}</div>
            )
          }
          )}

        </div>
      </>

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
  initGetAllDataPodcast: PropTypes.func.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
/*

OLD CODE
import React, { Component } from 'react';
import cx from 'classnames';

export default class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 100,
      liked: false,
    };
  }

  handleLikeClick = () => {
    const { likes, liked } = this.state;
    if (liked) {
      this.setState({ likes: likes - 1, liked: false });
    } else {
      this.setState({ likes: likes + 1, liked: true });
    }
  };

  render() {
    const { likes, liked } = this.state;
    const buttonClasses = cx('like-button', { liked });

    return (
      <>
        <div>
          <h2>Like Button</h2>
        </div>
        <style>{`
          .like-button {
            font-size: 1rem;
            padding: 5px 10px;
            color: #585858;
          }
          .liked {
            font-weight: bold;
            color: #1565c0;
          }
        `}</style>
        <div>
          <button className={buttonClasses} onClick={this.handleLikeClick}>
            Like | <span className="likes-counter">{likes}</span>
          </button>
        </div>
      </>
    );
  }
}


*/