import axios from 'axios';

interface ApiPayload {
  hourly: {
    cloudcover: number[];
    temperature_2m: number[];
    time: string[];
  };
  current_weather: {
    temperature: number;
  };
}

export async function getWeather(coordinates: Coordinates): Promise<Weather> {
  const { lat, long } = coordinates;
  if (lat > 90 || long > 90 || lat < -90 || long < -90) {
    throw new Error('Invalid coordinates');
  }

  const endpoint = `https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=${lat}&longitude=${long}&timezone=Europe%2FBerlin&hourly=temperature_2m,cloudcover`;
  const response = await axios(endpoint);
  const data: ApiPayload = response.data;

  const current = {
    temperature: data.current_weather.temperature,
  };
  const hourly = data.hourly.temperature_2m.map((temp, i) => {
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
  return {
    hourly,
    current,
  };
}
