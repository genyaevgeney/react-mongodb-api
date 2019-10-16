import React from "react";
import Chart from "react-google-charts";

class GoogleChart extends React.Component {
  showGoogleChart() {
    const data = [["Date", "Amount"]];
    for (let i = 0; i < this.props.chartData.length; i++) {
      const year = this.props.chartData[i]._id.year;
      const month = this.props.chartData[i]._id.month - 1;
      const day = this.props.chartData[i]._id.day;
      const date = new Date(year, month, day + 1);

      data.push([
        `${JSON.stringify(date).substring(1, 11)}`,
        this.props.chartData[i].totalAmount
      ]);
    }
    const options = {
      title: "Donation Statistics",
      curveType: "function",
      legend: { position: "bottom" }
    };
    return (
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  }
  render() {
    return this.showGoogleChart();
  }
}

export default GoogleChart;
