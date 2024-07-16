<script setup lang="ts">
import TimeDisplay from './TimeDisplay.vue';

const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 bg-white z-50">
    <div class="p-2 md:px-1.5 md:py-1.5 lg:py-0 flex justify-between gap-2 h-9 border-b border-gray-300 lg:border-b-0">
      <div class="flex items-center gap-5">
        <Logo class="w-[180px] md:w-[231px]" />
        <TimeDisplay class="hidden sm:flex" />
      </div>
      <div class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-3.5 lg:gap-5">
        <MainMenu class="items-center hidden gap-5 lg:flex" />
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
      <div class="p-0 lg:hidden">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
</template>
