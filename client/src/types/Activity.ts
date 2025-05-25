export interface FetchActivityForecast {
  fetchActivityForecast: {
    name: string;
    activities: Activity[];
  };
}

export interface Activity {
  activityName: string;
  activityForecast: ActivityForecast[];
}

export interface ActivityForecast {
  date: number;
  isSuitable: boolean;
  score: number;
}
