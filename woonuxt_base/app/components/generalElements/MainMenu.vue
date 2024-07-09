<template>
  <nav>
    <NuxtLink class="uppercase" to="/categoria-prodotto/biciclette">{{ $t('messages.shop.bikes') }}</NuxtLink>
    <NuxtLink class="uppercase" to="/categoria-prodotto/componenti-e-accessori">{{ $t('messages.shop.componentsAndAccessories') }}</NuxtLink>
    <NuxtLink class="uppercase" to="/categoria-prodotto/abbigliamento">{{ $t('messages.shop.clothing') }}</NuxtLink>
    <NuxtLink class="uppercase" to="/chi-siamo">{{ $t('messages.general.about') }}</NuxtLink>
  </nav>
</template>
