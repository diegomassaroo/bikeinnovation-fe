<script setup lang="ts">
const { siteName } = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const img = useImage();

const logoUrl = runtimeConfig?.public?.LOGO ? img(runtimeConfig?.public?.LOGO) : null;
const homeUrl = '/logo.svg';
</script>

<template>
  <NuxtLink to="/">
    <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="object-contain" />
    <div v-else class="flex items-center">
      <img :src="homeUrl" alt="Logo" width="233" height="21" />
    </div>
  </NuxtLink>
</template>
