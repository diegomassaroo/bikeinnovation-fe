<script setup lang="ts">
const { toggleMobileMenu, wooNuxtVersionInfo } = useHelpers();
</script>

<template>
  <div class="bg-white flex flex-col max-w-lg shadow-lg top-0 bottom-0 left-0 w-full sm:w-11/12 z-50 fixed overflow-x-hidden">
    <!-- <div class="w-full border-b border-gray-300"><CloseIcon class="p-1.5" @click="toggleMobileMenu(false)" /></div> -->
    <div class="w-full border-b border-gray-300 p-2 md:p-1.5 h-9 flex items-center"><NuxtLink class="cursor-pointer" @click="toggleMobileMenu(false)"></NuxtLink></div>
    <div class="uppercase p-2 md:p-1.5 h-9 flex items-center text-gray-500 border-b border-gray-300">{{ $t('messages.general.menu') }}</div>
    <MainMenu class="grid" />
  </div>
</template>
