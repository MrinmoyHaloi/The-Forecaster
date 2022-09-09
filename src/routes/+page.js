var query = "new york";
let api_key = "808605ecfeb37d6547902fa8c8cfa8b7";
let weather_data;
let daily_forecast;
let hourly_forecast;
let response;
let status;
let lat = 40.7127281;
let lon = -74.0060152;

/** @type {import('@sveltejs/kit').PageLoad} */
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

    await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`).then((res) => {
        res.json().then((data) => {
            hourly_forecast = data;
        });
    })

    await fetch(
        `https://pro.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric&q=${query}`
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

    return {
        weather_data: weather_data,
        images: response,
        daily_forecast: daily_forecast,
        hourly_forecast: hourly_forecast,
    };
}
