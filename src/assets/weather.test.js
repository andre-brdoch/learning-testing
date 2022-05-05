import axios from 'axios';
const { getWeather } = require('./weather.ts');

jest.mock('axios');

afterEach(() => {
  // reset axios mock
  axios.mockClear();
});

describe('getWeather()', () => {
  test('Returns the weather when provided valid coordinates', async () => {
    const temperature = 24;
    const cloudcover = 50;
    const date = new Date();
    const weather = {
      current_weather: { temperature },
      hourly: {
        cloudcover: [cloudcover],
        temperature_2m: [temperature],
        time: [date],
      },
    };
    // mock axios resolve value
    axios.mockResolvedValue({ data: weather });

    const data = await getWeather({ lat: 0, long: 0 });
    expect(data).toEqual({
      current: { temperature },
      hourly: [{ temperature, cloudcover, date }],
    });
  });

  test('Throws an error when provided invalid coordinates without doing an HTTP request', async () => {
    await expect(getWeather({ lat: 666, long: 666 })).rejects.toThrow();
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

  // test('Returns the weather when provided a valid city name', async () => {
  //   //
  // });

  // test('Throws an error when provided an invalid city name', async () => {
  //   //
  // });
});
