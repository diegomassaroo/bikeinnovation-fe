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
});
</script>

<template>
  <section>
    <h1 v-if="text">{{ text }}</h1>
    <h1 v-if="link">{{ link.url }}</h1>
    <h1 v-if="link">{{ link.target }}</h1>
    <h1 v-if="link">{{ link.title }}</h1>
  </section>
</template>

<style scoped>
h1 {
  color: pink;
}
</style>
