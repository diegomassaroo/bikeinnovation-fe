<script setup>
const { data: pageData } = await useAsyncGql('getPage', { uri: '/shipping-returns' });

const layoutComponents = new Map([
  ['PageGroupPageFieldsTextLayout', resolveComponent('TextLayout')],
  ['PageGroupPageFieldsTitleLayout', resolveComponent('TitleLayout')],
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