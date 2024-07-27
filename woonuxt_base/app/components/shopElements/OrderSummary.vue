<script setup>
const { cart, isUpdatingCart } = useCart();
</script>

<template>
  <aside v-if="cart" class="bg-white w-full relative lg:max-w-md lg:top-24 lg:sticky gap-5 grid">
    <h2 class="text-xl tracking-s md:text-2xl">{{ $t('messages.shop.orderSummary') }}</h2>

    <ul class="flex flex-col gap-4 overflow-y-scroll">
      <CartCard v-for="item in cart.contents.nodes" :key="item.key" :item />
    </ul>

    <!-- <AddCoupon class="my-8" /> -->

    <div class="grid gap-1 text-gray-500">
      <div class="uppercase text-gray-500 flex justify-between">
        <span>{{ $t('messages.shop.subtotal') }}</span>
        <span class="text-black tabular-nums" v-html="cart.subtotal" />
      </div>
      <div class="uppercase text-gray-500 flex justify-between">
        <span>{{ $t('messages.general.shipping') }}</span>
        <span class="text-black tabular-nums">+ <span v-html="cart.shippingTotal" /></span>
      </div>
      <Transition name="scale-y" mode="out-in">
        <div v-if="cart && cart.appliedCoupons" class="flex justify-between">
          <span>{{ $t('messages.shop.discount') }}</span>
          <span class="text-black tabular-nums">- <span v-html="cart.discountTotal" /></span>
        </div>
      </Transition>
      <div class="flex justify-between mt-4">
        <span class="text-xl md:text-2xl text-black">{{ $t('messages.shop.total') }}</span>
        <span class="text-xl md:text-2xl text-black" v-html="cart.total" />
      </div>
    </div>

    <slot></slot>

    <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
      <LoadingIcon />
    </div>
  </aside>
</template>

<style scoped>
.tracking-s {
  letter-spacing: -0.015em;
}
</style>