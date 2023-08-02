import React, { useEffect, useState, useMemo } from 'react';
import './MainPage.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import { selectPodcast } from '../../shared/redux/selectors/podcasts/selector'
import PropTypes from 'prop-types'

import { shallowEqual, useSelector } from 'react-redux';
import CardPodcast from '../../components/CardPodcast/CardPodcast';

const MainPage = ({ initGetAllDataPodcast }) => {

  useEffect(() => {
    initGetAllDataPodcast();
  }, [])

  const listItem = useSelector(selectPodcast, shallowEqual);
  const [filter, setFilter] = useState('');


  // Function to update the filter value when the input changes
  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };

  // Function to filter the items based on the current filter value
  const filteredItems = useMemo(() => {
    const itemFilteredByTitle = listItem.filter((item) => item?.title?.label?.toLowerCase().includes(filter?.toLowerCase()));
    const itemFilteredByAuthor = listItem.filter((item) => item?.artist?.label?.toLowerCase().includes(filter?.toLowerCase()));
    const listWithDuplicates = [...new Set([...itemFilteredByTitle, ...itemFilteredByAuthor])];
    console.log({ listWithDuplicates })
    return Array.from(listWithDuplicates);

  }, [filter, listItem]);
  return (
    <>
      <h1>Main Page</h1>
      <div className='w-full flex justify-end'>
        <div className='border-2 rounded-lg bg-blue-500 p-1 text-white text-2sm font-bold inline-block'>{filteredItems?.length}</div>
        <input
          type="text"
          value={filter}
          onChange={handleInputChange}
          placeholder="Filter podcasts..."
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm'
        />
      </div>
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {filteredItems?.map((podcast) => {
            return (
              <CardPodcast key={podcast?.id.attributes?.id} podcast={podcast}></CardPodcast>
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