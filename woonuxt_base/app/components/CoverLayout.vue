<script lang="ts" setup>
const props = defineProps({
  video: {
    type: String,
    required: true,
  },
  poster: {
    type: Object,
    default: [],
    node: {
      type: Object,
      default: [],
      sourceUrl: {
        type: [String, Object],
        default: '',
      },
    },
  },
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
    type: String,
    required: true,
  },
});

console.log(props.spacer);

</script>

<template>
  <section>
    <div class="relative" :class="{'mb-24 md:mb-40': spacer.includes('Large')}">
      <div v-if="video">
        <video class="w-full aspect-video" autoplay muted loop :poster="poster.node.sourceUrl">
          <source :src="video" type="video/mp4" />
        </video>
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
