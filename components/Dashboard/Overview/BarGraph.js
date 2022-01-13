import React, { useEffect, useState } from "react";
import classes from "./Overview.module.css";

// import { ResponsiveBar } from "@nivo/bar";

const BarGraph = (props) => {
  const [chart, setChart] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);
  const options = {
    title: "",
    vAxis: {
      title: "Hours",
      minValue: 0,
      gridlines: { color: "#e4e4e4", count: 4 },
      textStyle: { color: "black" },
    },
    bar: { groupWidth: "75%" },
    colors: [
      "red",
      "grey",
      "#63CA6E",
      "#3CB9EE",
      "#B472E8",
      "#E87272",
      "#FF9052",
    ],
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
  useEffect(() => {
    setErrorMessage(null);
    if (props.data && props.data.length === 0) {
      setErrorMessage("loading");
      return;
    }
    if (props.data && props.google) {
      let data;
      try {
        data = google.visualization.arrayToDataTable(props.data);
        setData(data);
        // Set chart options

        // Instantiate and draw our chart, passing in some options.
        const newChart = new google.visualization.ComboChart(
          document.getElementById("chart_div")
        );
        newChart.draw(data, options);
        // newChart.draw(data, google.charts.ComboChart.convertOptions(options));

        setChart(newChart);
      } catch {
        console.log("caught error in rendering graph");
        setErrorMessage("something went wrong");
        return;
      }
    }
  }, [props.google, props.data]);

  useEffect(() => {
    if (chart) {
      chart.draw(data, options);
    }
  }, [props.width]);

  return (
    <div style={{ position: "relative" }}>
      <div className={classes.chart} id="chart_div">
        <p className={classes.error}>{errorMessage}</p>
      </div>
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
