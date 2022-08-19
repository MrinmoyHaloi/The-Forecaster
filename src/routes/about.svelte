<!-- <script>
    import {onMount} from "svelte";
    onMount(() => {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "dark2",
            title: {
                text: "Rise in global surface temparature"
            },
            data: [
                {
                    type: "line",
                    indexLabelFontSize: 16,
                    dataPoints: [
                        { label: "1880", y: -0.1 },
                        { label: "1900", y: -0.23 },
                        { label: "1920", y: -0.17 },
                        { label: "1940", y: 0.22 },
                        { label: "1960", y: 0.1 },
                        { label: "1980", y: 0.21 },
                        { label: "2000", y: 0.61 },
                        { label: "2022", y: 1.0 }
                    ],
                    showInLegend: true,
                    name: "Average Surface Temperature",
                }
            ]
        });
        chart.options.axisY = { suffix: "°C" };
        chart.render();
    });
</script>

<div class="container mt-5 pt-5">
    <div id="chartContainer" style="height: 300px; width: 600px; margin: 0 auto" class="mt-3" />
</div> -->
<script>
    import { onMount } from "svelte";
    // import { Chart, registerables } from 'chart.js';
    const {Chart, registerables } = require('chart.js');
    Chart.register(...registerables);

    let myChart;
    const labels = ["1880", "1900", "1920", "1940", "1960", "1980", "2000", "2022"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Temparature",
                backgroundColor: "rgb(255, 255, 255)",
                borderColor: "#3080d0",
                data: [-0.1, -0.23, -0.17, 0.22, 0.1, 0.21, 0.61, 1.0],
                cubicInterpolationMode: "monotone",
                hoverRadius: 7
            }
        ]
    };
    let delayed;

    onMount(() => {
        const config = {
            type: "line",
            data: data,
            options: {
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === "data" && context.mode === "default" && !delayed) {
                            delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        }
                        return delay;
                    }
                },
                responsive: true,
                borderRadius: 10,
                scales: {
                    y: {
                        max: 1.2,
                        
                    }
                },
                plugins: {
                    legend: {
                        position: "bottom"
                    },
                    title: {
                        display: true,
                        text: "Rise in global surface temparature",
                        color: "#fff",
                        font: {
                            size: 20
                        }
                    }
                }
            }
        };
        myChart = new Chart(document.getElementById("myChart"), config);
    });
</script>

<div class="container mt-5 vh-100 d-flex">
    <div class="w-75 m-auto">
        <canvas id="myChart" class="" />
    </div>
</div>
