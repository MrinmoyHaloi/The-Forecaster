<script context="module">
    let query;
    let api_key = "808605ecfeb37d6547902fa8c8cfa8b7";
    let weather_data;
    let response;
    let status;

    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ fetch, params }) {
        query = params.location;
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

		await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${query}`)
            .then( res => res.json()
            .then((data) => {
                status = res.status
                weather_data = data;
            })
		);
        if (status === 200) {
            return {
                status: 200,
                props: {
                    data: weather_data,
                    images: response
                }
            };
        } else {
            return {
                error: new Error("City not found"),
                status: 404,
            };
        }
    }
</script>

<script>
    export let images;
    export let data;
    import WeatherInfo from "$lib/WeatherInfo.svelte";
</script>

<WeatherInfo {data} {images} />
