<script setup>
const route = useRoute();

const isRouteActive = (uri) => {
  return route.path === uri;
};
</script>

<template>
  <nav>
    <NuxtLink
      :class="{'route-link-active' : isRouteActive('/categoria-prodotto/biciclette')}"
      class="uppercase border-b border-gray-300 p-2 md:p-1.5 h-9 flex items-center lg:hidden"
      to="/my-account"
      >{{ $t('messages.account.personalAccount') }}</NuxtLink
    >
    <NuxtLink
      :class="{'route-link-active' : isRouteActive('/categoria-prodotto/biciclette')}"
      class="uppercase border-b border-gray-300 lg:border-0 p-2 md:p-1.5 h-9 lg:h-auto flex items-center lg:p-0"
      to="/categoria-prodotto/biciclette"
      >{{ $t('messages.shop.bikes') }}</NuxtLink
    >
    <NuxtLink
      :class="{'route-link-active' : isRouteActive('/categoria-prodotto/componenti-e-accessori')}"
      class="uppercase border-b border-gray-300 lg:border-0 p-2 md:p-1.5 h-9 lg:h-auto flex items-center lg:p-0"
      to="/categoria-prodotto/componenti-e-accessori"
      >{{ $t('messages.shop.componentsAndAccessories') }}</NuxtLink
    >
    <NuxtLink
      :class="{'route-link-active' : isRouteActive('/categoria-prodotto/abbigliamento')}"
      class="uppercase border-b border-gray-300 lg:border-0 p-2 md:p-1.5 h-9 lg:h-auto flex items-center lg:p-0"
      to="/categoria-prodotto/abbigliamento"
      >{{ $t('messages.shop.clothing') }}</NuxtLink
    >
    <NuxtLink
      :class="{'route-link-active' : isRouteActive('/chi-siamo')}"
      class="uppercase border-b border-gray-300 lg:border-0 p-2 md:p-1.5 h-9 lg:h-auto flex items-center lg:p-0"
      to="/chi-siamo"
      >{{ $t('messages.general.about') }}</NuxtLink
    >
  </nav>
</template>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}

.route-link-active {
  @apply underline;
}
</style>
