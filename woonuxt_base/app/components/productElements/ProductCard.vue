<script setup lang="ts">
const route = useRoute();
const props = defineProps({
  node: { type: Object, default: null },
  index: { type: Number, default: 1 },
});

const imgWidth = 220;
const imgHeight = Math.round(imgWidth * 0.92);

// example: ?filter=pa_color[green,blue],pa_size[large]
const filterQuery = ref(route.query.filter);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

// watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

const mainImage = computed<string>(() => props.node?.image?.sourceUrl || '/images/placeholder.jpg');
const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes.nodes.some((attribute) => paColor.value.some((color) => attribute.value.includes(color)));
      const hasMatchingSlug = paColor.value.some((color) => variation.slug.includes(color));
      return hasMatchingAttributes || hasMatchingSlug;
    });
    if (activeColorImage?.length) return activeColorImage[0].image?.producCardSourceUrl || activeColorImage[0].image?.sourceUrl || mainImage.value;
  }
  return mainImage.value;
});
</script>

<template>
  <NuxtLink :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
    <div class="flex flex-col contents-between gap-2 lg:gap-1.5 product-card p-2 lg:p-1.5">
      <!-- <SaleBadge :node="node" class="absolute top-2 right-2" /> -->
      <NuxtImg
        class="flex-1"
        v-if="imagetoDisplay"
        :src="imagetoDisplay"
        :alt="node.image?.altText || node.name"
        :title="node.image?.title || node.name"
        :loading="index <= 2 ? 'eager' : 'lazy'"
        placeholder
        placeholder-class="blur-xl" />
      <div class="h-fit">
        <p class="uppercase">{{ node.name }}</p>
        <ProductPrice :sale-price="node.salePrice" :regular-price="node.regularPrice" />
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="postcss">
.product-card {
  aspect-ratio: 1;
}

.product-card img {
  @apply object-center object-cover w-full h-full;
  overflow: hidden;
}

.product-card:hover {
  p {
    @apply underline;
  }
}
</style>
