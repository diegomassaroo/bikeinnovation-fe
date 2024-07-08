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
});
</script>

<template>
  <section>
    <h1 v-if="title">{{ title }}</h1>
    <h1 v-if="text">{{ text }}</h1>
  </section>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>
