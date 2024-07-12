<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  hideEmpty: { type: Boolean, default: false },
  showCount: { type: Boolean, default: false },
  open: { type: Boolean, default: true },
});

const { data } = await useAsyncGql('getProductCategories');

const allCategories = data.value?.productCategories?.nodes || [];
const { getFilter, setFilter, isFiltersActive } = useFiltering();
const selectedTerms = ref(getFilter('category') || []);

const route = useRoute();
const categorySlug = route.params.categorySlug;
if (categorySlug) selectedTerms.value = [categorySlug];

const isOpen = ref(props.open);

watch(isFiltersActive, () => {
  // uncheck all checkboxes when filters are cleared
  if (!isFiltersActive.value) selectedTerms.value = [];
});

// Update the URL when the checkbox is changed
const checkboxChanged = () => {
  setFilter('category', selectedTerms.value);
};

console.log(allCategories);
</script>

<template>
  <div v-if="allCategories.length" class="w-full">
    <!-- <div class="cursor-pointer flex font-semibold mt-8 justify-between items-center" @click="isOpen = !isOpen">
      <span>{{ label || $t('messages.shop.category', 2) }}</span>
      <Icon name="ion:chevron-down-outline" class="transform" :class="isOpen ? 'rotate-180' : ''" />
    </div> -->
    <div class="p-2 pb-0 md:p-1.5 md:pb-0">
      <span class="text-xl">{{ allCategories[0].name }}</span>
    </div>
    <div v-show="isOpen" class="p-2 md:p-1.5 max-h-[240px] flex gap-2 overflow-auto custom-scrollbar">
      <div v-for="color in allCategories.slice(1)" :key="color.slug" class="flex gap-2">
        <input :id="color.slug" v-model="selectedTerms" type="checkbox" :value="color.slug" @change="checkboxChanged" />
        <label :for="color.slug" class="cursor-pointer leading-tight">
          <span class="cursor-pointer text-black uppercase" v-html="color.name" />
          <span v-if="showCount" class="ml-1 text-black tabular-nums">({{ color.count || 0 }})</span>
        </label>
      </div>
    </div>
  </div>
</template>
