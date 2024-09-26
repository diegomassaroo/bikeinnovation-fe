<script setup>
const { updateShippingMethod } = useCart();
const props = defineProps({
  options: { type: Array, required: true },
  activeOption: { type: String, required: true },
});

const setActiveOption = async (id) => {
  await updateShippingMethod(id);
};
</script>

<template>
  <div class="grid gap-4 shipping-options">
    <div
      v-for="option in options"
      :key="option.id"
      class="flex items-center justify-between option"
      :class="{ 'active-option': option.id === activeOption }"
      @click="setActiveOption(option.id)">
      <div class="flex gap-2">
        <div class="text-gray-500" v-html="option.label"></div>
        <div class="text-gray-500">€{{ option.cost }}</div>
      </div>

      <icon name="ion:checkmark-circle" size="20" class="ml-auto text-primary checkmark opacity-0" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.shipping-options {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  .option {
    @apply bg-white border text-black cursor-pointer flex flex-1 p-2 gap-2 items-center hover:border-black;

    &.active-option {
      @apply border-black cursor-default pointer-events-none;

      & .checkmark {
        @apply opacity-100;
      }
    }
  }
}
</style>
