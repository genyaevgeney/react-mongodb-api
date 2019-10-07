import React from 'react';
import Chart from "react-google-charts";

class GoogleChart extends React.Component  {
	showGoogleChart() {
		const data = [["Date", "Amount"]];
		// console.log(this.props.chartData.dataForChart)
		// console.log(new Date(2019,10-1,7))
		// console.log(this.props.chartData.dataForChart[0].totalAmount)
		// console.log(this.props.chartData.dataForChart)
		for (let i = 0; i < this.props.chartData.dataForChart.length; i++) {
			const year = this.props.chartData.dataForChart[i]._id.year
			const month = this.props.chartData.dataForChart[i]._id.month - 1
			const day = this.props.chartData.dataForChart[i]._id.day
			const date = new Date(year, month, day+1)
			
			data.push([
				`${JSON.stringify(date).substring(1, 11)}`,
				this.props.chartData.dataForChart[i].totalAmount
				]);
		}
		const options = {
			title: "Donation Statistics",
			curveType: "function",
			legend: { position: "bottom" }
		};
		return <Chart
		chartType="LineChart"
		width="100%"
		height="400px"
		data={data}
		options={options}
		/>
	}
	render() {
		return this.showGoogleChart()
	}
}

export default GoogleChart;