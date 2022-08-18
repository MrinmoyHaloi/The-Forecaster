<script>
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
</div>
