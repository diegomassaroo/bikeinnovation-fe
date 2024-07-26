<script setup lang="ts">
const { allProducts } = useProducts();
const { clearSearchQuery, isSearchActive } = useSearching();
const { resetFilter, isFiltersActive } = useFiltering();

const clearAll = () => {
  if (isFiltersActive.value) resetFilter();
  if (isSearchActive.value) clearSearchQuery();
};
</script>

<template>
  <div class="w-full my-16 lg:my-24 min-h-64 items-center flex">
    <div class="flex flex-col items-center justify-center w-full text-center">
      <!-- <Icon name="ion:sad-outline" size="156" class="opacity-25 mb-10" /> -->
      <h2 class="text-xl tracking-s md:text-2xl">Nessun prodotto trovato</h2>
      <p class="mt-2 max-w-xs">
        <slot>Prova a modificare la ricerca o il filtro per trovare ciò che stai cercando.</slot>
      </p>
      <div>
        <button
          v-if="allProducts.length"
          class="bg-primary rounded-lg font-bold mt-8 text-center text-white w-full p-2 px-3 inline-block"
          title="Clear all filters and search"
          aria-label="Clear all filters and search"
          @click="clearAll">
          Clear all
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-s {
  letter-spacing: -0.015em;
}
</style>