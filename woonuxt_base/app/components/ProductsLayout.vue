<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object,
    default: [],
    nodes: {
      type: Array,
      default: null
    },
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
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section>
    <h1 v-if="title">{{ title }}</h1>
    <h1 v-if="link">{{ link }}</h1>
    <div v-if="product.nodes" v-for="(node, i) in product.nodes"><h1>{{ node }}</h1></div>
  </section>
</template>

<style scoped>
h1 {
  color: orange;
}
</style>
