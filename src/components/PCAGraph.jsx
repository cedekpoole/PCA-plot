import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_exporting from "highcharts/modules/exporting";
import highchartsAccessibility from "highcharts/modules/accessibility";

// initialising Highcharts with additional modules
highchartsAccessibility(Highcharts);
HC_exporting(Highcharts);

function PCAGraph({ pcaData, scoresData, parsedSampleInfo, selectedPCs }) {
  const generateOptions = () => {

    const conditionColors = {
      treated: "red",
      untreated: "blue",
    };

    const seriesData = {
        treated: {
          name: "Treated",
          color: conditionColors.treated,
          data: [],
        },
        untreated: {
          name: "Untreated",
          color: conditionColors.untreated,
          data: [],
        },
      };

      console.log(parsedSampleInfo[0]);

      parsedSampleInfo.forEach((sample, idx) => {
        const point = {
          x: scoresData[idx][selectedPCs[0] - 1],
          y: scoresData[idx][selectedPCs[1] - 1],
          name: Object.values(sample)[0] // This will be used in the tooltip
        };
        seriesData[sample.condition].data.push(point);
      });

    // Sort the selected PCs in ascending order
    const sortedPCs = [...selectedPCs].sort((a, b) => a - b);

    return {
      chart: {
        type: "scatter",
      },
      title: {
        text: "",
      },
      xAxis: {
        title: {
          text: `PC${sortedPCs[0]} (${(
            pcaData[`pc${sortedPCs[0]}`] * 100
          ).toFixed(2)}%)`,
        },
      },
      yAxis: {
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
    <div className="mt-6 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full lg:mr-4">
        <HighchartsReact highcharts={Highcharts} options={generateOptions()} />
      </div>
      <div className="lg:w-1/2 w-full bg-gray-200 lg:mt-0 mt-4">
        <p>Placeholder for the second chart</p>
      </div>
    </div>
  );
}

export default PCAGraph;
