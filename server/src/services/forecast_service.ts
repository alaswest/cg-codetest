import { getWeatherProvider } from '../providers/weather_provider/weather_provider_factory';
import { Activity } from '../models/Activity';
import { Forecast } from '../models/Forecast';
import { ActivityCriteria } from '../constants/activities';
import { City } from '../models/City';

/**
 * in memory cache for city data if same query is made multiple times.
 * City lat lng wont change so can be cached indefinitely
 */
const localCache = new Map<string, City>();

export async function getActivityForecastForCity(
  cityName: string,
  activities: ActivityCriteria[]
): Promise<Activity[]> {
  const weatherProvider = getWeatherProvider();

  let city = localCache.get(cityName);
  if (!city) {
    city = await weatherProvider.fetchCityByName(cityName);
    localCache.set(cityName, city);
  }

  const forecast = await weatherProvider.fetchForecastByLatLng(
    city.latitude,
    city.longitude
  );

  const activitiesWithForecast: Activity[] = activities.map((a) => {
    const activityForecast = forecast.map((f) => {
      return {
        date: f.date.toUTCString(),
        ...scoreActivityByForecast(f, a),
      };
    });

    return {
      activityName: a.activityName,
      activityForecast,
    };
  });

  return activitiesWithForecast;
}

export function scoreActivityByForecast(
  forecast: Forecast,
  activityCriteria: ActivityCriteria
): { score: number; isSuitable: boolean } {
  let score = 0;
  let isSuitable = true;
  activityCriteria.criteria.forEach((c) => {
    const value: number = forecast[c.metric as keyof Omit<Forecast, 'date'>];
    if (value === undefined) {
      throw new Error(`Metric ${c.metric} not found in forecast`);
    }
    if (c.validate(value)) {
      score += c.scoreWeight;
    } else {
      if (c.required) {
        isSuitable = false;
      }
    }
  });

  return { score, isSuitable };
}
