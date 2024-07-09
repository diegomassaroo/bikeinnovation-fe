<script setup lang="ts">
const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 bg-white">
    <div class="p-2 sm:py-0 flex justify-between gap-6">
      <div class="flex items-center">
        <MenuTrigger class="lg:hidden" />
        <Logo class="md:w-[230px] " />
      </div>
      <div class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-2 sm:gap-5">
        <MainMenu class="items-center hidden gap-5 lg:flex" />
        <ProductSearch class="hidden sm:inline-flex max-w-[320px] w-[60%]" />
        <SearchTrigger />
        <div class="flex gap-4 items-center">
          <CartTrigger />
        </div>
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <div class="container p-2 sm:hidden" v-if="isShowingSearch">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
</template>
