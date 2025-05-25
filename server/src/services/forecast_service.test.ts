import { beforeEach, describe, expect, it, vi, Mock } from 'vitest';
import {
  getActivityForecastForCity,
  scoreActivityByForecast,
} from './forecast_service';
import { getWeatherProvider } from '../providers/weather_provider/weather_provider_factory';
import { activities } from '../constants/activities';
import { Forecast } from '../models/Forecast';

vi.mock('../providers/weather_provider/weather_provider_factory');

describe('getActivityForecastForCity', () => {
  let mockFetchCityByName: Mock;
  let mockFetchForecastByLatLng: Mock;

  beforeEach(() => {
    vi.resetAllMocks();

    mockFetchCityByName = vi.fn().mockResolvedValue({
      id: 1,
      cityName: 'London',
      latitude: 51.5074,
      longitude: -0.0901,
    });

    mockFetchForecastByLatLng = vi.fn().mockResolvedValue([
      {
        date: new Date('2021-01-01'),
        temperatureMax: 10,
        temperatureMin: 10,
        windSpeed: 10,
        snowfallSum: 0,
        rainSum: 0,
      },
    ]);

    vi.mocked(getWeatherProvider).mockReturnValue({
      fetchCityByName: mockFetchCityByName,
      fetchForecastByLatLng: mockFetchForecastByLatLng,
    });
  });

  it('should return the forecast for the city', async () => {
    const forecast = await getActivityForecastForCity('London', activities);

    expect(getWeatherProvider).toHaveBeenCalledOnce();
    expect(mockFetchCityByName).toHaveBeenCalledExactlyOnceWith('London');
    expect(mockFetchForecastByLatLng).toHaveBeenCalledExactlyOnceWith(
      51.5074,
      -0.0901
    );

    expect(forecast).toHaveLength(activities.length);
    forecast.forEach((activity) => {
      expect(activity.activityName).toBeDefined();
      expect(activity.activityForecast).toHaveLength(1);
      expect(activity.activityForecast[0].date).toBeDefined();
      expect(activity.activityForecast[0].score).toBeDefined();
      expect(activity.activityForecast[0].isSuitable).toBeDefined();
    });
  });
});

describe('scoreActivityByForecast', () => {
  it('should score an individual activity criteria', () => {
    const forecast: Forecast = {
      date: new Date('2021-01-01'),
      temperatureMax: 20,
      temperatureMin: 10,
      windSpeed: 10,
      snowfallSum: 0,
      rainSum: 0,
    };

    const activityCriteria = {
      activityName: 'Test Activity',
      criteria: [
        {
          metric: 'temperatureMax',
          validate: (value: number) => value > 10,
          scoreWeight: 1,
          required: true,
        },
      ],
    };

    const { score, isSuitable } = scoreActivityByForecast(
      forecast,
      activityCriteria
    );
    expect(score).toBe(1);
    expect(isSuitable).toBe(true);
  });

  it('should score multiple criteria', () => {
    const forecast: Forecast = {
      date: new Date('2021-01-01'),
      temperatureMax: 20,
      temperatureMin: 10,
      windSpeed: 10,
      snowfallSum: 0,
      rainSum: 0,
    };

    const activityCriteria = {
      activityName: 'Test Activity',
      criteria: [
        {
          metric: 'temperatureMax',
          validate: (value: number) => value > 10,
          scoreWeight: 1,
          required: true,
        },
        {
          metric: 'temperatureMin',
          validate: (value: number) => value < 20,
          scoreWeight: 1,
          required: true,
        },
      ],
    };

    const { score, isSuitable } = scoreActivityByForecast(
      forecast,
      activityCriteria
    );
    expect(score).toBe(2);
    expect(isSuitable).toBe(true);
  });

  it('should set isSuitable to false if required criteria is not met', () => {
    const forecast: Forecast = {
      date: new Date('2021-01-01'),
      temperatureMax: 20,
      temperatureMin: 10,
      windSpeed: 10,
      snowfallSum: 0,
      rainSum: 0,
    };

    const activityCriteria = {
      activityName: 'Test Activity',
      criteria: [
        {
          metric: 'temperatureMax',
          validate: (value: number) => value > 25,
          scoreWeight: 1,
          required: true,
        },
      ],
    };

    const { score, isSuitable } = scoreActivityByForecast(
      forecast,
      activityCriteria
    );
    expect(score).toBe(0);
    expect(isSuitable).toBe(false);
  });

  it('should throw an error if a metric is not found in the forecast', () => {
    const forecast: Forecast = {
      date: new Date('2021-01-01'),
      temperatureMax: 20,
      temperatureMin: 10,
      windSpeed: 10,
      snowfallSum: 0,
      rainSum: 0,
    };

    const activityCriteria = {
      activityName: 'Test Activity',
      criteria: [
        {
          metric: 'unknownMetric',
          validate: (value: number) => value > 10,
          scoreWeight: 1,
          required: true,
        },
      ],
    };

    expect(() => scoreActivityByForecast(forecast, activityCriteria)).toThrow(
      'Metric unknownMetric not found in forecast'
    );
  });
});
