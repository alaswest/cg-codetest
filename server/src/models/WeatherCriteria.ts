export interface WeatherCriteria {
  metric: string;
  validate: (value: number) => boolean;
  scoreWeight: number;
  required: boolean;
}
