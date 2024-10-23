<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);
const { t } = useI18n();
const addToCartButtonText = computed(() => (isLoading.value ? t('messages.shop.adding') : props.disabled ? t('messages.shop.outOfStock') : t('messages.shop.addToCart')));

// stop loading when cart is updated
watch(cart, (val) => {
  isLoading.value = false;
});
</script>

<template>
  <button
    type="submit"
    class="flex bg-black md:bg-white border border-black uppercase text-white md:text-black hover:duration-0 hover:bg-black hover:text-white text-center min-w-[150px] p-2 md:p-1.5 h-12 md:h-9 gap-4 items-center justify-center focus:outline-none"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true">
    <span>{{ addToCartButtonText }}</span>
    <LoadingIcon v-if="isLoading" stroke="4" size="12" color="#fff" />
  </button>
</template>

<style lang="postcss" scoped>
button {
  outline: none !important;
  transition: all 150ms ease-in;
}

button.disabled {
  @apply cursor-not-allowed bg-white border-gray-300 text-gray-300 hover:text-gray-300 hover:bg-white;
}
</style>
