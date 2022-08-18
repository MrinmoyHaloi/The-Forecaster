<script>
    import { DateTime } from "luxon";
    import { onMount } from "svelte";

    // import {Chart} from "chart.js/auto";
    export let data;
    export let daily_forecast;

    // calculate direction based on degrees
    function getDirection(degrees) {
        if (degrees > 337.5) return "N";
        if (degrees > 292.5) return "NW";
        if (degrees > 247.5) return "W";
        if (degrees > 202.5) return "SW";
        if (degrees > 157.5) return "S";
        if (degrees > 122.5) return "SE";
        if (degrees > 67.5) return "E";
        if (degrees > 22.5) return "NE";
        return "N";
    }

    function removeDecimal(temp) {
        return temp.toString().substring(0, temp.toString().indexOf("."));
    }
</script>

<div class="container py-5" id="content">
    <h5 class="d-inline-block" title={DateTime.fromSeconds(data.dt).toFormat("ffff")}>
        {DateTime.fromSeconds(data.dt).toFormat("dd/MM/yyyy, hh:mm")}
    </h5>
    <h1 class="fw-bold">{data.name}, <span class="fw-normal fs-4">{data.sys.country}</span></h1>
    <h3>
        <img
            src="http://openweathermap.org/img/wn/{data.weather[0].icon}@2x.png"
            alt="weather condition icon"
            width="50"
        />
        {removeDecimal(data.main.temp)}°C <span>{data.weather[0].main}</span>
    </h3>
    <h4 class="fs-6">
        feels like {removeDecimal(data.main.feels_like)}°C. {data.weather[0].description}
    </h4>
    <div class="more-info pt-2">
        <h4 class="fs-6">
            <b>Wind:</b>
            <i
                class="bi bi-cursor-fill"
                style="display:inline-block;transform: rotate(calc(-225deg + {data.wind.deg}deg))"
            />
            {getDirection(data.wind.deg)}, {data.wind.speed} m/s
        </h4>
        <h4 class="fs-6"><b>Pressure:</b> {data.main.pressure} hPa</h4>
        <h4 class="fs-6"><b>Humidity:</b> {data.main.humidity}%</h4>
        <h4 class="fs-6"><b>Visibility:</b> {data.visibility / 1000} KM</h4>
    </div>
    <h4 class="mt-2">Daily forecasting - 8 days</h4>
    <div class="forecast-carousel">
        {#each daily_forecast.list as forecast, i}
            <div class="forecast text-center">
                <div>
                    <h5 class="text-center">
                        {#if i === 0}
                            Today
                        {:else if i === 1}
                            Tomorrow
                        {:else}
                            {DateTime.fromSeconds(forecast.dt).toFormat("ccc")}
                        {/if}
                    </h5>
                    {DateTime.fromSeconds(forecast.dt).toFormat("MM/dd")}
                </div>
                <img
                    src="http://openweathermap.org/img/wn/{forecast.weather[0].icon}@2x.png"
                    alt="weather condition icon"
                    width="50"
                />
                <div>
                    {removeDecimal(forecast.temp.max)}°C max
                    {#if i > 0}
                        {#if daily_forecast.list[i - 1].temp.max > forecast.temp.max}
                            <i class="bi bi-caret-down-fill text-danger" />
                        {:else if daily_forecast.list[i - 1].temp.max < forecast.temp.max}
                            <i class="bi bi-caret-up-fill text-success" />
                        {:else}
                            <i class="bi bi-caret-right-fill" />
                        {/if}
                    {/if}
                </div>
                <div>
                    {removeDecimal(forecast.temp.min)}°C min
                    {#if i > 0}
                        {#if daily_forecast.list[i - 1].temp.min > forecast.temp.min}
                            <i class="bi bi-caret-down-fill text-danger" />
                        {:else if daily_forecast.list[i - 1].temp.min < forecast.temp.min}
                            <i class="bi bi-caret-up-fill text-success" />
                        {:else}
                            <i class="bi bi-caret-right-fill" />
                        {/if}
                    {/if}
                </div>
                <div>
                    <i
                        class="bi bi-cursor-fill"
                        style="display:inline-block;transform: rotate(calc(-225deg + {forecast.deg}deg))"
                    />
                    {getDirection(forecast.deg)}, {forecast.speed} m/s
                </div>
            </div>
        {/each}
    </div>

</div>

<style lang="scss">
    .forecast-carousel {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 12rem;
        overflow-x: auto;
        overscroll-behavior-inline: contain;
        gap: 1rem;
        padding-block: 1rem;
        scroll-snap-type: inline mandatory;
        @media screen and (max-width: 768px) {
            grid-auto-columns: 9rem;
        }
        & .forecast {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            scroll-snap-align: start;
            border-radius: 5px;
            padding: 2rem 1rem;
            background-color: rgb(31, 31, 31);
        }
    }
    .more-info {
        max-width: 23rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }
</style>
