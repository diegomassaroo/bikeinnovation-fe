<template>
  <nav>
    <NuxtLink to="/categoria-prodotto/biciclette">{{ $t('messages.shop.bikes') }}</NuxtLink>
    <NuxtLink to="/categoria-prodotto/componenti-e-accessori">{{ $t('messages.shop.componentsAndAccessories') }}</NuxtLink>
    <NuxtLink to="/categoria-prodotto/abbigliamento">{{ $t('messages.shop.clothing') }}</NuxtLink>
    <NuxtLink to="/chi-siamo">{{ $t('messages.general.about') }}</NuxtLink>
  </nav>
</template>
