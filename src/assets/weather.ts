import axios from 'axios';

interface ApiPayload {
  hourly: {
    cloudcover: number[];
    temperature_2m: number[];
    time: string[];
  };
}

export const fetchWeather = async (
  coordinates: Coordinates
): Promise<WeatherByHour[]> => {
  const { lat, long } = coordinates;
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&timezone=Europe%2FBerlin&hourly=temperature_2m,cloudcover`;

  const response = await axios(endpoint);
  const data: ApiPayload = response.data;

  return Array.from(Array(24).keys()).map(i => {
    const {
      temperature_2m: temperatures,
      cloudcover: cloudcovers,
      time: dates,
    } = data.hourly;
    return {
      temperature: temperatures[i],
      cloudcover: cloudcovers[i],
      date: new Date(dates[i]),
    };
  });
};
