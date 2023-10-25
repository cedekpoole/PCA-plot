import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function ScreePlot({ pcaData }) {
    const options = {
        chart: {
            type: "column"
        },
        title: {
            text: ".",
            color: "transparent"
        },
        xAxis: {
            categories: Object.keys(pcaData).map(key => key.toUpperCase()), // Convert to uppercase for better labeling
            title: {
                text: "Principle Component"
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: "% of Variance Explained"
            }
        },
        plotOptions: {
            column: {
                tooltip: {
                    pointFormat: "<b>{point.y:.2f}%</b>"
                }
            }
        },
        series: [{
            name: "Variance",
            data: Object.values(pcaData).map(value => value * 100) // Convert to percentage
        }]
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}

export default ScreePlot;