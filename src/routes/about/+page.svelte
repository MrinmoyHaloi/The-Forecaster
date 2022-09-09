<script>
    import { onMount } from "svelte";

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
