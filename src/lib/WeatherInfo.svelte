<script>
	export let images;
	export let data;
</script>

<div
	class="container-fluid text-light weather-container"
	style="{images.total === 0 ? 'background: rgba(0, 0, 15, 0.9)' : 'background-image: url(' + images.results[0].urls.regular + ')'};">
	<div>
		<h1 class="fw-bold">{data.name}, <span class="fw-normal fs-4">{data.sys.country}</span></h1>
		<h3>
			<img
				src="http://openweathermap.org/img/wn/{data.weather[0].icon}@2x.png"
				alt="weather condition icon"
				width="50"
			/>
			{(data.main.temp - 273).toString().substring(0, 2)}°C <span>{data.weather[0].main}</span>
		</h3>
		<h4 class="fs-6">feels like {(data.main.feels_like - 273).toString().substring(0, 2)}°C</h4>
		<a href="#content" class="btn mt-2 btn-outline-light" style="text-shadow: none !important;"
			>More info</a
		>
	</div>
</div>

<style lang="scss">
	.weather-container {
		display: flex;
		align-items: center;
		height: 100vh;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		padding: 0rem 4rem;
		& > div {
			padding: 2rem 3rem;
			padding-right: 10rem;
			text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.589);
			background-color: rgba(128, 128, 128, 0.24);
			border-radius: 0.5rem;
			backdrop-filter: blur(6px);
			border: 1px solid white;
		}
		@media screen and (max-width: 768px) {
			padding: 1rem;
			& > div {
				margin: auto;
				padding: 3rem;
				width: 23rem;
				// height: 20rem;
				// padding-right: 5rem;
			}
		}
	}
</style>
