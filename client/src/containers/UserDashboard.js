import React from "react";
import { connect } from "react-redux";
import "../assets/scss/DashboardPage.css";
import Navbar from "../components/Navbar";
import BlockInfo from "../components/DashboardPage/BlockInfo";
import Chart from "../components/DashboardPage/Chart";
import Pagination from "../components/DashboardPage/Pagination";
import DonationService from "../services/DonationService";

class UserDashboard extends React.Component {
  componentDidUpdate(prevProps) {
    this.props.paginationData[0] = undefined;
    if (this.props.ownProps.params.id !== prevProps.ownProps.params.id) {
      this.props.getApiData(
        this.props.ownProps.params.id,
        this.props.auth.user.login
      );
      console.log("update");
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.ownProps.router.push("/");
      return;
    }
    this.props.getApiData(
      this.props.ownProps.params.id,
      this.props.auth.user.login
    );
    console.log("mount");
  }

  getBlockInfoData() {
    const blockInfoData = [
      ["Best Donation", this.props.paginationData[0].maxAmount],
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
            <strong>Info!</strong> You haven't donated yet, so no statistics are
            available.
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
        <BlockInfo blockInfoData={this.getBlockInfoData()} page={"user"} />
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
    paginationData: state.userDonations,
    auth: state.auth
  }),
  dispatch => ({
    getApiData: async (paramsId, login) => {
      const { data } = await DonationService.fetchUserPageData(paramsId, login);
      dispatch({ type: "GET_API_USER", data });
    }
  })
)(UserDashboard);
