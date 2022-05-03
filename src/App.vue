<template>
  <main class="py-6 px-2 mx-auto max-w-xl text-left">
    <header class="mb-14">
      <h1 class="text-4xl font-bold mb-4">Hourly Weather Forecast</h1>
      <p class="text-xl">
        Stockholm,
        <time :datetime="formatDate(new Date(), 'yyyy-MM-dd')">{{
          formatDate(new Date(), 'MMMM do, yyyy')
        }}</time>
      </p>
    </header>

    <article class="mb-8">
      <WeatherData v-slot="{ weatherByHours }">
        <ol class="inline-flex flex-col gap-2">
          <li
            v-for="hourlyWeather in weatherByHours"
            :key="hourlyWeather.date"
            class="grow"
          >
            <WeatherCard v-bind="hourlyWeather" class="w-full" />
          </li>
        </ol>
      </WeatherData>
    </article>

    <footer>
      Data retrieved via
      <a
        class="text-blue-500 hover:text-blue-400"
        href="https://open-meteo.com/en"
        >Open-Meteo</a
      >.
    </footer>
  </main>
</template>

<script lang="ts" setup>
import formatDate from 'date-fns/format';
import WeatherCard from './components/WeatherCard.vue';
import WeatherData from './components/WeatherData.vue';
</script>
