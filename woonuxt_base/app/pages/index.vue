<script setup>
const { siteName, description, shortDescription, siteImage } = useAppConfig();

const { data: pageData } = await useAsyncGql('getPage', { uri: '/' });

useSeoMeta({
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});

useHead({
  titleTemplate: `${siteName}`,
});

const layoutComponents = new Map([
  ['PageGroupPageFieldsCoverLayout', resolveComponent('CoverLayout')],
  ['PageGroupPageFieldsTextLayout', resolveComponent('TextLayout')],
  ['PageGroupPageFieldsTitleLayout', resolveComponent('TitleLayout')],
  ['PageGroupPageFieldsThumbLayout', resolveComponent('ThumbLayout')],
  ['PageGroupPageFieldsDoubleThumbLayout', resolveComponent('DoubleThumbLayout')],
  ['PageGroupPageFieldsProductsLayout', resolveComponent('ProductsLayout')],
]);

const blocks = computed(() => {
  return pageData.value?.page?.pageGroup?.pageFields?.map((field) => {
    return {
      component: layoutComponents.get(field?.fieldGroupName),
      props: field,
    };
  });
});
</script>

<template>
  <main>
    <component v-for="(block, index) in blocks" :key="index" :is="block.component" v-bind="block.props" />
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
