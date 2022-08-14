<script>
    export let images;
    export let data;
</script>

<div
    class="container-fluid text-light weather-container"
    style="{images.total === 0
        ? 'background: rgba(0, 0, 15, 0.9)'
        : 'background-image: url(' + images.results[0].urls.regular + ')'};"
>
    <div class="d-flex align-items-center w-100 h-100">
        <div class="weather-card">
            <h1 class="fw-bold">
                {data.name}, <span class="fw-normal fs-4">{data.sys.country}</span>
            </h1>
            <h3>
                <img
                    src="http://openweathermap.org/img/wn/{data.weather[0].icon}@2x.png"
                    alt="weather condition icon"
                    width="50"
                />
                {data.main.temp.toString().substring(0, 2)}°C, <span>{data.weather[0].main}</span>
            </h3>
            <h4 class="fs-6">feels like {data.main.feels_like.toString().substring(0, 2)}°C</h4>
            <a
                href="#content"
                class="btn mt-2 btn-outline-light btn-rounded"
                style="text-shadow: none !important;">More info</a
            >
        </div>
    </div>
    <div class="attribution">
        Photo by <a href={images.results[0].links.html}>{images.results[0].user.name}</a> on
        <a href="https://unsplash.com">unsplash.com</a>
    </div>
</div>

<style lang="scss">
    .weather-container {
        height: 100vh;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        padding: 0rem 4rem;
        & .attribution {
            position: relative;
            width: fit-content;
            margin-left: auto;
            bottom: 4rem;
            padding: .4rem;
            border-radius: .5rem;
            backdrop-filter: blur(6px);
            background-color: rgba(29, 29, 29, 0.452);
            font-size: .9rem;
            color: rgba(255, 255, 255, 0.781);
        }
        & .weather-card {
            padding: 2rem 3rem;
            padding-right: 10rem;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.589);
            background-color: rgba(29, 29, 29, 0.452);
            border-radius: 0.5rem;
            backdrop-filter: blur(6px);
            border: 1px solid rgba(255, 255, 255, 0.637);
        }
        @media screen and (max-width: 768px) {
            padding: 1rem;
            & .weather-card {
                margin: auto;
                padding: 3rem;
                width: 23rem;
            }
        }
    }
</style>
