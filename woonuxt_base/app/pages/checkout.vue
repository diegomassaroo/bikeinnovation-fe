<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';

const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, proccessCheckout } = useCheckout();
const runtimeConfig = useRuntimeConfig();
const stripeKey = runtimeConfig.public?.STRIPE_PUBLISHABLE_KEY || null;

const buttonText = ref<string>(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod);

const isInvalidEmail = ref<boolean>(false);
const stripe = stripeKey ? await loadStripe(stripeKey) : null;
let elements = ref(null);
const isPaid = ref<boolean>(false);

onBeforeMount(async () => {
  if (query.cancel_order) window.close();
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');

  const { stripePaymentIntent } = await GqlGetStripePaymentIntent();
  const { clientSecret } = stripePaymentIntent;

  try {
    if (orderInput.value.paymentMethod.id === 'stripe') {
      const cardElement = elements.value.getElement('card');
      const { setupIntent } = await stripe.confirmCardSetup(clientSecret, { payment_method: { card: cardElement } });
      const { source } = await stripe.createSource(cardElement);

      if (source) orderInput.value.metaData.push({ key: '_stripe_source_id', value: source.id });
      if (setupIntent) orderInput.value.metaData.push({ key: '_stripe_intent_id', value: setupIntent.id });

      isPaid.value = setupIntent?.status === 'succeeded' || false;
      orderInput.value.transactionId = source?.created?.toString() || new Date().getTime().toString();
    }
  } catch (error) {
    console.error(error);
    buttonText.value = t('messages.shop.placeOrder');
  }

  proccessCheckout(isPaid.value);
};

const handleStripeElement = (stripeElements) => {
  elements.value = stripeElements;
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const checkEmailOnBlur = (email) => {
  if (email) isInvalidEmail.value = !emailRegex.test(email);
};

const checkEmailOnInput = (email) => {
  if (email && isInvalidEmail.value) isInvalidEmail.value = !emailRegex.test(email);
};

useSeoMeta({
  title: t('messages.shop.checkout'),
});
</script>

<template>
  <div class="flex flex-col min-h-[680px]">
    <LoadingIcon v-if="!cart" class="m-auto" />
    <template v-else>
      <div v-if="cart.isEmpty" class="flex flex-col items-center justify-center flex-1">
        <div class="text-xl md:text-2xl tracking-s text-gray-300">{{ $t('messages.shop.cartEmpty') }}</div>
      </div>

      <form v-else class="flex flex-wrap items-start gap-12 mt-12 my-24 lg:mt-24 lg:mb-40 justify-between p-2 md:p-3" @submit.prevent="payNow">
        <div class="grid w-full gap-12 lg:gap-24 checkout-form lg:flex-1">
          <!-- Customer details -->
          <div v-if="!viewer" class="gap-3.5 lg:gap-5 grid">
            <div class="gap-1 grid">
              <h2 class="w-full text-xl md:text-2xl tracking-s md:text-2xl leading-none">{{ $t('messages.billing.contactInformation') }}</h2>
              <p class="text-gray-500 uppercase">
                {{ $t('messages.account.hasAccount') }}
                <NuxtLink href="/my-account" class="text-black underline hover:no-underline">{{ $t('messages.account.accountLogin') }}</NuxtLink>
              </p>
            </div>
            <div class="w-full">
              <input
                v-model="customer.billing.email"
                placeholder="Email"
                type="email"
                name="email"
                :class="{ 'has-error': isInvalidEmail }"
                @blur="checkEmailOnBlur(customer.billing.email)"
                @input="checkEmailOnInput(customer.billing.email)"
                required />
              <Transition name="scale-y" mode="out-in">
                <div v-if="isInvalidEmail" class="mt-1 text-red-500">{{ $t('messages.account.invalidEmail') }}</div>
              </Transition>
            </div>
            <template v-if="orderInput.createAccount">
              <div class="w-full">
                <label for="username">{{ $t('messages.account.username') }}</label>
                <input v-model="orderInput.username" placeholder="Username" type="text" name="username" required />
              </div>
              <div class="w-full" v-if="orderInput.createAccount">
                <label for="email">{{ $t('messages.account.password') }}</label>
                <PasswordInput id="password" class="my-2" v-model="orderInput.password" placeholder="Password" :required="true" />
              </div>
            </template>
            <div v-if="!viewer" class="uppercase flex items-center gap-2 my-2">
              <span for="creat-account">{{ $t('messages.account.noAccount') }}</span>
              <input id="creat-account" v-model="orderInput.createAccount" type="checkbox" name="creat-account" />
            </div>
          </div>

          <div class="gap-5 grid">
            <h2 class="w-full mb-3 text-xl md:text-2xl tracking-s md:text-2xl">{{ $t('messages.billing.billingDetails') }}</h2>
            <BillingDetails v-model="customer.billing" :sameAsShippingAddress="orderInput.shipToDifferentAddress" />

            <label for="shipToDifferentAddress" class="flex items-center gap-2">
              <span>{{ $t('messages.billing.differentAddress') }}</span>
              <input id="shipToDifferentAddress" v-model="orderInput.shipToDifferentAddress" type="checkbox" name="shipToDifferentAddress" />
            </label>

            <Transition name="scale-y" mode="out-in">
              <div v-show="orderInput.shipToDifferentAddress">
                <h2 class="mb-4 text-xl md:text-2xl tracking-s">{{ $t('messages.general.shippingDetails') }}</h2>
                <ShippingDetails v-model="customer.shipping" />
              </div>
            </Transition>
          </div>

          <!-- Shipping methods -->
          <div v-if="cart.availableShippingMethods.length">
            <h3 class="mb-2 text-xl md:text-2xl tracking-s">{{ $t('messages.general.shippingSelect') }}</h3>
            <ShippingOptions :options="cart.availableShippingMethods[0].rates" :active-option="cart.chosenShippingMethods[0]" />
          </div>

          <!-- Pay methods -->
          <div v-if="paymentGateways.nodes.length" class="col-span-full">
            <h2 class="mb-2 text-xl md:text-2xl tracking-s">{{ $t('messages.billing.paymentOptions') }}</h2>
            <PaymentOptions v-model="orderInput.paymentMethod" class="mb-2" :paymentGateways />
            <StripeElement v-if="stripe" v-show="orderInput.paymentMethod.id == 'stripe'" :stripe @updateElement="handleStripeElement" />
          </div>

          <!-- Order note -->
          <div class="gap-1 grid">
            <h2 class="text-xl md:text-2xl tracking-s">{{ $t('messages.shop.orderNote') }} ({{ $t('messages.general.optional') }})</h2>
            <textarea
              id="order-note"
              v-model="orderInput.customerNote"
              name="order-note"
              class="w-full min-h-24"
              rows="4"
              :placeholder="$t('messages.shop.orderNotePlaceholder')"></textarea>
          </div>
        </div>

        <OrderSummary>
          <button
            class="uppercase flex bg-black hover:bg-white hover:text-black w-full border border-black items-center justify-center p-2 md:p-1.5 h-9 gap-3 text-center text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            :disabled="isCheckoutDisabled">
            {{ buttonText }}<LoadingIcon v-if="isProcessingOrder" color="#fff" size="18" />
          </button>
        </OrderSummary>
      </form>
    </template>
  </div>
</template>

<style lang="postcss">
.checkout-form input[type='text'],
.checkout-form input[type='email'],
.checkout-form input[type='tel'],
.checkout-form input[type='password'],
.checkout-form textarea,
.checkout-form select,
.checkout-form .StripeElement {
  @apply bg-white border h-9 rounded-none outline-none border-gray-300 w-full p-2;
}

input[type='checkbox'] {
  @apply bg-white border rounded-lg cursor-pointer outline-none border-black w-full p-3 transition-all duration-150 appearance-none;

  width: 1em;
  height: 1em;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  padding: 0;
}

input[type='checkbox']:after,
input[type='radio']:after {
  display: block;
  opacity: 0;
  transition: all 250ms cubic-bezier(0.65, -0.43, 0.4, 1.71);
}

input[type='checkbox']:after {
  width: 5px;
  height: 9px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(0deg) translate(-1px, 1px) scale(0.75);
  position: absolute;
  top: 3px;
  left: 6.5px;
}

input[type='radio']:after {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transform: scale(0);
  position: absolute;
  background: #fff;
  top: 4px;
  left: 4px;
}

input[type='checkbox']:checked:after {
  @apply cursor-pointer text-gray-500 hover:text-primary;
}

input[type='checkbox']:checked {
  @apply bg-primary border-0;
}

input[type='checkbox']:checked:after {
  opacity: 1;
  transform: rotate(45deg) translate(-1px, 1px) scale(1);
}

.checkout-form input.has-error,
.checkout-form textarea.has-error {
  @apply border-red-500;
}

.checkout-form label {
  @apply mb-1 text-black uppercase inline-flex;
}

.checkout-form .StripeElement {
  /* padding: 1rem 0.75rem; */
}

.tracking-s {
  letter-spacing: -0.015em;
}
</style>
