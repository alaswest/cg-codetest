import { activities } from '../../constants/activities';
import { Activity } from '../../models/Activity';
import { getActivityForecastForCity } from '../../services/forecast_service';

interface FetchActivityForecastArgs {
  cityName: string;
}

interface FetchActivityForecastResponse {
  cityName: string;
  activities: Activity[];
}

export const fetchActivityForecast = async ({
  cityName,
}: FetchActivityForecastArgs): Promise<FetchActivityForecastResponse> => {
  const activitiesWithForecast = await getActivityForecastForCity(
    cityName,
    activities
  );

  return {
    cityName,
    activities: activitiesWithForecast,
  };
};
