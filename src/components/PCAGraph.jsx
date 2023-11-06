import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HC_annotations from "highcharts/modules/annotations";
// initializing Highcharts with additional modules
highchartsAccessibility(Highcharts);
HC_exporting(Highcharts);
HC_annotations(Highcharts);

function PCAGraph({ pcaData, scoresData, parsedSampleInfo, selectedPCs }) {
  const generateOptions = () => {
    const colorsArray = [
      "rgb(254,125,43)",
      "rgb(60,89,193)",
      "rgb(0,128,0)" /* Add more colors if needed */,
    ];
    let colorIdx = 0;

    const seriesData = {};
    let initialAnnotations = []; // Array to hold initial annotations

    // Sort the selected PCs in ascending order
    const sortedPCs = [...selectedPCs].sort((a, b) => a - b);

    parsedSampleInfo.forEach((sample) => {
      if (!seriesData[sample.condition]) {
        seriesData[sample.condition] = {
          name: sample.condition,
          color: colorsArray[colorIdx], // Assign a color from the array
          data: [],
        };

        colorIdx++;
      }
    });

    parsedSampleInfo.forEach((sample, idx) => {
      const point = {
        x: scoresData[idx][sortedPCs[0] - 1],
        y: scoresData[idx][sortedPCs[1] - 1],
        name: Object.values(sample)[0],
        id: 'point' + idx, // Unique ID for the point
        ...sample,
      };
      seriesData[sample.condition].data.push(point);
      
      // Add a default annotation for each point
      initialAnnotations.push({
        labels: [
          {
            point: 'point' + idx,
            text: point.name,
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderColor: 'black',
            shape: 'connector',
            overflow: 'justify',
            crop: true,
          },
        ],
        labelOptions: {
          shape: 'connector',
          align: 'right',
          justify: false,
          crop: true,
          style: {
            fontSize: '0.7em',
            textOutline: '1px white',
          },
          allowOverlap: true,
        },
      });
    });

    return {
      chart: {
        type: "scatter",
        events: {
          load: function () {
            // Add default annotations on load
            this.annotations.forEach((annotation) => {
              annotation.labels[0].options.point = this.get(annotation.labels[0].options.point);
            });
          }
        }
      },
      title: {
        text: ".",
        color: "transparent",
      },
      xAxis: {
        title: {
          text: `PC${sortedPCs[0]} (${(pcaData[`pc${sortedPCs[0]}`] * 100).toFixed(2)}%)`,
        },
      },
      yAxis: {
        lineWidth: 1,
        title: {
          text: `PC${sortedPCs[1]} (${(pcaData[`pc${sortedPCs[1]}`] * 100).toFixed(2)}%)`,
        },
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
                // Check if the point already has an annotation
                const annotation = chart.annotations.find((a) => a.labels[0].options.point.x === this.x && a.labels[0].options.point.y === this.y);
                if (annotation) {
                  // Remove the existing annotation
                  chart.removeAnnotation(annotation);
                } else {
                  // Add a new annotation
                  chart.addAnnotation({
                    labels: [
                      {
                        point: this,
                        text: this.name,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        borderColor: 'black',
                        shape: 'connector',
                        overflow: 'justify',
                        crop: true,
                      },
                    ],
                    labelOptions: {
                      shape: 'connector',
                      align: 'right',
                      justify: false,
                      crop: true,
                      style: {
                        fontSize: '0.7em',
                        textOutline: '1px white',
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
      annotations: initialAnnotations, // Include the default annotations
    };
  };

  return (
    <div className="h-[600px] w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={generateOptions()}
        containerProps={{ className: "h-full" }}
      />
    </div>
  );
}

export default PCAGraph;