import { City } from '../../../models/City';
import { Forecast } from '../../../models/Forecast';

export interface WeatherProvider {
  fetchCityByName: (name: string) => Promise<City>;
  fetchForecastByLatLng: (lat: number, lng: number) => Promise<Forecast[]>;
}
