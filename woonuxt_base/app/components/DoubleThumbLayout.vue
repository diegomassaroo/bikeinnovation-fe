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
  spacer: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <section>
    <div class="w-full block md:flex" :class="{ 'mb-24 md:mb-40': spacer.includes('Large') }">
      <div class="w-full relative" v-if="firstThumb">
        <NuxtImg
          class="aspect-vertical w-full"
          :src="firstThumb.picture.node.sourceUrl"
          :alt="firstThumb.picture.node.altText"
          :title="firstThumb.picture.node.title"
          placeholder
          placeholder-class="blur-xl" />
        <div v-if="firstThumb.link" class="bg-white p-2 md:p-3 md:absolute md:left-1/2 md:top-1/2 translate-50 grid gap-1">
          <div class="content-center grid" v-if="firstThumb.link">
            <NuxtLink class="text-center uppercase underline hover:no-underline" :to="firstThumb.link.url" :target="firstThumb.link.target">{{ firstThumb.link.title }}</NuxtLink>
          </div>
        </div>
      </div>
      <div class="w-full relative" v-if="secondThumb">
        <NuxtImg
          class="aspect-vertical w-full"
          :src="secondThumb.picture.node.sourceUrl"
          :alt="secondThumb.picture.node.altText"
          :title="secondThumb.picture.node.title"
          placeholder
          placeholder-class="blur-xl" />
        <div v-if="secondThumb.link" class="bg-white p-2 md:p-3 md:absolute md:left-1/2 md:top-1/2 translate-50 grid gap-1">
          <div class="content-center grid" v-if="secondThumb.link">
            <NuxtLink class="text-center uppercase underline hover:no-underline" :to="secondThumb.link.url" :target="secondThumb.link.target">{{
              secondThumb.link.title
            }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aspect-vertical{
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

@media (min-width: 768px) {
  .translate-50 {
    transform: translate(-50%, -50%);
  }
}
</style>
