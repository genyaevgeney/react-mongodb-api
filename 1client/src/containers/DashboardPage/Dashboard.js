import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getTracks } from '../../actions/tracks';
import '../../assets/scss/DashboardPage.css';
import Header from '../../components/DashboardPage/Header';
import BlockInfo from '../../components/DashboardPage/BlockInfo';
import DonationService from "../../services/DonationService";


const Dashboard = ({paginationData, tracks, onAddTrack, onFindTrack, onGetTracks, ownProps, getApiData }) => {
  
  console.log('ownProps', ownProps);
  let trackInput = '';
  let searchInput = '';
  const name = 'Test';

  // useEffect(() => {
  //     getApiData(ownProps.params.id)
  //   });

useEffect(() => getApiData(ownProps.params.id), [])

  const addTrack = () => {
      console.log('addTrack', trackInput.value);
      onAddTrack(trackInput.value);
      trackInput.value = '';
  }

  const findTrack = () => {
    console.log('findTrack', searchInput.value);
    onFindTrack(searchInput.value);
  }
  const showPage = () => {
    if (paginationData[0] === undefined) return <h1>Loading data</h1>
      return (
              <div>
              <Header/>
              <BlockInfo paginationData={paginationData}/>
              </div>
        )
  }

  return (
    showPage()
  );
}

export default connect(
  (state, ownProps) => ({
    tracks: state.tracks.filter(track => track.name.includes(state.filterTracks)),
    ownProps,
    paginationData: state.donations
  }),
  dispatch => ({
    onAddTrack: (name) => {
      const payload = {
        id: Date.now().toString(),
        name
      };
      dispatch({ type: 'ADD_TRACK', payload });
    },
    onFindTrack: (name) => {
      console.log('name', name);
      dispatch({ type: 'FIND_TRACK', payload: name});
    },
    onGetTracks: () => {
      dispatch(getTracks());
    },
    getApiData: async (paramsId) => {
      const { data } = await DonationService.fetchPageData(paramsId);
      dispatch({ type: 'GET_API', data});
    }
  })
)(Dashboard);
