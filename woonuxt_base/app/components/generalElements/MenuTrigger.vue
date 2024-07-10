<script setup lang="ts">
const { toggleMobileMenu } = useHelpers();
</script>

<template>
  <div @click="toggleMobileMenu">
    <!-- <svg class="cursor-pointer" width="45" height="24" viewBox="0 0 45 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="7.5" x2="40" y2="7.5" stroke="black" />
      <line x1="5" y1="11.5" x2="40" y2="11.5" stroke="black" />
      <line x1="5" y1="15.5" x2="40" y2="15.5" stroke="black" />
    </svg> -->
    <p class="cursor-pointer uppercase">Menu</p>
  </div>
</template>
