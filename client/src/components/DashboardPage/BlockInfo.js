import React from "react";

class BlockInfo extends React.Component {
  createInfoBlocks() {
    let row = [];
    for (let i = 0; i < 3; i++) {
      let infoBlocks = [];
      let blockChilds = [];
      if (this.props.blockInfoData[i].length === 3) {
        blockChilds.push(
          <p className="Donating__block-headline">
            {this.props.blockInfoData[i][0]}
          </p>
        );
        blockChilds.push(
          <p className="Donating__block-price">
            {this.props.blockInfoData[i][1]}
          </p>
        );
        blockChilds.push(
          <p className="Donating__block-person">
            {this.props.blockInfoData[i][2]}
          </p>
        );
      } else {
        blockChilds.push(
          <p className="Donating__block-headline">
            {this.props.blockInfoData[i][0]}
          </p>
        );
        blockChilds.push(
          <p className="Donating__block-price">
            {this.props.blockInfoData[i][1]}
          </p>
        );
      }

      if (this.props.page === "user") {
        infoBlocks.push(
          <div className="Donating__information-block user-block">
            {blockChilds}
          </div>
        );
      }

      if (this.props.page === "all") {
        infoBlocks.push(
          <div className="Donating__information-block all-block">
            {blockChilds}
          </div>
        );
      }

      row.push(<div className="col-4">{infoBlocks}</div>);
    }
    return row;
  }

  render() {
    console.log(this.props.blockInfoData);
    return (
      <div className="container">
        <div className="row Donating__information-section">
          {this.createInfoBlocks()}
        </div>
      </div>
    );
  }
}

export default BlockInfo;
