type CityName = 'Lund' | 'Stockholm' | 'Ljubljana' | 'Helsingborg' | 'Borlänge';

interface Coordinates {
  lat: number;
  long: number;
}

interface City extends Coordinates {
  name: CityName;
}

interface WeatherByHour {
  temperature: number;
  cloudcover: number;
  date: Date;
}
