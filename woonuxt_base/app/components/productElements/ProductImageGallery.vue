<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import { useCssVar } from '@vueuse/core';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const modules = [Navigation];
const { fallbackImage } = useHelpers();

const props = defineProps({
  mainImage: { type: Object, required: true },
  gallery: { type: Object, required: true },
  node: { type: Object as PropType<Product>, required: true },
  activeVariation: { type: Object, required: false },
});

const primaryImage = computed(() => ({
  sourceUrl: props.mainImage.sourceUrl || fallbackImage,
  title: props.mainImage.title,
  altText: props.mainImage.altText,
  databaseId: props.mainImage.databaseId,
}));

const imageToShow = ref(primaryImage.value);

const galleryImages = computed(() => {
  // Add the primary image to the start of the gallery and remove duplicates
  return [primaryImage.value, ...props.gallery.nodes];
});

const currentSlide = ref(1);
const totalSlides = ref(galleryImages.value.length);
const progressBarWidth = ref('0%');

const updateCurrentSlide = (swiper) => {
  const slideIndex = swiper.realIndex;
  currentSlide.value = slideIndex + 1;
  progressBarWidth.value = `${((slideIndex + 1) / galleryImages.value.length) * 100}%`;
};

onMounted(() => {
  totalSlides.value = galleryImages.value.length;
});

const pagEl = ref(null);
const { height: pagHeight } = useElementBounding(pagEl);

const pagVar = useCssVar('--pag-height');

watch(pagHeight, (v) => {
  pagVar.value = `${Math.round(v)}px`;
});
</script>

<template>
  <div>
    <!-- <SaleBadge :node="node" class="absolute text-base top-4 right-4" /> -->
    <swiper
      class="swiperContainer"
      :loop="true"
      :modules="modules"
      :navigation="{ prevEl: '.prevEl', nextEl: '.nextEl' }"
      :slides-per-view="1"
      :space-between="0"
      :speed="200"
      @slideChange="updateCurrentSlide"
      @swiper="updateCurrentSlide"
      :draggable="true">
      <swiper-slide v-for="image in galleryImages" :key="image.databaseId"
        ><NuxtImg
          :key="image.databaseId"
          :src="image.sourceUrl"
          :alt="image.altText || node.name"
          :title="image.title || node.name"
          fetchpriority="high"
          placeholder
          placeholder-class="blur-xl"
          class="w-full h-full object-center object-contain overflow-hidden"
      /></swiper-slide>
    </swiper>
    <div class="sticky-container paginationFraction w-fit bottom-0 z-10 absolute left-1/2 md:m-1.5">
      <div ref="pagEl" class="sticky-pagination md:sticky bg-white flex p-2 md:p-3 h-9 items-center gap-2">
        <button class="prevEl cursor-pointer">←</button>
        <div>
          <span>{{ currentSlide }}</span
          >/<span>{{ totalSlides }}</span>
        </div>
        <button class="nextEl cursor-pointer">→</button>
      </div>
    </div>
    <div class="progressContainer bg-gray-300">
      <div class="progressBar bg-black h-px" :style="{ width: progressBarWidth }"></div>
    </div>
  </div>
</template>

<style scoped>
.swiperContainer {
  aspect-ratio: 5 / 4;
}

.paginationFraction {
  transform: translate(-50%, 0);
}

@media (max-width: 767px) {
  .paginationFraction {
    display: none;
  }
}

@media (min-width: 768px) {
  .swiperContainer {
    aspect-ratio: 16 / 9;
  }
  .progressContainer {
    display: none;
  }
  .sticky-container {
    height: var(--slider-height);
  }
  .sticky-pagination {
    top: calc(100vh - var(--pag-height) - 6px);
  }
}
</style>
