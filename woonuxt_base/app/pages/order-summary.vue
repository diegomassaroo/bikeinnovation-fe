<script lang="ts" setup>
import { OrderStatusEnum } from '#woo';

const { query, params, name } = useRoute();
const { customer } = useAuth();
const { formatDate, formatPrice } = useHelpers();

const order = ref<Order>({});
const fetchDelay = ref<boolean>(query.fetch_delay === 'true');
const delayLength = 2500;
const isLoaded = ref<boolean>(false);
const errorMessage = ref('');

const isGuest = computed(() => !customer.value?.databaseId);
const isSummaryPage = computed(() => name === 'order-summary');
const isCheckoutPage = computed(() => name === 'order-received');
const showRefreshButton = computed(() => order.value.status !== OrderStatusEnum.COMPLETED);
const hasDiscount = computed<boolean>(() => !!parseFloat(order.value.discountTotal?.replace(/[^0-9.]/g, '')));

onBeforeMount(() => {
  /**
   * This is to close the child PayPal window we open on the checkout page.
   * It will fire off an event that redirects the parent window to the order summary page.
   */
  if (isCheckoutPage.value && (query.cancel_order || query.from_paypal || query.PayerID)) window.close();
});

onMounted(async () => {
  await getOrder();
  /**
   * WooCommerce sometimes takes a while to update the order status.
   * This is a workaround to fetch the order again after a delay.
   * The length of the delay might need to be adjusted depending on your server.
   */

  if (isCheckoutPage.value && fetchDelay.value && order.value.status !== !OrderStatusEnum.COMPLETED) {
    setTimeout(() => {
      getOrder();
    }, delayLength);
  }
});

async function getOrder() {
  try {
    const data = await GqlGetOrder({ id: params.orderId as string });
    if (data.order) order.value = data.order;
  } catch (err: any) {
    errorMessage.value = err?.gqlErrors?.[0].message || 'Could not find order';
  }
  isLoaded.value = true;
}

const refreshOrder = async () => {
  isLoaded.value = false;
  await getOrder();
};
</script>

<template>
  <div class="w-full min-h-[680px] border border-black flex items-center p-8 text-gray-800 md:bg-white md:mx-auto md:my-24 md:mt-8 md:max-w-3xl md:p-16 flex-col">
    <LoadingIcon v-if="!isLoaded" class="flex-1" />
    <template v-else>
      <div class="w-full">
        <template v-if="isSummaryPage">
          <div class="flex gap-4 items-center">
            <NuxtLink to="/my-account?tab=orders" class="border border-black p-2 inline-flex items-center justify-center" title="Back to orders" aria-label="Back to orders">
              <Icon name="ion:chevron-back-outline" />
            </NuxtLink>
            <h1 class="text-xl md:text-2xl tracking-s">{{ $t('messages.shop.orderSummary') }}</h1>
          </div>
        </template>
        <template v-else-if="isCheckoutPage">
          <div class="flex w-full items-center justify-between mb-2">
            <h1 class="text-xl md:text-2xl tracking-s">{{ $t('messages.shop.orderReceived') }}</h1>
            <button
              v-if="showRefreshButton"
              type="button"
              class="border border-black p-2 inline-flex items-center justify-center bg-white"
              title="Refresh order"
              aria-label="Refresh order"
              @click="refreshOrder">
              <Icon name="ion:refresh-outline" />
            </button>
          </div>
          <p>{{ $t('messages.shop.orderThanks') }}</p>
        </template>
        <hr class="my-8 border-black" />
      </div>
      <div v-if="order && !isGuest" class="w-full flex-1">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-black uppercase mb-2">{{ $t('messages.shop.order') }}</div>
            <div class="leading-none">#{{ order.databaseId! }}</div>
          </div>
          <div>
            <div class="text-black uppercase mb-2">{{ $t('messages.general.date') }}</div>
            <div class="leading-none">{{ formatDate(order.date!) }}</div>
          </div>
          <div>
            <div class="text-black uppercase mb-2">{{ $t('messages.general.status') }}</div>
            <OrderStatusLabel :status="order.status" />
          </div>
          <div>
            <div class="text-black uppercase mb-2">{{ $t('messages.general.paymentMethod') }}</div>
            <div class="leading-none">{{ order.paymentMethodTitle }}</div>
          </div>
        </div>

        <hr class="my-8 border-black" />

        <div class="grid gap-2">
          <div v-if="order.lineItems" v-for="item in order.lineItems.nodes" :key="item.product?.databaseId!" class="flex items-center justify-between gap-8">
            <img
              v-if="item.product?.node"
              class="w-16 h-16"
              :src="item.variation?.node?.image?.sourceUrl || item.product.node?.image?.sourceUrl || '/images/placeholder.png'"
              :alt="item.variation?.node?.image?.altText || item.product.node?.image?.altText || 'Product image'"
              :title="item.variation?.node?.image?.title || item.product.node?.image?.title || 'Product image'"
              width="64"
              height="64"
              loading="lazy" />
            <div class="flex-1 leading-tight">
              {{ item.variation ? item.variation?.node?.name : item.product?.node.name! }}
            </div>
            <div class="text-black">Qty. {{ item.quantity }}</div>
            <span class="font-semibold">{{ formatPrice(item.total!) }}</span>
          </div>
        </div>

        <hr class="my-8 border-black" />

        <div>
          <div class="flex justify-between">
            <span>{{ $t('messages.shop.subtotal') }}</span>
            <span>{{ order.subtotal }}</span>
          </div>
          <div class="flex justify-between">
            <span>{{ $t('messages.general.tax') }}</span>
            <span>{{ order.totalTax }}</span>
          </div>
          <div class="flex justify-between">
            <span>{{ $t('messages.general.shipping') }}</span>
            <span>{{ order.shippingTotal }}</span>
          </div>
          <div v-if="hasDiscount" class="flex justify-between text-primary">
            <span>{{ $t('messages.shop.discount') }}</span>
            <span>- {{ order.discountTotal }}</span>
          </div>
          <hr class="my-8 border-black" />
          <div class="flex justify-between">
            <span class>{{ $t('messages.shop.total') }}</span>
            <span class="">{{ order.total }}</span>
          </div>
        </div>
      </div>
      <div v-else-if="errorMessage" class="w-full text-center flex flex-col items-center justify-center gap-4 flex-1">
        <Icon name="ion:sad-outline" size="96" class="text-black" />
        <h1 class="text-xl md:text-2xl tracking-s">Error</h1>
        <div v-if="errorMessage" class="text-red-500" v-html="errorMessage" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.tracking-s {
  letter-spacing: -0.015em;
}
</style>