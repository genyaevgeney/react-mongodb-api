import React from "react";
import { connect } from "react-redux";
import "../../assets/scss/DashboardPage.css";
import Navbar from "../../components/Navbar";
import BlockInfo from "../../components/DashboardPage/BlockInfo";
import Chart from "../../components/DashboardPage/Chart";
import Pagination from "../../components/DashboardPage/Pagination";
import DonationService from "../../services/DonationService";

class Dashboard extends React.Component {
  componentDidUpdate(prevProps) {
    this.props.paginationData[0] = undefined;
    this.isNewRequest = true;
    if (this.props.ownProps.params.id !== prevProps.ownProps.params.id) {
      this.props.getApiData(this.props.ownProps.params.id);
      console.log("update");
    }
  }

  componentDidMount() {
    this.props.getApiData(this.props.ownProps.params.id);
    console.log("mount");
  }

  getBlockInfoData() {
    const blockInfoData = [
      [
        "Top Donator",
        this.props.paginationData[0].maxAmount,
        this.props.paginationData[0].topDonator
      ],
      ["Last Month Amount", this.props.paginationData[0].amountForThisMonth],
      ["All time amount", this.props.paginationData[0].amount]
    ];
    return blockInfoData;
  }

  render() {
    if (this.props.paginationData[0] === undefined) {
      console.log("load data");
      return "load data";
    }
    if (this.props.paginationData[0].emptyDashboard) {
      return (
        <div>
          <Navbar router={this.props.ownProps.router} />
          <div class="alert alert-info alert-dismissible fade show">
            <strong>Info!</strong> No one has donated yet, so the statistics are
            not available.
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
          </div>
        </div>
      );
    }
    if (this.props.paginationData[0].badRequest) {
      this.props.ownProps.router.push("/error");
      return "error";
    }
    console.log(this.props.paginationData[0]);
    return (
      <div>
        <Navbar router={this.props.ownProps.router} />
        <BlockInfo blockInfoData={this.getBlockInfoData()} page={"all"} />
        <Chart chartData={this.props.paginationData[0].dataForChart} />
        <Pagination
          perPage={this.props.paginationData[0].perPage}
          collectionCount={this.props.paginationData[0].collectionCount}
          donations={this.props.paginationData[0].donations}
          paginationPages={this.props.paginationData[0].paginationPages}
          current={this.props.paginationData[0].current}
          paginationType={this.props.paginationData[0].paginationType}
        />
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    ownProps,
    paginationData: state.donations
  }),
  dispatch => ({
    getApiData: async paramsId => {
      const { data } = await DonationService.fetchPageData(paramsId);
      dispatch({ type: "GET_API", data });
    }
  })
)(Dashboard);
