<script setup>
const { getOrderQuery, setOrderQuery } = await useSorting();
const selectedOrder = ref(getOrderQuery());
const orderby = ref(selectedOrder.value.orderBy || 'date');
const order = ref(selectedOrder.value.order);

// Update the URL when the checkbox is changed
watch([orderby, order], () => {
  setOrderQuery(orderby.value, order.value);
});
console.log(selectedOrder);
console.log(orderby);
console.log(order);
</script>

<template>
  <div class="inline-flex ml-auto -space-x-px isolate">
    <!-- <button
      class="relative inline-flex items-center p-2 font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20"
      aria-label="Sort"
      @click="order = order === 'ASC' ? 'DESC' : 'ASC'">
      <Icon name="ion:filter-outline" size="18" :class="order === 'ASC' ? 'rotate-180' : ''" class="transition-transform transform transform-origin-center" />
    </button> -->
    <select v-model="orderby" class="leading-tight uppercase cursor-pointer text-black bg-white border-0 rounded-none border-b border-gray-300 md:border-0 p-2 md:p-1.5 md:pr-6 h-9 md:h-auto outline-none hover:bg-white hover:underline" aria-label="Order by">
      <option value="date">{{ $t('messages.general.latest') }}</option>
      <option value="price">{{ $t('messages.shop.lowPrice') }}</option>
      <option value="price">{{ $t('messages.shop.highPrice') }}</option>
      <option value="alphabetically">{{ $t('messages.general.aZ') }}</option>
      <option value="alphabetically">{{ $t('messages.general.zA') }}</option>
    </select>
  </div>
</template>
