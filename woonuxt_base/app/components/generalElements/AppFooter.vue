<script setup lang="ts">
const { wooNuxtVersionInfo } = useHelpers();
</script>

<template>
  <footer class="bg-black order-last">
    <div>
      <div class="w-full border-b p-2 md:p-1.5 sm:h-9 sm:flex items-center">
        <NuxtLink class="uppercase text-white" to="/">Bike Innovation</NuxtLink>
      </div>
      <div>
        <div class="w-full border-b gap-2 sm:gap-5 p-2 md:p-1.5 sm:h-9 grid sm:flex items-center">
          <NuxtLink class="text-white w-full flex sm:w-auto" to="/categoria-prodotto/biciclette">{{ $t('messages.shop.bikes') }}</NuxtLink>
          <NuxtLink class="text-white w-full flex sm:w-auto" to="/categoria-prodotto/componenti-e-accessori">{{ $t('messages.shop.componentsAndAccessories') }}</NuxtLink>
          <NuxtLink class="text-white w-full flex sm:w-auto" to="/categoria-prodotto/abbigliamento">{{ $t('messages.shop.clothing') }}</NuxtLink>
          <NuxtLink class="text-white w-full flex sm:w-auto" to="/categoria-prodotto/usato">{{ $t('messages.shop.usato') }}</NuxtLink>
          <NuxtLink class="text-white w-full flex sm:w-auto" to="/chi-siamo">{{ $t('messages.general.about') }}</NuxtLink>
        </div>
      </div>
      <div>
        <div class="w-full gap-2 sm:gap-5 p-2 md:p-1.5 sm:h-9 grid sm:flex items-center">
          <NuxtLink to="/contatti" class="text-white w-full flex sm:w-auto">{{ $t('messages.general.contact') }}</NuxtLink>
          <NuxtLink to="/spedizione-e-resi" class="text-white w-full flex sm:w-auto">{{ $t('messages.general.shippingReturns') }}</NuxtLink>
          <NuxtLink to="/informativa-privacy" class="text-white w-full flex sm:w-auto">{{ $t('messages.general.privacyPolicy') }}</NuxtLink>
          <NuxtLink to="/termini-e-condizioni" class="text-white w-full flex sm:w-auto">{{ $t('messages.general.termsConditions') }}</NuxtLink>
        </div>
      </div>
      <!-- <div class="w-full gap-2 sm:gap-5 p-2 md:p-1.5 sm:h-9 grid sm:flex items-center text-white ">© 2024</div> -->
    </div>
  </footer>
</template>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}
</style>
