<script setup lang="ts">
const { emptyCart } = useCart();
</script>

<template>
  <NuxtLink class="cursor-pointer hover:text-red-500" title="Empty Cart" @click="emptyCart">{{ $t('messages.shop.removeAll') }}</NuxtLink>
    <!-- <TrashIcon /> -->
</template>
