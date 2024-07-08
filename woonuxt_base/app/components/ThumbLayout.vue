<script lang="ts" setup>
const props = defineProps({
  picture: {
    type: Object,
    default: [],
    node: {
      type: Object,
      default: [],
      sourceUrl: {
        type: [String, Object],
        default: '',
      },
      srcSet: {
        type: [String, Object],
        default: '',
      },
      title: {
        type: [String, Object],
        default: '',
      },
    },
  },
  text: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  spacer: {
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
    <h1 v-if="picture.node.sourceUrl">{{ picture.node.sourceUrl }}</h1>
    <h1 v-if="picture.node.srcSet">{{ picture.node.srcSet }}</h1>
    <h1 v-if="picture.node.title">{{ picture.node.title }}</h1>
    <h1 v-if="text">{{ text }}</h1>
    <h1 v-if="size">{{ size }}</h1>
    <h1 v-if="spacer">{{ spacer }}</h1>
    <h1 v-if="link">{{ link.url }}</h1>
    <h1 v-if="link">{{ link.target }}</h1>
    <h1 v-if="link">{{ link.title }}</h1>
  </section>
</template>

<style scoped>
h1 {
  color: brown;
}
</style>
