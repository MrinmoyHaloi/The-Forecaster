<script context="module">
	let query;
	let api_key = '7fe47350bee64d2a4c666c2176528975';
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
		).then( res => {
            status = res.status;
            response = res.json()
            .then( data => {
                response = data;
            })
        })

		await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${query}`)
            .then( res => res.json()
            .then((data) => {
                weather_data = data;
            })
		);

		return {
			status: status,
			props: {
				data: weather_data,
				images: response
			}
		};
	}
</script>

<script>
	export let images;
	export let data;
	import WeatherInfo from '$lib/WeatherInfo.svelte';
</script>

<WeatherInfo {data} {images} />
