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
    <div class="relative" :class="{'mb-24 md:mb-40': spacer.includes('Large')}">
      <div v-if="picture" :class="size.includes('Left') ? 'flex justify-start' : 'flex justify-end'">
        <NuxtImg
          :class="size.includes('Full') ? 'w-full' : 'w-1/2'"
          :src="picture.node.sourceUrl"
          :alt="picture.node.altText"
          :title="picture.node.title"
          placeholder
          placeholder-class="blur-xl" />
      </div>
      <div v-if="text || link" class="bg-white p-2 md:p-3 md:absolute md:left-1/2 md:top-1/2 translate-50 grid gap-1">
        <div v-if="text">
          <p class="text-center">{{ text }}</p>
        </div>
        <div class="content-center grid" v-if="link">
          <NuxtLink class="text-center uppercase underline hover:no-underline" :to="link.url" :target="link.target">{{ link.title }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 768px) {
  .translate-50 {
    transform: translate(-50%, -50%);
  }
}
</style>
