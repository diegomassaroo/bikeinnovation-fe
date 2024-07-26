<script lang="ts" setup>
const { logoutUser, viewer, customer, isPending } = useAuth();
const { cart } = useCart();
const route = useRoute();

const activeTab = computed(() => route.query.tab || 'my-details');
const showLoader = computed(() => !viewer && !customer);
</script>

<template>
  <div class="min-h-[680px]">
    <div v-if="showLoader || !cart" class="flex flex-col min-h-[500px]">
      <LoadingIcon class="m-auto" />
    </div>
    <template v-else>
      <LazyLoginAndRegister v-if="!viewer" />
      <div v-else class="flex flex-col items-start w-full lg:gap-8 mb-24">
        <nav class="border-b border-gray-300 p-2 md:p-1.5 h-9 flex gap-3.5 lg:gap-5 w-full text-black min-w-[240px] top-32">
          <NuxtLink
            to="/my-account?tab=my-details"
            class="uppercase flex items-center gap-4 hover:underline"
            :class="{ active: activeTab == 'my-details' }">
            {{ $t('messages.general.myDetails') }}
          </NuxtLink>
          <NuxtLink to="/my-account?tab=orders" class="uppercase flex items-center gap-4 hover:underline" :class="{ active: activeTab == 'orders' }">
            {{ $t('messages.shop.order', 2) }}
          </NuxtLink>
          <button class="uppercase flex items-center gap-4 hover:underline" @click="logoutUser">
            {{ $t('messages.account.logout') }}
          </button>
        </nav>

        <main class="flex-1 w-full lg:my-8">
          <AccountMyDetails v-if="activeTab === 'my-details'" :user="viewer" />
          <OrderList v-else-if="activeTab === 'orders'" />
        </main>
      </div>
    </template>
  </div>
</template>

<style lang="postcss" scoped>
a.active {
  @apply underline;
}
</style>
