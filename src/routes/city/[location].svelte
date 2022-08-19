<script context="module">
    let query;
    let api_key = "808605ecfeb37d6547902fa8c8cfa8b7";
    let weather_data;
    let daily_forecast;
    let response;
    let status;
    let lat;
    let lon;

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ fetch, params , url}) {
        query = params.location.toLowerCase();
        lat = url.searchParams.get("lat")
        lon = url.searchParams.get("lon")

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
            `https://pro.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric&lat=${lat}&lon=${lon}`
        ).then((res) =>
            res.json().then((data) => {
                status = res.status;
                weather_data = data;
            })
        );

        await fetch(
            `https://pro.openweathermap.org/data/2.5/forecast/daily?q=${weather_data.name}&cnt=8&units=metric&appid=${api_key}`
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

        if (status === 200) {
            return {
                status: 200,
                props: {
                    data: weather_data,
                    images: response,
                    daily_forecast: daily_forecast
                }
            };
        } else {
            return {
                error: new Error("City not found"),
                status: 404
            };
        }
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
