import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router';
import { getTracks } from '../../actions/tracks';
import '../../assets/scss/DashboardPage.css';
import Header from '../../components/DashboardPage/Header';
import BlockInfo from '../../components/DashboardPage/BlockInfo';
import Chart from '../../components/DashboardPage/Chart';
import Pagination from '../../components/DashboardPage/Pagination';
import DonationService from "../../services/DonationService";


class Dashboard extends React.Component {
  // constructor() {
  //   super()
  //   this.state = false
  // }

  redirectToErrorPage() {
      return "hi"
  }

  test() {
  }

  componentDidUpdate(prevProps) {
    this.props.paginationData[0] = undefined
    this.isNewRequest = true
    if (this.props.ownProps.params.id !== prevProps.ownProps.params.id) {
        this.props.getApiData(this.props.ownProps.params.id)
        console.log("update")
    }
  }

  componentDidMount() {
    this.props.getApiData(this.props.ownProps.params.id)
    console.log("mount")
  }

  getBlockInfoData() {

    const blockInfoData = [["Top Donator", this.props.paginationData[0].maxAmount, this.props.paginationData[0].topDonator],["Last Month Amount", this.props.paginationData[0].amountForThisMonth], ["All time amount", this.props.paginationData[0].amount]]
    return blockInfoData
  }


  // showPage() {
  //   if (paginationData[0] === undefined) return <h1>Loading data</h1>
  //     console.log(paginationData[0])
  //     return (
  //             <div>
  //             <Header/>
  //             <BlockInfo paginationData={paginationData}/>
  //             </div>
  //       )
  // }

  render() {
    // console.log(this.props.paginationData)
    // console.log(this.props.paginationData[0])
    // if (this.isNewRequest) return "load data"
      // console.log(this.props.paginationData[0])
      // if (this.props.paginationData[0].badRequest) this.props.ownProps.router.push("/error")
      if (this.props.paginationData[0] === undefined) {
        console.log("load data")
        return "load data"
      }
      if (this.props.paginationData[0].badRequest) this.props.ownProps.router.push("/error")
        console.log(this.props.paginationData[0])
        return (
          <div>
          <Header/>
          <BlockInfo blockInfoData={this.getBlockInfoData()}/>
          <Chart chartData={this.props.paginationData[0]}/>
          <Pagination donations={this.props.paginationData[0].donations} paginationPages={this.props.paginationData[0].paginationPages} current={this.props.paginationData[0].current}/>
          </div>
          )
  }
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
