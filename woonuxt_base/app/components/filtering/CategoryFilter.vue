<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  hideEmpty: { type: Boolean, default: false },
  showCount: { type: Boolean, default: false },
  open: { type: Boolean, default: true },
});

const { data } = await useAsyncGql('getProductCategories');

const allCategories = data.value?.productCategories?.edges || [];
const { getFilter, setFilter, isFiltersActive } = useFiltering();
const selectedTerms = ref(getFilter('category') || []);

const route = useRoute();
const categorySlug = route.params.categorySlug;
if (categorySlug) selectedTerms.value = [categorySlug];

const isOpen = ref(props.open);

watch(isFiltersActive, () => {
  // Uncheck all checkboxes when filters are cleared
  if (!isFiltersActive.value) selectedTerms.value = [];
});

// Update the URL when the checkbox is changed
const checkboxChanged = () => {
  setFilter('category', selectedTerms.value);
};

// Get the children of the specific category based on the route path
const filteredCategories = computed(() => {
  const parentCategoryMap = {
    '/categoria-prodotto/biciclette': 'biciclette',
    '/categoria-prodotto/componenti-e-accessori': 'componenti-e-accessori',
    '/categoria-prodotto/abbigliamento': 'abbigliamento',
  };

  const parentSlug = parentCategoryMap[route.path];

  const parentCategory = allCategories.find(cat => cat.node.slug === parentSlug);
  return parentCategory?.node.children?.nodes || [];
});
</script>

<template>
  <div v-if="filteredCategories.length" class="w-full">
    <div class="p-2 pb-0 md:p-1.5 md:pb-0">
      <span v-if="route.path === '/categoria-prodotto/biciclette'" class="text-xl md:text-2xl tracking-s">{{ $t('messages.shop.bikes') }}</span>
      <span v-if="route.path === '/categoria-prodotto/componenti-e-accessori'" class="text-xl md:text-2xl tracking-s">{{ $t('messages.shop.componentsAndAccessories') }}</span>
      <span v-if="route.path === '/categoria-prodotto/abbigliamento'" class="text-xl md:text-2xl tracking-s">{{ $t('messages.shop.clothing') }}</span>
    </div>
    <div v-show="isOpen" class="p-2 md:p-1.5 max-h-[240px] flex gap-2 overflow-auto custom-scrollbar flex-wrap">
      <div v-for="cat in filteredCategories" :key="cat.slug" class="flex gap-2">
        <input :id="cat.slug" v-model="selectedTerms" type="checkbox" :value="cat.slug" @change="checkboxChanged" />
        <label :for="cat.slug" class="cursor-pointer leading-tight">
          <span class="cursor-pointer text-black uppercase" v-html="cat.name" />
          <span v-if="showCount" class="ml-1 text-black tabular-nums">({{ cat.count || 0 }})</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-s {
  letter-spacing: -0.015em;
}
</style>