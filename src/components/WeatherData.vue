<template>
  <div>
    <div>
      <div class="mb-6 inline-block">
        <label for="city-select" class="block mb-2 text-left">City</label>
        <select
          id="city-select"
          v-model="selectedCity"
          name="city"
          class="p-2 border"
        >
          <option value="" disabled selected>Select...</option>
          <option
            v-for="location in locations"
            :key="location.name"
            :value="location.name"
          >
            {{ location.name }}
          </option>
        </select>
      </div>
    </div>

    <slot v-bind="slotData" />
  </div>
</template>

<script lang="ts" setup>
import { getWeather } from '../assets/weather';
import { onMounted, ref, watch } from 'vue';
import { computed } from '@vue/reactivity';

const locations = ref<City[]>([
  { lat: 55.70584, long: 13.19321, name: 'Lund' },
  { lat: 59.3328, long: 18.0645, name: 'Stockholm' },
  { lat: 46.0569, long: 14.5058, name: 'Ljubljana' },
  { lat: 56.0465, long: 12.6945, name: 'Helsingborg' },
  { lat: 60.4843, long: 15.434, name: 'Borlänge' },
]);
const selectedCity = ref<CityName>(locations.value[0].name);
let weatherByHours = ref<WeatherByHour[]>([]);

const coordinates = computed((): Coordinates | undefined => {
  const city = locations.value.find(l => l.name === selectedCity.value);
  if (!city) return undefined;
  return { lat: city.lat, long: city.long };
});
const slotData = computed(() => {
  const { lat, long } = coordinates.value || {};
  return {
    lat,
    long,
    weatherByHours: weatherByHours.value,
    city: selectedCity.value,
  };
});

const fetchWeatherIfCoordinates = async (): Promise<void> => {
  if (!coordinates.value) return;
  const weather = await getWeather(coordinates.value);
  weatherByHours.value = weather.hourly;
};

onMounted(fetchWeatherIfCoordinates);
watch(coordinates, fetchWeatherIfCoordinates);
</script>
