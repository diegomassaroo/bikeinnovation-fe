<script setup>
const { toggleBodyClass, removeBodyClass } = useHelpers();
const { isFiltersActive } = await useFiltering();
onBeforeUnmount(() => {
  removeBodyClass('show-filters');
});
</script>

<template>
  <div class="p-2 lg:p-1.5">
    <NuxtLink
      class="uppercase cursor-pointer items-center text-black bg-white hover:underline focus:z-20"
      aria-label="Show filters"
      @click="toggleBodyClass('show-filters')"
      title="Show filters">{{ $t('messages.general.filters') }} +</NuxtLink>
    <span class="absolute z-20 w-2.5 h-2.5 rounded-full bg-primary -top-1 -right-1" v-if="isFiltersActive" />
  </div>
</template>
