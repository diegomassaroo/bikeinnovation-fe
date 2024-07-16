<script setup>
const { getOrderQuery, setOrderQuery } = useSorting();
const selectedOrder = ref(getOrderQuery());
const orderby = ref(selectedOrder.value.orderBy || 'date');
const order = ref(selectedOrder.value.order || 'DESC');

watch([orderby, order], () => {
  setOrderQuery(orderby.value, order.value);
});

function updateOrder(e) {
  const value = e.target.value;
  if (value === 'priceLow' || value === 'priceHigh') {
    orderby.value = 'price';
    order.value = value === 'priceLow' ? 'ASC' : 'DESC';
  } else if (value === 'aZ' || value === 'zA') {
    orderby.value = 'alphabetically';
    order.value = value === 'aZ' ? 'ASC' : 'DESC';
  } else {
    orderby.value = value;
    order.value = 'DESC';
  }
}
</script>

<template>
  <div class="cursor-pointer inline-flex ml-auto -space-x-px isolate p-2 md:p-1.5">
    <select @change="updateOrder" class="inline-flex w-fit leading-tight uppercase cursor-pointer text-right text-black bg-white border-0 rounded-none border-b border-gray-300 md:border-0 p-0 h-9 md:h-auto outline-none hover:bg-white hover:underline" aria-label="Ordina per">
      <option disabled value="">{{ $t('messages.general.sortBy') }}</option>
      <option value="date">{{ $t('messages.general.latest') }}</option>
      <option value="priceLow">{{ $t('messages.shop.lowPrice') }}</option>
      <option value="priceHigh">{{ $t('messages.shop.highPrice') }}</option>
      <option value="aZ">{{ $t('messages.general.aZ') }}</option>
      <option value="zA">{{ $t('messages.general.zA') }}</option>
    </select>
  </div>
</template>

<style scoped>
select {
  background: none;
}
</style>