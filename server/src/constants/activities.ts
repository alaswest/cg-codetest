import { WeatherCriteria } from '../models/WeatherCriteria';

export interface ActivityCriteria {
  activityName: string;
  criteria: WeatherCriteria[];
}

/**
 * Indivitive values used for each activity
 */
export const activities: ActivityCriteria[] = [
  {
    activityName: 'Skiing',
    criteria: [
      {
        metric: 'snowfallSum',
        validate: (value: number) => value > 50,
        scoreWeight: 1,
        required: true,
      },
      {
        metric: 'windSpeed',
        validate: (value: number) => value < 10,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'temperatureMax',
        validate: (value: number) => value < 0,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'temperatureMin',
        validate: (value: number) => value > -10,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'rainSum',
        validate: (value: number) => value === 0,
        scoreWeight: 1,
        required: false,
      },
    ],
  },
  {
    activityName: 'Surfing',
    criteria: [
      {
        metric: 'windSpeed',
        validate: (value: number) => value > 10,
        scoreWeight: 1,
        required: true,
      },
      {
        metric: 'temperatureMax',
        validate: (value: number) => value < 30,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'temperatureMin',
        validate: (value: number) => value > 10,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'rainSum',
        validate: (value: number) => value === 0,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'snowfallSum',
        validate: (value: number) => value === 0,
        scoreWeight: 1,
        required: false,
      },
    ],
  },
  {
    activityName: 'Outdoor Sightseeing',
    criteria: [
      {
        metric: 'temperatureMax',
        validate: (value: number) => value < 25,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'temperatureMin',
        validate: (value: number) => value > 5,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'rainSum',
        validate: (value: number) => value === 0,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'windSpeed',
        validate: (value: number) => value < 10,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'snowfallSum',
        validate: (value: number) => value === 0,
        scoreWeight: 1,
        required: false,
      },
    ],
  },
  {
    activityName: 'Indoor Sightseeing',
    criteria: [
      {
        metric: 'temperatureMax',
        validate: (value: number) => value > 25,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'temperatureMin',
        validate: (value: number) => value < 5,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'rainSum',
        validate: (value: number) => value > 0,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'windSpeed',
        validate: (value: number) => value > 10,
        scoreWeight: 1,
        required: false,
      },
      {
        metric: 'snowfallSum',
        validate: (value: number) => value > 0,
        scoreWeight: 1,
        required: false,
      },
    ],
  },
];
