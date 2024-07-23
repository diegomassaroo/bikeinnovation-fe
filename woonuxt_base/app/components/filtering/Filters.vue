<script setup>
// const { isFiltersActive } = useFiltering();
const { removeBodyClass } = useHelpers();
const runtimeConfig = useRuntimeConfig();

const globalProductAttributes = runtimeConfig?.public?.GLOBAL_PRODUCT_ATTRIBUTES || [];
// hide-categories prop is used to hide the category filter on the product category page
const { hideCategories } = defineProps({ hideCategories: { type: Boolean, default: false } });
</script>

<template>
  <div id="filters">
    <div class="hidden filter-overlay w-full border-b border-gray-300 p-2 md:p-1.5 h-9 items-center"><NuxtLink class="cursor-pointer" @click="removeBodyClass('show-filters')"></NuxtLink></div>
    <OrderByDropdown class="block w-full md:hidden" />
    <div class="z-30">
      <CategoryFilter v-if="!hideCategories" />
      <div v-for="attribute in globalProductAttributes" :key="attribute.slug">
        <ColorFilter
          v-if="attribute.slug == 'pa_color' || attribute.slug == 'pa_colour'"
          :filter-slug="attribute.slug"
          :label="attribute.label"
          :open="attribute.openByDefault"
          :show-count="attribute.showCount"
          :hide-empty="attribute.hideEmpty" />
        <GlobalFilter
          v-else
          :filter-slug="attribute.slug"
          :label="attribute.label"
          :open="attribute.openByDefault"
          :show-count="attribute.showCount"
          :hide-empty="attribute.hideEmpty" />
      </div>
      <!-- <LazyResetFiltersButton v-if="isFiltersActive" /> -->
    </div>
  </div>
  <div class="fixed inset-0 z-50 hidden bg-black opacity-25 filter-overlay" @click="removeBodyClass('show-filters')"></div>
</template>

<style lang="postcss">
.show-filters .filter-overlay {
  @apply block;
}
.show-filters {
  overflow: hidden;
}

#filters {

  & .slider-connect {
    @apply bg-primary;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  input[type='checkbox'],
  input[type='radio'] {
    @apply bg-white border rounded-lg cursor-pointer outline-none border-black w-full p-3 transition-all duration-150 appearance-none;

    width: 1em;
    height: 1em;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    padding: 0;
  }

  input[type='radio'] {
    border-radius: 50%;
  }

  input[type='checkbox']:after,
  input[type='radio']:after {
    display: block;
    opacity: 0;
    transition: all 250ms cubic-bezier(0.65, -0.43, 0.4, 1.71);
  }

  input[type='checkbox']:after {
    width: 5px;
    height: 9px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(0deg) translate(-1px, 1px) scale(0.75);
    position: absolute;
    top: 3px;
    left: 6.5px;
  }

  input[type='radio']:after {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transform: scale(0);
    position: absolute;
    background: #fff;
    top: 4px;
    left: 4px;
  }

  input[type='checkbox']:checked:after,
  input[type='checkbox'] + label,
  input[type='radio'] + label {
    @apply cursor-pointer text-gray-600 hover:text-primary;
  }

  input[type='checkbox']:checked + label,
  input[type='radio']:checked + label {
    @apply text-gray-800 hover:text-primary-dark;
  }

  input[type='checkbox']:checked,
  input[type='radio']:checked {
    @apply bg-primary border-0;
  }

  input[type='checkbox']:checked:after {
    opacity: 1;
    transform: rotate(45deg) translate(-1px, 1px) scale(1);
  }

  input[type='radio']:checked:after {
    opacity: 1;
    transform: scale(1);
  }
}

.price-input {
  @apply border rounded-xl outline-none leading-tight w-full p-2 transition-all;

  &.active {
    @apply border-gray-400 pl-6;
  }
}

@media (max-width: 767px) {
  #filters {
    @apply bg-white h-full w-full sm:w-11/12 transform transition-all ease-in-out bottom-0 -translate-x-[110vw] duration-300 overflow-auto fixed;
    z-index: 60;
  }

  .show-filters #filters {
    @apply transform-none;
  }
}
</style>
