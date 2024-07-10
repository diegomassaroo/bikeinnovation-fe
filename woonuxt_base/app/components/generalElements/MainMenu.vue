<template>
  <nav>
    <NuxtLink class="uppercase border-b sm:border-0 p-2 md:p-1.5" to="/categoria-prodotto/biciclette">{{ $t('messages.shop.bikes') }}</NuxtLink>
    <NuxtLink class="uppercase border-b sm:border-0 p-2 md:p-1.5" to="/categoria-prodotto/componenti-e-accessori">{{ $t('messages.shop.componentsAndAccessories') }}</NuxtLink>
    <NuxtLink class="uppercase border-b sm:border-0 p-2 md:p-1.5" to="/categoria-prodotto/abbigliamento">{{ $t('messages.shop.clothing') }}</NuxtLink>
    <NuxtLink class="uppercase border-b sm:border-0 p-2 md:p-1.5" to="/chi-siamo">{{ $t('messages.general.about') }}</NuxtLink>
  </nav>
</template>
