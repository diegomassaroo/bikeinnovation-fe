<script setup lang="ts">
const { toggleMobileMenu, wooNuxtVersionInfo } = useHelpers();
</script>

<template>
  <div class="bg-white flex flex-col max-w-lg shadow-lg top-0 bottom-0 left-0 w-full sm:w-11/12 z-50 fixed overflow-x-hidden">
    <div class="w-full border-b"><CloseIcon class="p-1.5" @click="toggleMobileMenu(false)" /></div>
    <div class="uppercase p-2 text-gray-500 border-b">{{ $t('messages.general.menu') }}</div>
    <MainMenu class="grid" />
  </div>
</template>
