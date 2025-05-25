import { buildSchema } from 'graphql';

export default buildSchema(`

  type FetchActivityForecastResponse {
    cityName: String
    activities: [Activity]
  }

  type Activity {
    activityName: String
    activityForecast: [ActivityForecast]
  }

  type ActivityForecast {
    date: String
    isSuitable: Boolean
    score: Int
  }

  type Query {
    fetchActivityForecast(cityName: String): FetchActivityForecastResponse
  }
`);
