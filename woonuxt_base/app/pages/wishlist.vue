<script setup lang="ts">
const { theList } = useWishlist();
</script>

<template>
  <div class="mx-auto my-4 min-h-[680px] w-full max-w-3xl px-4 border border-black">
    <h1 class="py-4 my-4 text-xl tracking-s md:text-2xl text-center border-b border-black">{{ $t('messages.shop.wishlist') }}</h1>
    <client-only>
      <ul v-if="theList.length" class="grid my-8 divide-y divide-black">
        <LazyWishListItem v-for="product in theList" :key="product.databaseId" :product="product" />
      </ul>
      <div v-else class="flex text-center min-h-[680px] text-gray-300 uppercase items-center justify-center">
        <p>{{ $t('messages.shop.wishlistNoItems') }}</p>
      </div>
    </client-only>
  </div>
</template>

<style scoped>
.tracking-s {
  letter-spacing: -0.015em;
}
</style>