import React from "react";
import { Link } from "react-router";

class Pagination extends React.Component {
  createPaginationList() {
    let tableRows = [];
    for (let i = 0; i < this.props.donations.length; i++) {
      let tableCols = [];
      tableCols.push(
        <td className="Donating__tb-col">
          {this.props.donations[i].volunteerName}
        </td>
      );
      tableCols.push(
        <td className="Donating__tb-col">{this.props.donations[i].email}</td>
      );
      tableCols.push(
        <td className="Donating__tb-col">{this.props.donations[i].amount}</td>
      );
      tableCols.push(
        <td className="Donating__tb-col">{this.props.donations[i].message}</td>
      );
      tableCols.push(
        <td className="Donating__tb-col">
          {JSON.stringify(this.props.donations[i].date).substring(1, 11)}
        </td>
      );

      tableRows.push(<tr className="Donating__tb-row main">{tableCols}</tr>);
    }
    return tableRows;
  }

  createPaginationNav() {
    console.log(this.props.paginationPages);
    if (this.props.paginationPages > 1) {
      let paginationNav = [];
      let paginationNavItem = [];

      if (this.props.current == 1) {
        paginationNavItem.push(
          <li className="disabled">
            <Link>First</Link>
          </li>
        );
      } else {
        if (this.props.paginationType === "allDonations") {
          paginationNavItem.push(
            <li>
              <Link to="/page=1">First</Link>
            </li>
          );
        }
        if (this.props.paginationType === "userDonations") {
          paginationNavItem.push(
            <li>
              <Link to="/userdashboard/1">First</Link>
            </li>
          );
        }
      }
      let i =
        Number(this.props.current) > 5 ? Number(this.props.current) - 4 : 1;
      if (i !== 1) {
        paginationNavItem.push(
          <li className="disabled">
            <Link>...</Link>
          </li>
        );
      }
      for (
        ;
        i <= Number(this.props.current) + 4 && i <= this.props.paginationPages;
        i++
      ) {
        if (i == this.props.current) {
          paginationNavItem.push(
            <li className="active">
              <Link>{i}</Link>
            </li>
          );
        } else {
          if (this.props.paginationType === "allDonations") {
            paginationNavItem.push(
              <li>
                <Link to={`page=${i}`}>{i}</Link>
              </li>
            );
          }
          if (this.props.paginationType === "userDonations") {
            paginationNavItem.push(
              <li>
                <Link to={`userdashboard/${i}`}>{i}</Link>
              </li>
            );
          }
        }
        if (
          i == Number(this.props.current) + 4 &&
          i < this.props.paginationPages
        ) {
          paginationNavItem.push(
            <li className="disabled">
              <Link>...</Link>
            </li>
          );
        }
      }
      if (this.props.current == this.props.paginationPages) {
        paginationNavItem.push(
          <li className="disabled">
            <Link>Last</Link>
          </li>
        );
      } else {
        if (this.props.paginationType === "allDonations") {
          paginationNavItem.push(
            <li>
              <Link to={`page=${this.props.paginationPages}`}>Last</Link>
            </li>
          );
        }
        if (this.props.paginationType === "userDonations") {
          paginationNavItem.push(
            <li>
              <Link to={`userdashboard/${this.props.paginationPages}`}>
                Last
              </Link>
            </li>
          );
        }
      }
      paginationNav.push(
        <ul className="pagination text-center">{paginationNavItem}</ul>
      );
      return paginationNav;
    }
  }

  render() {
    console.log(this.props.paginationType);
    return (
      <div className="container-fluid Dashboard-pagination">
        <div className="Donating__main-info">
          <table className="Donating__table">
            <tr className="Donating__tb-row main">
              <td className="Donating__tb-col headline">Donator Name</td>
              <td className="Donating__tb-col headline">Email</td>
              <td className="Donating__tb-col headline">Amount</td>
              <td className="Donating__tb-col headline">Message</td>
              <td className="Donating__tb-col headline">Date</td>
            </tr>
            {this.createPaginationList()}
          </table>
        </div>
        <div className="Donating__pagination">{this.createPaginationNav()}</div>
      </div>
    );
  }
}

export default Pagination;
