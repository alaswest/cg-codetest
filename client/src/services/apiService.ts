import type { Response } from '../types/Response';
import type { Activity, FetchActivityForecast } from '../types/Activity';

export async function fetchActivityForecast(
  cityName: string
): Promise<Activity[]> {
  const query = `
  query FetchActivityForecast($cityName: String!) {
    fetchActivityForecast(cityName: $cityName) {
      cityName
      activities {
        activityName
        activityForecast {
          date
          isSuitable
          score
        }
      }
    }
  }
  `;

  const response = await fetch(import.meta.env.VITE_API_URL + '/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { cityName },
    }),
  });

  const responseData: Response<FetchActivityForecast> = await response.json();

  return responseData.data.fetchActivityForecast.activities;
}
