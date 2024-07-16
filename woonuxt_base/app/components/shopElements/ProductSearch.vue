<script setup>
const { getSearchQuery, setSearchQuery, clearSearchQuery } = useSearching();
const searchQuery = ref(getSearchQuery());

const reset = () => {
  clearSearchQuery();
  searchQuery.value = '';
};

watch(getSearchQuery, (value) => {
  if (!value) reset();
});
</script>

<template>
  <form class="relative items-center flex-1 -space-x-px" @submit.prevent="setSearchQuery(searchQuery)">
    <!-- <Icon name="ion:search-outline" size="15" class="absolute z-10 opacity-50 pointer-events-none left-2" /> -->
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="$t('messages.shop.searchProducts')"
      class="uppercase z-0 inline-flex items-center w-full p-2 md:p-1.5 h-9 flex items-center text-gray-500 border border-gray-300 border-t-0 lg:border-t border-x-0 lg:border-x outline-none rounded-none" />
    <span
      v-if="searchQuery"
      class="absolute z-10 flex items-center rounded cursor-pointer text-gray-500 hover:text-black right-2 md:right-1.5"
      @click="reset">
      <!-- <span>{{ $t('messages.general.clear') }}</span> -->
      
    </span>
  </form>
</template>
