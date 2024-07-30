<script setup lang="ts">
import CloseIcon from '../cartElements/CloseIcon.vue';

const { cart, toggleCart, isUpdatingCart } = useCart();
</script>

<template>
  <div class="fixed top-0 bottom-0 right-0 z-50 flex flex-col w-full sm:w-11/12 max-w-lg overflow-x-hidden bg-white shadow-lg">
    <!-- <div class="w-full border-b border-gray-300"><CloseIcon class="p-1" @click="toggleCart(false)" /></div> -->
    <!-- <EmptyCart v-if="cart && !cart.isEmpty" class="p-1.5 hover:text-white" /> -->
    <div class="w-full border-b border-gray-300 p-2 md:p-1.5 h-9 flex items-center"><NuxtLink class="cursor-pointer" @click="toggleCart(false)"></NuxtLink></div>

    <div class="w-full border-b border-gray-300 flex justify-between p-2 md:p-1.5 h-9 flex items-center">
      <div>
        <span class="uppercase">{{ $t('messages.shop.cart') }}</span>
        <span v-if="cart?.contents?.productCount"> [{{ cart?.contents?.productCount }}] </span>
      </div>
      <div v-if="cart && !cart.isEmpty"><EmptyCart /></div>
    </div>

    <ClientOnly>
      <template v-if="cart && !cart.isEmpty">
        <ul class="grid content-start flex-col flex-1 overflow-y-scroll">
          <CartCard v-for="item in cart.contents?.nodes" :key="item.key" :item />
        </ul>
        <!-- <div class="border-t border-gray-300">
          <div class="p-2 md:p-1.5 h-9 justify-between items-center flex text-black">
            <span class="uppercase">{{ $t('messages.shop.shippingTotal') }}</span>
            <span v-html="cart.shippingTotal" />
          </div>
        </div> -->
        <div>
          <NuxtLink class="p-2 md:p-1.5 h-9 flex items-center justify-between text-black bg-green-400 hover:bg-black hover:text-white" to="/checkout">
            <span class="uppercase pr-2">{{ $t('messages.shop.checkout') }}</span>
            <span v-html="cart.subtotal" />
          </NuxtLink>
        </div>
      </template>
      <!-- Empty Cart Message -->
      <div v-else class="flex flex-col items-center justify-center flex-1 mb-12">
        <div class="uppercase text-gray-300">{{ $t('messages.shop.cartEmpty') }}</div>
      </div>
    </ClientOnly>
    <!-- Cart Loading Overlay -->
    <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25">
      <LoadingIcon />
    </div>
  </div>
</template>
