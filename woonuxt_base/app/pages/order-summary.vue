<script setup lang="ts">
import { OrderStatusEnum } from '#woo';

const { query, params, name } = useRoute();
const { customer } = useAuth();
const { formatDate, formatPrice } = useHelpers();
const { t } = useI18n();

const order = ref<Order | null>(null);
const fetchDelay = ref<boolean>(query.fetch_delay === 'true');
const delayLength = 2500;
const isLoaded = ref<boolean>(false);
const errorMessage = ref('');

const isGuest = computed(() => !customer.value?.email);
const isSummaryPage = computed<boolean>(() => name === 'order-summary');
const isCheckoutPage = computed<boolean>(() => name === 'order-received');
const orderIsNotCompleted = computed<boolean>(() => order.value?.status !== OrderStatusEnum.COMPLETED);
const hasDiscount = computed<boolean>(() => !!parseFloat(order.value?.rawDiscountTotal || '0'));
const downloadableItems = computed(() => order.value?.downloadableItems?.nodes || []);

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

  if (isCheckoutPage.value && fetchDelay.value && orderIsNotCompleted.value) {
    setTimeout(() => {
      getOrder();
    }, delayLength);
  }
});

async function getOrder() {
  try {
    const data = await GqlGetOrder({ id: params.orderId as string });
    if (data.order) {
      order.value = data.order;
    } else {
      errorMessage.value = 'Could not find order';
    }
  } catch (err: any) {
    errorMessage.value = err?.gqlErrors?.[0].message || 'Could not find order';
  }
  isLoaded.value = true;
}

const refreshOrder = async () => {
  isLoaded.value = false;
  await getOrder();
};

useSeoMeta({
  title() {
    return isSummaryPage.value ? t('messages.shop.orderSummary') : t('messages.shop.orderReceived');
  },
});
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
            <div class="leading-none">{{ formatDate(order.date) }}</div>
          </div>
          <div>
            <div class="text-black uppercase mb-2">{{ $t('messages.general.status') }}</div>
            <OrderStatusLabel v-if="order.status" :order="order" />
          </div>
          <div>
            <div class="text-black uppercase mb-2">{{ $t('messages.general.paymentMethod') }}</div>
            <div class="leading-none">{{ order.paymentMethodTitle }}</div>
          </div>
        </div>

        <hr class="my-8 border-black" />
        <template v-if="order.lineItems">
          <hr class="my-8 border-black" />

          <div class="grid gap-2">
            <div v-for="item in order.lineItems.nodes" :key="item.id" class="flex items-center justify-between gap-8">
              <NuxtLink v-if="item.product?.node" :to="`/product/${item.product.node.slug}`">
                <NuxtImg
                  class="w-16 h-16 rounded-xl"
                  :src="item.variation?.node?.image?.sourceUrl || item.product.node?.image?.sourceUrl || '/images/placeholder.png'"
                  :alt="item.variation?.node?.image?.altText || item.product.node?.image?.altText || 'Product image'"
                  :title="item.variation?.node?.image?.title || item.product.node?.image?.title || 'Product image'"
                  width="64"
                  height="64"
                  loading="lazy" />
              </NuxtLink>
              <div class="flex-1 leading-tight">
                {{ item.variation ? item.variation?.node?.name : item.product?.node.name! }}
              </div>
              <div class="text-sm text-gray-600">Qty. {{ item.quantity }}</div>
              <span class="text-sm font-semibold">{{ formatPrice(item.total!) }}</span>
            </div>
          </div>
        </template>

        <hr class="my-8 border-black" />

        <div>
          <div class="flex justify-between">
            <span>{{ $t('messages.shop.subtotal') }}</span>
            <span v-html="order.subtotal" />
          </div>
          <div class="flex justify-between">
            <span>{{ $t('messages.general.tax') }}</span>
            <span v-html="order.totalTax" />
          </div>
          <div class="flex justify-between">
            <span>{{ $t('messages.general.shipping') }}</span>
            <span v-html="order.shippingTotal" />
          </div>
          <div v-if="hasDiscount" class="flex justify-between text-primary">
            <span>{{ $t('messages.shop.discount') }}</span>
            <span>- <span v-html="order.discountTotal" /></span>
          </div>
          <hr class="my-8 border-black" />
          <div class="flex justify-between">
            <span class>{{ $t('messages.shop.total') }}</span>
            <span v-html="order.total" />
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
