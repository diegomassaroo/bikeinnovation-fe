<script setup lang="ts">
const { cart } = useCart();
const { stripe } = defineProps(['stripe']);

const rawCartTotal = computed(() => {
  const total = cart.value && parseFloat(cart.value.rawTotal as string) * 100;
  return total ? Math.round(total) : 0;
});
const emit = defineEmits(['updateElement']);
let elements = null as any;

const options = {
  mode: 'payment',
  currency: 'eur',
  amount: rawCartTotal.value,
  // paymentMethodCreation: 'manual',
};

const createStripeElements = async () => {
  elements = stripe.elements(options);
  const paymentElement = elements.create('card', { hidePostalCode: true });
  paymentElement.mount('#card-element');
  emit('updateElement', elements);
};

onMounted(() => {
  createStripeElements();
});
</script>

<template>
  <div id="card-element">
    <!-- Elements will create form elements here -->
  </div>
</template>
