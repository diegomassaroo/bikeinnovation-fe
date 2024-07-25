<script setup lang="ts">
const { viewer, avatar, logoutUser, isPending } = useAuth();
const linkTitle = computed<string>(() => viewer.value?.username || 'Sign In');
</script>

<template>
  <NuxtLink to="/my-account" :title="linkTitle" class="hidden md:inline-flex aspect-square items-center">
    <Transition name="pop-in" mode="out-in">
      <span v-if="avatar" class="relative avatar">
        <p class="uppercase hover:underline">{{ $t('messages.account.personalAccount') }}</p>
        <!-- <img :src="avatar" class="rounded-full transform scale-125 shadow-md overflow-hidden border border-white my-auto" width="22" height="22" :alt="linkTitle" /> -->
        <div class="account-dropdown">
          <NuxtLink to="/wishlist" class="uppercase hover:bg-gray-100"><span>{{ $t('messages.shop.wishlist') }}</span></NuxtLink>
          <NuxtLink to="/my-account" class="uppercase hover:bg-gray-100"><span>{{ $t('messages.account.myAccount') }}</span></NuxtLink>
          <button class="uppercase text-red-600 hover:bg-red-50" @click.prevent="logoutUser">
            <LoadingIcon v-if="isPending" size="16" />
            <span>{{ $t('messages.account.logout') }}</span>
          </button>
        </div>
      </span>
      <span v-else class="uppercase hover:underline">{{ $t('messages.account.personalAccount') }}</span>
    </Transition>
  </NuxtLink>
</template>

<style scoped lang="postcss">
.pop-in-enter-active,
.pop-in-leave-active {
  transition: transform 0.3s;
}

.pop-in-enter-from,
.pop-in-leave-to {
  transform: scale(0);
}

.avatar {
  .account-dropdown {
    @apply absolute gap-2 top-6 -right-2  z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg text-gray-700 hidden;

    a,
    button {
      @apply flex gap-2 items-center p-2 rounded whitespace-nowrap min-w-[200px];
    }
  }

  &:hover .account-dropdown {
    @apply grid;
  }
}
</style>
