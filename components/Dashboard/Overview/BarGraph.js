import React, { useEffect, useState } from "react";
import classes from "./Overview.module.css";

// import { ResponsiveBar } from "@nivo/bar";
function drawVisualization() {
  // Some raw data (not necessarily accurate)
  var data = google.visualization.arrayToDataTable([
    [
      "Month",
      "Bolivia",
      "Ecuador",
      "Madagascar",
      "Papua New Guinea",
      "Rwanda",
      "Average",
    ],
    ["2004/05", 165, 938, 522, 998, 450, 614.6],
    ["2005/06", 135, 1120, 599, 1268, 288, 682],
    ["2006/07", 157, 1167, 587, 807, 397, 623],
    ["2007/08", 139, 1110, 615, 968, 215, 609.4],
    ["2008/09", 136, 691, 629, 1026, 366, 569.6],
  ]);

  var options = {
    title: "Monthly Coffee Production by Country",
    vAxis: { title: "Cups" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  var chart = new google.visualization.ComboChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}
const BarGraph = (props) => {
  const [chart, setChart] = useState(null);
  useEffect(() => {
    if (props.google && !chart) {
      const data = google.visualization.arrayToDataTable(props.data);
      // const data = new google.visualization.DataTable();
      // data.addColumn("string", "Day");
      // data.addColumn("number", "Hours");
      // data.addRows([
      //   ["Monday", 3],
      //   ["Tuesday", 1],
      //   ["Wednesday", 1],
      //   ["Thursday", 1],
      //   ["Friday", 2],
      //   ["Saturday", 2],
      //   ["Sunday", 3],
      // ]);

      // Set chart options
      var options = {
        title: "Weekly Report",
        vAxis: {
          title: "Hours",
          minValue: 0,
          gridlines: { color: "#e4e4e4", count: 4 },
          textStyle: { color: "black" },
        },
        bar: { groupWidth: "75%" },
        colors: ["red", "grey", "#63CA6E", "#3CB9EE", "#B472E8", "#E87272", "#FF9052"],
        seriesType: "bars",
        series: {
          0: {
            type: "line",
            lineDashStyle: [4, 4],
          },
          1: {
            type: "line",
            lineDashStyle: [4, 4],
          },
        },
        curveType: "function",
        isStacked: true,
        chartArea: { width: "90%", height: "80%" },
        animation: { startup: true },
        legend: { position: "bottom" },
      };

      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.ComboChart(
        document.getElementById("chart_div")
      );
      newChart.draw(data, options);
      // newChart.draw(data, google.charts.ComboChart.convertOptions(options));

      setChart(newChart);
    }
  }, [props.google, chart]);

  return (
    <div>
      <div className={classes.chart} id="chart_div"></div>
    </div>
  );
};

export default BarGraph;

// <ResponsiveBar
//   data={data}
//   keys={["Hours"]}
//   indexBy={"Day"}
//   margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//   padding={0.3}
//   valueScale={{ type: "linear" }}
//   indexScale={{ type: "band", round: true }}
//   colors="#63CA6E"
//   borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
//   animate={false}
//   axisTop={null}
//   axisRight={null}
//   axisBottom={{
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: 0,
//     legend: "day",
//     legendPosition: "middle",
//     legendOffset: 32,
//   }}
//   axisLeft={{
//     tickSize: 5,
//     tickPadding: 5,
//     tickRotation: 0,
//     legend: "hours",
//     legendPosition: "middle",
//     legendOffset: -40,
//   }}
//   labelSkipWidth={12}
//   labelSkipHeight={12}
//   labelTextColor="#ffffff"
//   defs={[
//     {
//       id: "solidGreen",
//       background: "inherit",
//       color: "#63CA6E",
//       size: 4,
//       padding: 1,
//       stagger: true,
//     },
//   ]}
//   fill={[
//     {
//       match: {
//         id: "Hours",
//       },
//       id: "solidGreen",
//     },
//   ]}
// />
