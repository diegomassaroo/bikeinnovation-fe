<script setup>
const router = useRouter();
const { formatDate, scrollToTop } = useHelpers();
const { getOrders, orders } = useAuth();

if (orders.value === null) getOrders();

const refresh = () => {
  orders.value = null;
  scrollToTop();
  getOrders();
};

const goToOrder = (orderNumber) => {
  router.push(`/order-summary/${orderNumber}`);
};
</script>

<template>
  <div class="bg-white flex min-h-[250px] p-2 md:p-1.5 justify-center items-center">
    <div v-if="orders && orders.length" class="w-full">
      <table class="rounded-none uppercase w-full text-left table-auto" aria-label="Order List">
        <thead>
          <tr>
            <th>{{ $t('messages.shop.order') }}</th>
            <th>{{ $t('messages.general.date') }}</th>
            <th>{{ $t('messages.general.status') }}</th>
            <th class="text-right">{{ $t('messages.shop.total') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.orderNumber" class="rounded-none cursor-pointer hover:underline" @click="goToOrder(order.orderNumber)">
            <td class="">
              {{ order.orderNumber }}
            </td>
            <td>{{ formatDate(order.date) }}</td>
            <td>
              <OrderStatusLabel :status="order.status" />
            </td>
            <td class="text-right">
              {{ order.total }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center flex justify-center w-full mt-8">
        <button type="button" @click="refresh" class="flex items-center gap-1 leading-none hover:bg-gray-50 p-2">
          <!-- <span>Reresh list</span> -->
          <Icon name="ion:refresh-outline" />
        </button>
      </div>
    </div>
    <div v-else-if="orders && orders.length === 0" class="min-h-[250px] flex items-center justify-center text-gray-500 text-xl md:text-2xl tracking-s">No orders found.</div>
    <LoadingIcon v-else size="24" stroke="2" />
  </div>
</template>

<style lang="postcss" scoped>
tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

tbody tr {
  @apply text-gray-500 hover:text-gray-800;
}

td,
th {
  @apply py-2 px-3;
}

.tracking-s {
  letter-spacing: -0.015em;
}
</style>
