import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setcurrent, setForecast, settodays24hrdata } from "../store/ForecastSlice";
import { getCurrentHourData } from "../utils/getCurrentHourData";
import getTodayAllHour from "../utils/getTodayAllHour"
const useMeteodata = () => {
  const [weather, setWeather] = useState(null);
  const dispatch = useDispatch();
  const source = useSelector((store) => store?.locationSource?.source);
  const lat = useSelector((store) => {
    return source === "search"
      ? store?.selectedlocation?.latitude
      : store?.userlocation?.latitude;
  });

  const long = useSelector((store) => {
    return source === "search"
      ? store?.selectedlocation?.longitude
      : store?.userlocation?.longitude;
  });

  useEffect(() => {
    if (!lat || !long) return;
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${lat}` +
            `&longitude=${long}` +
            `&hourly=` +
            `temperature_2m,` +
            `apparent_temperature,` +
            `relative_humidity_2m,` +
            `dew_point_2m,` +
            `precipitation_probability,` +
            `precipitation,` +
            `rain,` +
            `showers,` +
            `snowfall,` +
            `cloud_cover,` +
            `surface_pressure,` +
            `visibility,` +
            `weather_code,` +
            `is_day,` +
            `uv_index,` +
            `wind_speed_10m,` +
            `wind_direction_10m,` +
            `wind_gusts_10m` +
            `&daily=` +
            `weather_code,` +
            `temperature_2m_max,` +
            `temperature_2m_min,` +
            `apparent_temperature_max,` +
            `apparent_temperature_min,` +
            `precipitation_sum,` +
            `rain_sum,` +
            `precipitation_probability_max,` +
            `wind_speed_10m_max,` +
            `wind_gusts_10m_max,` +
            `uv_index_max,` +
            `sunrise,` +
            `sunset,` +
            `&forecast_days=7` +
            `&timezone=auto`,
        );

        const data = await response.json();
        console.log(data);
        
        setWeather(data);
      } catch (error) {
        console.log("Weather error:", error);
      }
    };

    fetchWeather();
  }, [lat, long]);

  const hourlyWeather = weather?.hourly?.time?.map((time, i) => ({
    time: time,

    // Temperature
    temperature: weather.hourly.temperature_2m[i],
    feelsLike: weather.hourly.apparent_temperature[i],

    // Humidity
    humidity: weather.hourly.relative_humidity_2m[i],
    dewPoint: weather.hourly.dew_point_2m[i],

    // Rain / precipitation
    rainProbability: weather.hourly.precipitation_probability[i],
    precipitation: weather.hourly.precipitation[i],
    rain: weather.hourly.rain[i],
    showers: weather.hourly.showers[i],
    snowfall: weather.hourly.snowfall[i],

    // Sky / atmospheric conditions
    cloudCover: weather.hourly.cloud_cover[i],
    pressure: weather.hourly.surface_pressure[i],
    visibility: weather.hourly.visibility[i],

    // Weather condition
    weatherCode: weather.hourly.weather_code[i],
    isDay: weather.hourly.is_day[i],

    // UV
    uvIndex: weather.hourly.uv_index[i],

    // Wind
    windSpeed: weather.hourly.wind_speed_10m[i],
    windDirection: weather.hourly.wind_direction_10m[i],
    windGusts: weather.hourly.wind_gusts_10m[i],
  }));

  const dailyWeather = weather?.daily?.time?.map((date, i) => ({
    date: date,
    sunrise: weather.daily.sunrise[i],
    sunset: weather.daily.sunset[i],
    temperatureMax: weather.daily.temperature_2m_max[i],
    temperatureMin: weather.daily.temperature_2m_min[i],

    feelsLikeMax: weather.daily.apparent_temperature_max[i],
    feelsLikeMin: weather.daily.apparent_temperature_min[i],

    weatherCode: weather.daily.weather_code[i],

    precipitation: weather.daily.precipitation_sum[i],
    rain: weather.daily.rain_sum[i],
    rainProbability: weather.daily.precipitation_probability_max[i],

    windSpeed: weather.daily.wind_speed_10m_max[i],
    windGusts: weather.daily.wind_gusts_10m_max[i],

    uvIndex: weather.daily.uv_index_max[i],
  }));


  useEffect(() => {
    if (dailyWeather) {
      dispatch(setForecast(dailyWeather));
    }
    if (hourlyWeather) {
      const currentdata = getCurrentHourData(hourlyWeather);
      dispatch(setcurrent(currentdata));
      const todayallhourdata=getTodayAllHour(hourlyWeather);
      dispatch(settodays24hrdata(todayallhourdata));
    }
  }, [dailyWeather, hourlyWeather, dispatch]);

  return [hourlyWeather];
};

export default useMeteodata;
