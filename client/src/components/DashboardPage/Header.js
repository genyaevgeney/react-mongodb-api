import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="Donating__header">
      <div className="container">
        <div className="row Donating__row-of-header">
          <div className="col-2">
            <Link to="/page=1" className="Donating__link">
              Dashboard
            </Link>
          </div>
          <div className="col-2">
            <Link to="/donation" className="Donating__link">
              Donate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
