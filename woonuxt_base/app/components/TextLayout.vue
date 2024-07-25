<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  spacer: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section>
    <div class="p-2 md:p-3 gap-2 grid grid-cols-4" :class="{ 'mb-24 md:mb-40': spacer.includes('Large') }">
      <div v-if="title" class="grid col-start-1 col-span-4 lg:col-start-2 lg:col-span-3">
        <p class="text-xl md:text-2xl tracking-s">{{ title }}</p>
      </div>
      <div v-if="text" class="grid col-start-1 col-span-4 lg:col-start-2 lg:col-span-2 md:col-span-3">
        <p>{{ text }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tracking-s {
  letter-spacing: -0.015em;
}
</style>
