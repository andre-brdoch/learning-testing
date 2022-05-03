<template>
  <article
    class="bg-slate-200 py-3 px-3 rounded-md inline-grid grid-cols-2 gap-4 items-center justify-center"
  >
    <p class="font-semibold text-sm text-left">
      <time :datetime="formatDate(date, 'HH:00')">
        {{ formatDate(date, 'h a') }}
      </time>
    </p>

    <div class="flex items-center justify-end gap-3">
      <p class="text-3xl text-right font-semibold text-blue-800">
        {{ temperature.toFixed(0) }}°C
      </p>
      <Icon
        class="text-gray-600"
        :size="26"
        :title="`${cloudcover}% cloud coverage`"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import formatDate from 'date-fns/format';
import DayIcon from 'vue-material-design-icons/WeatherSunny.vue';
import CloudyDayIcon from 'vue-material-design-icons/WeatherPartlyCloudy.vue';
import NightIcon from 'vue-material-design-icons/WeatherNight.vue';
import CloudyNightIcon from 'vue-material-design-icons/WeatherNightPartlyCloudy.vue';

interface Props {
  date: Date;
  temperature: number;
  cloudcover: number;
}

const props = defineProps<Props>();

const isNight = computed(
  () => props.date.getHours() >= 21 || props.date.getHours() < 9
);
const isCloudy = computed(() => props.cloudcover < 50);
const Icon = computed(
  () =>
    ({
      cloudy: {
        day: CloudyDayIcon,
        night: CloudyNightIcon,
      },
      clear: {
        day: DayIcon,
        night: NightIcon,
      },
    }[isCloudy.value ? 'cloudy' : 'clear'][isNight.value ? 'night' : 'day'])
);
</script>
