<script setup>
const { setProducts, updateProductList } = useProducts();
const { isQueryEmpty } = useHelpers();
const route = useRoute();
const slug = route.params.slug;

const { data } = await useAsyncGql('getProducts', { slug });
setProducts(data.value?.products?.nodes || []);

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'categoria-prodotto-slug') return;
    updateProductList();
  },
);

useHead({
  title: 'Products',
  meta: [{ hid: 'description', name: 'description', content: 'Products' }],
});
</script>

<template>
  <div class="bg-white">
    <div class="w-full justify-between items-end flex mt-14 md:mt-24 lg:mt-36">
      <Filters />
      <OrderByDropdown class="hidden md:inline-flex" />
      <ShowFilterTrigger class="md:hidden" />
    </div>
    <div class="w-full">
      <!-- <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
        <ProductResultCount />
      </div> -->
      <ProductGrid />
    </div>
  </div>
</template>
