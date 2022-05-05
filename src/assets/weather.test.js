import axios from 'axios';
const { getWeather } = require('./weather.ts');

jest.mock('axios');

describe('getWeather', () => {
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
    // mock axios
    axios.mockResolvedValue({ data: weather });

    const data = await getWeather({ lat: 0, long: 0 });
    expect(data).toEqual({
      current: { temperature },
      hourly: [{ temperature, cloudcover, date }],
    });
  });

  test('Throws an error when provided invalid coordinates', async () => {
    // mock failed axios request
    axios.mockRejectedValue(new Error('AxiosError'));
    return expect(getWeather({ lat: 666, long: 666 })).rejects.toThrow();
  });

  // test('Throws an error when provided a valid city name', async () => {
  //   //
  // });
  // test('Throws an error when provided an invalid city name', async () => {
  //   //
  // });
});
