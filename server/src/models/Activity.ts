export interface ActivityForecast {
  date: string;
  score: number;
  isSuitable: boolean;
}

export interface Activity {
  activityName: string;
  activityForecast: ActivityForecast[];
}
