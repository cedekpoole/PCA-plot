import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import highchartsAccessibility from "highcharts/modules/accessibility";

// initialising Highcharts with additional modules
highchartsAccessibility(Highcharts);
HC_exporting(Highcharts);

function PCAGraph({ pcaData, scoresData, parsedSampleInfo, selectedPCs }) {
  const generateOptions = () => {
    const colorsArray = [
      "rgb(254,125,43)",
      "rgb(60,89,193)",
      "rgb(0,128,0)" /* Add more colors if needed */,
    ];
    let colorIdx = 0;

    const seriesData = {};

    // Sort the selected PCs in ascending order
    const sortedPCs = [...selectedPCs].sort((a, b) => a - b);

    parsedSampleInfo.forEach((sample) => {
      if (!seriesData[sample.condition]) {
        // If this condition is not yet in seriesData, add it
        seriesData[sample.condition] = {
          name: sample.condition,
          color: colorsArray[colorIdx], // Assign a color from the array
          data: [],
        };

        // Increment colorIdx so next new condition gets a different color
        colorIdx++;
      }
    });

    parsedSampleInfo.forEach((sample, idx) => {
      const point = {
        x: scoresData[idx][sortedPCs[0] - 1],
        y: scoresData[idx][sortedPCs[1] - 1],
        name: Object.values(sample)[0],
        ...sample
      };
      seriesData[sample.condition].data.push(point);
    });

    return {
      chart: {
        type: "scatter",
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
          dataLabels: {
            enabled: true, // Enable data labels by default
            format: "{point.name}", // Display the point name
            allowOverlap: true, // Allow labels to overlap
          },
          point: {
            events: {
              click: function () {
                // Toggle the visibility of the data label on click
                this.dataLabel.attr({
                  visibility: this.dataLabel.visible ? "hidden" : "visible",
                });
                this.dataLabel.visible = !this.dataLabel.visible;
              },
            },
          },
        },
      },
      series: Object.values(seriesData),
    };
  };

  return (
<div className="h-[600px] w-full"> 
    <HighchartsReact 
      highcharts={Highcharts} 
      options={generateOptions()} 
      containerProps={{ className: "h-full"}} 
    />
  </div>
  );
}

export default PCAGraph;
