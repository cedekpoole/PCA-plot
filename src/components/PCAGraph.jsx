import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HC_annotations from "highcharts/modules/annotations";
import { useState, useEffect } from "react";

// Initializing Highcharts with additional modules
highchartsAccessibility(Highcharts);
HC_exporting(Highcharts);
HC_annotations(Highcharts);

function PCAGraph({
  pcaData,
  scoresData,
  parsedSampleInfo,
  selectedPCs,
  colorBy,
}) {
  // State to manage the chart's options
  const [chartOptions, setChartOptions] = useState(null);

  let colorIdx = 0;
  const seriesData = {};
  const initialAnnotations = [];
  const colorsArray = [
    "rgb(254,125,43)",
    "rgb(60,89,193)",
    "rgb(0,128,0)", // Add more colors if needed
  ];

  // Sort the selected PCs in ascending order
  const sortedPCs = [...selectedPCs].sort((a, b) => a - b);

  useEffect(() => {
    setChartOptions({ ...options });
  }, [colorBy]); // Rerun when colorBy changes

  parsedSampleInfo.forEach((sample, idx) => {
    if (!seriesData[sample[colorBy]]) {
      seriesData[sample[colorBy]] = {
        name: sample[colorBy],
        color: colorsArray[colorIdx % colorsArray.length], // Assign a color from the array
        data: [],
      };

      colorIdx++;
    }
    const point = {
      x: scoresData[idx][sortedPCs[0] - 1],
      y: scoresData[idx][sortedPCs[1] - 1],
      name: Object.values(sample)[0],
      id: "point" + idx, // Unique ID for the point
      ...sample,
    };
    seriesData[sample[colorBy]].data.push(point);

    // Add a default annotation for each point
    initialAnnotations.push({
      id: "annotation-point" + idx, // Unique ID for the annotation
      labels: [
        {
          point: "point" + idx,
          text: point.name,
          backgroundColor: "rgba(255,255,255,0.5)",
          borderColor: "black",
          shape: "connector",
          overflow: "justify",
          crop: true,
        },
      ],
      labelOptions: {
        shape: "connector",
        align: "right",
        justify: false,
        crop: true,
        style: {
          fontSize: "0.7em",
          fontWeight: "bold",
          textOutline: "1px white",
        },
        allowOverlap: true,
      },
    });
  });

  const options = {
    chart: {
      type: "scatter",
      events: {
        load: function () {
          // Add default annotations on load
          this.annotations.forEach((annotation) => {
            annotation.labels[0].options.point = this.get(
              annotation.labels[0].options.point
            );
          });
        },
      },
    },
    title: {
      text: ".",
      color: "transparent",
    },
    xAxis: {
      title: {
        text: `PC${sortedPCs[0]} (${(
          pcaData[`pc${sortedPCs[0]}`] * 100
        ).toFixed(2)}%)`,
      },
    },
    yAxis: {
      lineWidth: 1,
      title: {
        text: `PC${sortedPCs[1]} (${(
          pcaData[`pc${sortedPCs[1]}`] * 100
        ).toFixed(2)}%)`,
      },
    },
    tooltip: {
      hideDelay: 200,
    },
    plotOptions: {
      scatter: {
        tooltip: {
          pointFormat: "<b>{point.name}</b><br>Type: {point.type}",
        },
      },
      series: {
        marker: {
          symbol: "circle",
          radius: 4,
        },
        states: {
          inactive: {
            opacity: 1,
          },
        },
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              const chart = this.series.chart;
              // Use point's ID to find the associated annotation
              const annotation = chart.annotations.find(
                (a) => a.options.id === "annotation-" + this.id
              );
              if (annotation) {
                // Remove the existing annotation using the annotation's ID
                chart.removeAnnotation(annotation.options.id);
              } else {
                // Add a new annotation for the point
                chart.addAnnotation({
                  id: "annotation-" + this.id,
                  labels: [
                    {
                      point: this.id,
                      text: this.name,
                      backgroundColor: "rgba(255,255,255,0.5)",
                      borderColor: "black",
                      shape: "connector",
                      overflow: "justify",
                      crop: true,
                    },
                  ],
                  labelOptions: {
                    shape: "connector",
                    align: "right",
                    justify: false,
                    crop: true,
                    style: {
                      fontSize: "0.7em",
                      fontWeight: "bold",
                      textOutline: "1px white",
                    },
                    allowOverlap: true,
                  },
                });
              }
            },
          },
        },
      },
    },
    series: Object.values(seriesData),
    annotations: initialAnnotations,
  };

  return (
    <div className="h-[600px] w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: "h-full" }}
      />
    </div>
  );
}

export default PCAGraph;
