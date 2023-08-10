import React, { useEffect, useState, useMemo } from 'react';
import './MainPage.css';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import * as podcastsActions from '../../shared/redux/actions/podcasts/podcasts-actions';
import { allPodcastsDataSelector } from '../../shared/redux/selectors/podcasts/selector'
import PropTypes from 'prop-types'

import { shallowEqual, useSelector } from 'react-redux';
import CardPodcast from '../../components/CardPodcast/CardPodcast';
import SearchBarWithCounter from '../../components/SearchBarWithCounter/SearchBarWithCounter';

const MainPage = ({ initGetAllDataPodcast }) => {



  const listItem = useSelector(allPodcastsDataSelector, shallowEqual);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    initGetAllDataPodcast();
  }, [])
  // Function to update the filter value when the input changes
  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };

  // Function to filter the items based on the current filter value
  const filteredItems = useMemo(() => {
    const itemFilteredByTitle = listItem.filter((item) => item?.title?.label?.toLowerCase().includes(filter?.toLowerCase()));
    const itemFilteredByAuthor = listItem.filter((item) => item?.artist?.label?.toLowerCase().includes(filter?.toLowerCase()));
    const listWithDuplicates = [...new Set([...itemFilteredByTitle, ...itemFilteredByAuthor])];
    return Array.from(listWithDuplicates);
  }, [filter, listItem]);


  return (
    <>
      <SearchBarWithCounter items={filteredItems} handleOnChange={handleInputChange} filter={filter} />
      <>
        <div className="grid md:grid-cols-4 gap-4 container mx-auto" data-testid="listElements">
          {filteredItems?.map((podcast) => {
            return (
              <CardPodcast key={podcast?.id.attributes?.id} podcast={podcast} ></CardPodcast>
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