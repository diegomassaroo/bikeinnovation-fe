<script setup lang="ts">
const props = defineProps<{
  modelValue: string | object;
  paymentGateways: PaymentGateways;
}>();

const paymentMethod = toRef(props, 'modelValue');
const activePaymentMethod = computed<PaymentGateway>(() => paymentMethod.value as PaymentGateway);
const emits = defineEmits(['update:modelValue']);

const updatePaymentMethod = (value: any) => {
  emits('update:modelValue', value);
};

onMounted(() => {
  // Emit first payment method
  if (props.paymentGateways?.nodes.length) updatePaymentMethod(props.paymentGateways?.nodes[0]);
});
</script>

<template>
  <div class="flex gap-4 flex-wrap">
    <div
      v-for="gateway in paymentGateways?.nodes"
      :key="gateway.id"
      class="option"
      :class="{ 'active-option': gateway.id === activePaymentMethod.id }"
      @click="updatePaymentMethod(gateway)"
      :title="gateway?.description || gateway?.title || 'Payment Method'">
      <icon v-if="gateway.id === 'stripe'" name="ion:card-outline" size="20" />
      <icon v-else-if="gateway.id === 'paypal'" name="ion:logo-paypal" size="20" />
      <icon v-else name="ion:cash-outline" size="20" />
      <span class="whitespace-nowrap" v-html="gateway.title" />
      <icon name="ion:checkmark-circle" size="20" class="ml-auto text-primary checkmark opacity-0" />
    </div>
    <!-- <div v-if="activePaymentMethod.description" class="prose">
      <p class="text-gray-500" v-html="activePaymentMethod.description" />
    </div> -->
  </div>
</template>

<style lang="postcss" scoped>
.option {
  @apply bg-white border text-black cursor-pointer flex flex-1 p-2 gap-2 items-center hover:border-black;

  &.active-option {
    @apply border-black cursor-default pointer-events-none;

    & .checkmark {
      @apply opacity-100;
    }
  }
}
</style>
