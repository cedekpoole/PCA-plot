import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import highchartsAccessibility from "highcharts/modules/accessibility";
import ScreePlot from "./ScreePlot";

// initialising Highcharts with additional modules
highchartsAccessibility(Highcharts);
HC_exporting(Highcharts);

function PCAGraph({ pcaData, scoresData, parsedSampleInfo, selectedPCs }) {
  const generateOptions = () => {

    const colorsArray = ["rgb(254,125,43)", "rgb(60,89,193)", "rgb(0,128,0)", /* Add more colors if needed */ ];
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
          data: []
        };

        // Increment colorIdx so next new condition gets a different color
        colorIdx++;
      }
    });

      parsedSampleInfo.forEach((sample, idx) => {
        const point = {
          x: scoresData[idx][sortedPCs[0] - 1],
          y: scoresData[idx][sortedPCs[1] - 1],
          name: Object.values(sample)[0] // This will be used in the tooltip
        };
        seriesData[sample.condition].data.push(point);
      });


    return {
      chart: {
        type: "scatter",
      },
      title: {
        text: ".",
        color: "transparent"
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
            pointFormat: "<b>{point.name}</b>",
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
      },
    },
      series: Object.values(seriesData),
    };
  };

  return (
    <div className="flex justify-center">
    <div className="mt-6 flex flex-col lg:flex-row w-4/5">
      <div className="lg:w-1/2 w-full lg:mr-4">
        <HighchartsReact highcharts={Highcharts} options={generateOptions()} />
      </div>
      <div className="lg:w-1/2 w-full lg:mt-0 mt-4">
        <div className="w-2/3">
      <ScreePlot pcaData={pcaData} />
      </div>
      </div>
    </div>
    </div>
  );
}

export default PCAGraph;
