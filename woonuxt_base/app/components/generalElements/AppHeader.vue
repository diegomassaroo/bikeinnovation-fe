<script setup lang="ts">
import TimeDisplay from './TimeDisplay.vue';

const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 bg-white z-50">
    <div class="py-2 px-2 md:px-1.5 md:py-1.5 lg:py-0 flex justify-between gap-2">
      <div class="flex items-center gap-4">
        <Logo class="w-[180px] md:w-[230px]" />
        <TimeDisplay class="hidden sm:flex" />
      </div>
      <div class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-3.5 lg:gap-4">
        <MainMenu class="items-center hidden gap-2 lg:flex" />
        <ProductSearch class="hidden lg:inline-flex max-w-[180px] md:w-[60%]" />
        <!-- <SearchTrigger /> -->
        <div class="flex lg:hidden items-center">
          <MenuTrigger />
        </div>
        <div class="flex gap-2 items-center">
          <CartTrigger />
        </div>
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <!-- <div class="container p-1.5 sm:hidden" v-if="isShowingSearch">
        <ProductSearch class="flex w-full" />
      </div> -->
      <div class="p-0 lg:hidden">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
</template>
