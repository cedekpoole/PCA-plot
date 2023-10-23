import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function PCAGraph({ pcaData, scoresData, parsedSampleInfo }) {
  const generateOptions = () => {
    const conditionColors = {
      treated: "red",
      untreated: "blue",
    };

    const seriesData = parsedSampleInfo.map((sample, idx) => {
      return {
        name: Object.keys(sample)[0], // Sample name
        color: conditionColors[sample.condition],
        data: [[scoresData[idx][0], scoresData[idx][1]]],
      };
    });

    return {
      chart: {
        type: "scatter",
      },
      title: {
        text: "",
      },
      xAxis: {
        title: {
          text: `PC1 (${(pcaData.pc1 * 100).toFixed(2)}%)`,
        },
      },
      yAxis: {
        title: {
          text: `PC2 (${(pcaData.pc2 * 100).toFixed(2)}%)`,
        },
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
          },
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: "PC1: {point.x}, PC2: {point.y}",
          },
        },
      },
      series: seriesData,
    };
  };

  return (
    <div className="mt-6 flex flex-col lg:flex-row">
      <div className="lg:w-3/5 w-full lg:mr-4">
        <HighchartsReact highcharts={Highcharts} options={generateOptions()} />
      </div>
      <div className="lg:w-2/5 w-full bg-gray-200 lg:mt-0 mt-4">
        {/* Your second chart will go here */}
        <p>Placeholder for the second chart</p>
      </div>
    </div>
  );
}

export default PCAGraph;
