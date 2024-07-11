<script setup lang="ts">
const { wooNuxtVersionInfo } = useHelpers();
</script>

<template>
  <footer class="bg-white order-last">
    <div class="container flex flex-wrap justify-between gap-12 my-24 md:gap-24">
      <div class="mr-auto">
        <NuxtLink class="uppercase" to="/">Bike Innovation</NuxtLink>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div>
          <NuxtLink to="/categoria-prodotto/biciclette">{{ $t('messages.shop.bikes') }}</NuxtLink>
          <NuxtLink to="/categoria-prodotto/componenti-e-accessori">{{ $t('messages.shop.componentsAndAccessories') }}</NuxtLink>
          <NuxtLink to="/categoria-prodotto/abbigliamento">{{ $t('messages.shop.clothing') }}</NuxtLink>
          <NuxtLink to="/chi-siamo">{{ $t('messages.general.about') }}</NuxtLink>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div>
          <NuxtLink to="/contatti" class="py-1.5 block">{{ $t('messages.general.contact') }}</NuxtLink>
          <NuxtLink href="/shipping-returns" class="py-1.5 block">Shipping & Returns</NuxtLink>
          <NuxtLink href="/privacy-policy" class="py-1.5 block">Privacy Policy</NuxtLink>
          <NuxtLink href="/terms-conditions" class="py-1.5 block">Terms & Conditions</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}
</style>
