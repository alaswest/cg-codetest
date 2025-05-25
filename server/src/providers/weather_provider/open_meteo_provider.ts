import { fetchWeatherApi } from 'openmeteo';
import { Forecast } from '../../models/Forecast';
import { WeatherProvider } from './types/WeatherProvider';
import { City } from '../../models/City';

interface FindCityByNameResponse {
  results: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  }[];
}

/**
 * in memory cache for city data if same query is made multiple times.
 * City lat lng wont change so can be cached indefinitely
 */
const localCache = new Map<string, City>();

export const openMeteoProvider: WeatherProvider = {
  fetchCityByName: async function (name: string): Promise<City> {
    const cachedCity = localCache.get(name);
    if (cachedCity) {
      return cachedCity;
    }

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch city data for "${name}"`);
    }

    const data = (await response.json()) as FindCityByNameResponse;
    if (!data.results?.length) {
      throw new Error(`City "${name}" not found`);
    }

    const city = {
      id: data.results[0].id,
      cityName: data.results[0].name,
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };
    localCache.set(name, city);

    return city;
  },

  /**
   * Based on open-meteo documentation: https://open-meteo.com/en/docs?location_mode=csv_coordinates&daily=snowfall_sum,weather_code,wind_speed_10m_max,temperature_2m_max,temperature_2m_min,rain_sum
   * @param lat
   * @param lng
   * @returns
   */
  fetchForecastByLatLng: async function (
    lat: number,
    lng: number
  ): Promise<Forecast[]> {
    const params = {
      latitude: lat,
      longitude: lng,
      daily: [
        'snowfall_sum',
        'wind_speed_10m_max',
        'temperature_2m_max',
        'temperature_2m_min',
        'rain_sum',
      ],
    };

    const url = 'https://api.open-meteo.com/v1/forecast';
    const response = await fetchWeatherApi(url, params);

    const utcOffsetSeconds = response[0].utcOffsetSeconds();
    const daily = response[0].daily()!;

    const weatherData = {
      daily: {
        time: [
          ...Array(
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
                1000
            )
        ),
        snowfallSum: daily.variables(0)!.valuesArray()!,
        windSpeed10mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMax: daily.variables(2)!.valuesArray()!,
        temperature2mMin: daily.variables(3)!.valuesArray()!,
        rainSum: daily.variables(4)!.valuesArray()!,
      },
    };

    const forecast: Forecast[] = [];
    for (let i = 0; i < weatherData.daily.time.length; i++) {
      forecast.push({
        date: weatherData.daily.time[i],
        snowfallSum: weatherData.daily.snowfallSum[i],
        windSpeed: weatherData.daily.windSpeed10mMax[i],
        temperatureMax: weatherData.daily.temperature2mMax[i],
        temperatureMin: weatherData.daily.temperature2mMin[i],
        rainSum: weatherData.daily.rainSum[i],
      });
    }

    return forecast;
  },
};
