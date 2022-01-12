import { useEffect, useState } from "react";

function useGoogleCharts() {
  const [google, setGoogle] = useState(null);

  useEffect(() => {
    if (!google) {
      const head = document.head;
      let script = document.getElementById("googleChartsScript");
      if (!script) {
        script = document.createElement("script");
        script.src = "https://www.gstatic.com/charts/loader.js";
        script.id = "googleChartsScript";
        script.onload = () => {
          if (window.google && window.google.charts) {
            window.google.charts.load("current", {
              packages: ["corechart"],
            });

            window.google.charts.setOnLoadCallback(() =>
              setGoogle(window.google)
            );
          }
        };
        head.appendChild(script);
      } else if (
        window.google &&
        window.google.charts &&
        window.google.visualization
      ) {
        setGoogle(window.google);
      }
    }
    return () => {
      let script = document.getElementById("googleChartsScript");
      if (script) {
        script.remove();
      }
    };
  }, [google]);

  return google;
}

const BarGraph = (props) => {
  const [chart, setChart] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(null);
    if (props.google) {
      let data;
      try {
        data = google.visualization.arrayToDataTable(props.data);
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
  }, [props.google, props.width, props.data]);
  return (
    <div>
      <div styel={{ width: "100%", height: "20rem" }} id="chart_div" />
      <p style={{ textAlign: "center", color: "grey" }}>{errorMessage}</p>
    </div>
  );
};

const EmailGraph = () => {
  const google = useGoogleCharts();
  const data = [
    ["Day", "Target", "Average", "Basketball", "Workout"],
    ["M", 1.6, 0, 3, 2],
    ["T", 1.6, 0, 1, 0],
    ["W", 1.6, 0, 1, 0.2],
    ["T", 1.6, 0, 1, 0.33],
    ["F", 1.6, 0, 2, 0.45],
    ["S", 1.6, 0, 2, 0.1],
    ["S", 1.6, 0, 3, 3],
  ];
  return (
    <div>
      <BarGraph google={google} data={data} />
    </div>
  );
};

export default EmailGraph;
