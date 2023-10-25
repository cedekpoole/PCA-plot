import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function PCAGraph({ pcaData, scoresData, parsedSampleInfo, selectedPCs }) {
  const generateOptions = () => {
    const conditionColors = {
      treated: "red",
      untreated: "blue",
    };

    const seriesData = parsedSampleInfo.map((sample, idx) => {
      return {
        name: Object.values(sample)[0],
        color: conditionColors[sample.condition],
        data: [[scoresData[idx][0], scoresData[idx][1]]],
      };
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
          marker: {
            radius: 5,
          },
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: "",
          },
        },
      },
      series: seriesData.map((series, index) => ({
        ...series,
        data: [
          [
            scoresData[index][sortedPCs[0] - 1],
            scoresData[index][sortedPCs[1] - 1],
          ],
        ],
      })),
    };
  };

  return (
    <div className="mt-6 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full lg:mr-4">
        <HighchartsReact highcharts={Highcharts} options={generateOptions()} />
      </div>
      <div className="lg:w-1/2 w-full bg-gray-200 lg:mt-0 mt-4">
        {/* Your second chart will go here */}
        <p>Placeholder for the second chart</p>
      </div>
    </div>
  );
}

export default PCAGraph;
