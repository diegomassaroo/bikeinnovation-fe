<script setup>
import { countries } from '#constants';
const { allowedCountries } = await GqlGetStates({ country: 'IE' });

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
// @ts-ignore
const countriesToShow = computed(() => (allowedCountries?.length ? countries.filter((country) => allowedCountries.includes(country.countryCode)) : countries));

function select(evt) {
  emit('update:modelValue', evt.target.value);
}
</script>

<template>
  <select :value="modelValue" @change="select">
    <option value="" disabled>Select a country</option>
    <option v-for="country in countriesToShow" :key="country.countryName" :value="country.countryCode">
      {{ country.countryName }}
    </option>
  </select>
</template>

<style scoped lang="postcss">
.account-form select, select {
  @apply bg-white border-b h-9 rounded-none outline-none border-gray-300 w-full p-2;
}
</style>
