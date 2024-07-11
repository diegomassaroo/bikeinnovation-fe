<script setup>
const { toggleCart, cart } = useCart();
</script>

<template>
  <div class="relative cursor-pointer inline-flex" title="Cart" @click="toggleCart">
    <NuxtLink class="uppercase">{{ $t('messages.shop.cart') }}</NuxtLink>
    <!-- <Icon name="ion:cart-outline" size="22" class="sm:hidden mr-1 md:mr-0" /> -->
    <ClientOnly>
      <Transition name="popIn" mode="out-in">
        <span
          v-if="cart?.contents?.itemCount > 0"
          >&nbsp;[{{ cart?.contents?.itemCount }}]</span
        >
      </Transition>
    </ClientOnly>
  </div>
</template>

<style lang="postcss">
/* popIn */
.popIn-enter-active,
.popIn-leave-active {
  transition: all 200ms cubic-bezier(0, 0, 0.57, 1.61);
}

.popIn-enter-from,
.popIn-leave-to {
  transform: scale(0);
}
</style>
