<script context="module">
    var query = "new york";
    let api_key = "808605ecfeb37d6547902fa8c8cfa8b7";
    let weather_data;
    let daily_forecast;
    let response;
    let status;

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ fetch }) {
        await fetch(
            `https://api.unsplash.com/search/photos?page=1&query=${query}&orientation=landscape`,
            {
                headers: {
                    Authorization: `Client-ID obK7ubjL9GcBXwIQMy_7rtwMtCJy9IksdwBQC--RU_Q`
                }
            }
        ).then((res) => {
            res.json().then((data) => {
                response = data;
            });
        });

        await fetch(
            `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric&q=${query}`
        ).then((res) =>
            res.json().then((data) => {
                status = res.status;
                weather_data = data;
            })
        );

        await fetch(
            `https://api.openweathermap.org/data/2.5/forecast/daily?q=${weather_data.name}&cnt=8&units=metric&appid=${api_key}`
        ).then((res) =>
            res
                .json()
                .then((data) => {
                    daily_forecast = data;
                })
                .catch((err) => {
                    console.log(err);
                })
        );

        return {
            status: status,
            props: {
                data: weather_data,
                images: response,
                daily_forecast: daily_forecast
            }
        };
    }
</script>

<script>
    export let images;
    export let data;
    export let daily_forecast;
    import WeatherInfo from "$lib/WeatherInfo.svelte";
    import MoreInfo from "$lib/MoreInfo.svelte";
</script>

<WeatherInfo {data} {images} />
<MoreInfo {data} {daily_forecast} />
