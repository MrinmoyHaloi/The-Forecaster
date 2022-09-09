<script>
    export let data;
    
    import WeatherInfo from "$lib/WeatherInfo.svelte";
    import MoreInfo from "$lib/MoreInfo.svelte";
</script>

<WeatherInfo data={data.weather_data} images={data.images} />

<MoreInfo data={data.weather_data} daily_forecast={data.daily_forecast} hourly_forecast={data.hourly_forecast}/>