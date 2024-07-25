<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: Object,
    default: [],
    url: {
      type: [String, Object],
      default: '',
    },
    target: {
      type: [String, Object],
      default: '',
    },
    title: {
      type: [String, Object],
      default: '',
    },
  },
  spacer: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section>
    <div class="p-2 md:p-3 grid gap-2 max-w-3xl m-auto" :class="{ 'mb-24 md:mb-40': spacer.includes('Large') }">
      <p class="text-center text-xl md:text-2xl tracking-s" v-if="text">{{ text }}</p>
      <div class="grid" v-if="link">
        <NuxtLink class="text-center content-center uppercase underline hover:no-underline" :to="link.url" :target="link.target">{{ link.title }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tracking-s {
  letter-spacing: -0.015em;
}
</style>