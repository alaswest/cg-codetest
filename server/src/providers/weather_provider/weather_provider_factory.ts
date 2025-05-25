import { WeatherProvider } from './types/WeatherProvider';
import { openMeteoProvider } from './open_meteo_provider';

export function getWeatherProvider(): WeatherProvider {
  return openMeteoProvider;
}
