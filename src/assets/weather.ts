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

export const cities: City[] = [
  { lat: 55.70584, long: 13.19321, name: 'Lund' },
  { lat: 59.3328, long: 18.0645, name: 'Stockholm' },
  { lat: 46.0569, long: 14.5058, name: 'Ljubljana' },
  { lat: 56.0465, long: 12.6945, name: 'Helsingborg' },
  { lat: 60.4843, long: 15.434, name: 'Borlänge' },
];

export function getCoordinatesByCityName(
  cityName: CityName
): Coordinates | undefined {
  const city = cities.find(
    city => city.name.toLowerCase() === cityName?.toLowerCase()
  );
  if (!city) return undefined;
  const { lat, long } = city;
  return { lat, long };
}

// overload signatures
export function getWeather(coordinates: Coordinates): Promise<Weather>;
export function getWeather(cityName: CityName): Promise<Weather>;
// implementation signature
export async function getWeather(val: Coordinates | CityName) {
  let coordinates: Coordinates;

  if (typeof val === 'string') {
    const possibleCoordinates = getCoordinatesByCityName(val);
    if (!possibleCoordinates) {
      throw new Error(
        `InvalidCityNameError: "${val}" is not a supported city name! Please use one of: ${cities
          .map(city => `"${city.name}"`)
          .join(', ')}, or provide coordinates directly.`
      );
    }
    coordinates = possibleCoordinates;
  } else {
    coordinates = val;
  }

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
