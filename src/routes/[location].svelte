<script context="module">
	let query;
	let api_key = '7fe47350bee64d2a4c666c2176528975';
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {
		query = params.location;
		const response = await fetch(
			`https://api.unsplash.com/search/photos?page=1&query=${query}&orientation=landscape`,
			{
				headers: {
					Authorization: `Client-ID obK7ubjL9GcBXwIQMy_7rtwMtCJy9IksdwBQC--RU_Q`
				}
			}
		);
		const weather_data = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=${query}`
		);

		return {
			status: response.status,
			props: {
				data: await weather_data.json(),
				images: await response.json()
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
