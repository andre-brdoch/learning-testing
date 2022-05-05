import axios from 'axios';
const { getCoordinatesByCityName, getWeather } = require('./weather.ts');

jest.mock('axios');

afterEach(() => {
  // reset axios mock
  axios.mockClear();
});

describe('getCoordinatesByCityName()', () => {
  const stockholmCoordinates = {
    lat: 59.3328,
    long: 18.0645,
  };
  test('Returns { lat: 59.3328, long: 18.0645 } for cityName "Stockholm"', () => {
    expect(getCoordinatesByCityName('Stockholm')).toEqual(stockholmCoordinates);
  });
  test('cityName is case insensitive', () => {
    expect(getCoordinatesByCityName('stockholm')).toEqual(stockholmCoordinates);
  });
  test('Returns undefined for not supported cityName "Duckburg"', () => {
    expect(getCoordinatesByCityName('Duckburg')).toBeUndefined();
  });
});

describe('getWeather()', () => {
  const temperature = 24;
  const cloudcover = 50;
  const date = new Date();
  const resolvedAxiosResponse = {
    data: {
      current_weather: { temperature },
      hourly: {
        cloudcover: [cloudcover],
        temperature_2m: [temperature],
        time: [date],
      },
    },
  };
  const resolvedWeatherResponse = {
    current: { temperature },
    hourly: [{ temperature, cloudcover, date }],
  };

  test('Returns the weather when provided valid coordinates', async () => {
    // mock axios resolve value
    axios.mockResolvedValue(resolvedAxiosResponse);

    const data = await getWeather({ lat: 0, long: 0 });
    expect(data).toEqual(resolvedWeatherResponse);
  });

  test('Returns the weather when provided supported city name', async () => {
    // mock axios resolve value
    axios.mockResolvedValue(resolvedAxiosResponse);

    const data = await getWeather('Stockholm');
    expect(data).toEqual(resolvedWeatherResponse);
  });

  test('Throws an error when provided invalid coordinates, without doing an HTTP request', async () => {
    await expect(getWeather({ lat: 666, long: 666 })).rejects.toThrow();
    // validate that no axios call was made
    expect(axios.mock.calls).toHaveLength(0);
  });

  test('Throws an "InvalidCityNameError" error when provided a non supported city name, without doing an HTTP request', async () => {
    // can also use regex to test error message:
    await expect(getWeather('Duckburg')).rejects.toThrow(
      /InvalidCityNameError/
    );
    // validate that no axios call was made
    expect(axios.mock.calls).toHaveLength(0);
  });

  test('Throws an "AxiosError" when axios request fails', async () => {
    // mock failed axios request
    axios.mockRejectedValue(new Error('AxiosError'));
    return expect(getWeather({ lat: 0, long: 0 })).rejects.toThrow(
      'AxiosError'
    );
  });
});
