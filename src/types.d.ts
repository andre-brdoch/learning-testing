type CityName = 'Lund' | 'Stockholm' | 'Ljubljana' | 'Helsingborg' | 'Borlänge';

interface Coordinates {
  lat: number;
  long: number;
}

interface City extends Coordinates {
  name: CityName;
}

interface CurrentWeather {
  temperature: number;
}

interface WeatherByHour extends CurrentWeather {
  cloudcover: number;
  date: Date;
}

interface Weather {
  current: CurrentWeather;
  hourly: WeatherByHour[];
}
