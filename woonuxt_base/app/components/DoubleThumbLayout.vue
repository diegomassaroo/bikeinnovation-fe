<script lang="ts" setup>
const props = defineProps({
  firstThumb: {
    type: Object,
    default: [],
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
  },
  secondThumb: {
    type: Object,
    default: [],
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
  },
});
</script>

<template>
  <section>
    <h1 v-if="firstThumb.picture.node.sourceUrl">{{ firstThumb.picture.node.sourceUrl }}</h1>
    <h1 v-if="firstThumb.picture.node.srcSet">{{ firstThumb.picture.node.srcSet }}</h1>
    <h1 v-if="firstThumb.picture.node.title">{{ firstThumb.picture.node.title }}</h1>
    <h1 v-if="firstThumb.link.url">{{ firstThumb.link.url }}</h1>
    <h1 v-if="firstThumb.link.target">{{ firstThumb.link.target }}</h1>
    <h1 v-if="firstThumb.link.title">{{ firstThumb.link.title }}</h1>
    <h1 v-if="secondThumb.picture.node.sourceUrl">{{ secondThumb.picture.node.sourceUrl }}</h1>
    <h1 v-if="secondThumb.picture.node.srcSet">{{ secondThumb.picture.node.srcSet }}</h1>
    <h1 v-if="secondThumb.picture.node.title">{{ secondThumb.picture.node.title }}</h1>
    <h1 v-if="secondThumb.link.url">{{ secondThumb.link.url }}</h1>
    <h1 v-if="secondThumb.link.target">{{ secondThumb.link.target }}</h1>
    <h1 v-if="secondThumb.link.title">{{ secondThumb.link.title }}</h1>
  </section>
</template>

<style scoped>
h1 {
  color: green;
}
</style>
