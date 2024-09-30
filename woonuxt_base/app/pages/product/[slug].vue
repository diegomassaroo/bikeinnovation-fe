<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core';
import { useCssVar } from '@vueuse/core';
import { StockStatusEnum, ProductTypesEnum, type AddToCartInput } from '#woo';

const route = useRoute();
const { arraysEqual, formatArray, checkForVariationTypeOfAny } = useHelpers();
const { addToCart, isUpdatingCart } = useCart();
const slug = route.params.slug as string;

const { data } = (await useAsyncGql('getProduct', { slug })) as { data: { value: { product: Product } } };
const product = ref<Product>(data?.value?.product);

console.log(product.value.variations);
console.log(product.value.attributes);
// console.log(product.value.variations.nodes.map(variation => variation.stockStatus));

const quantity = ref<number>(1);
const activeVariation = ref<Variation | null>(null);
const variation = ref<Attribute[]>([]);
const indexOfTypeAny = ref<number[]>([]);
const attrValues = ref();
const isSimpleProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.SIMPLE);
const isVariableProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.VARIABLE);

const type = computed(() => activeVariation.value || product.value);
const selectProductInput = computed<any>(() => ({ productId: type.value?.databaseId, quantity: quantity.value })) as ComputedRef<AddToCartInput>;

const mergeLiveStockStatus = (payload: Product): void => {
  product.value.stockStatus = payload.stockStatus ?? product.value?.stockStatus;

  payload.variations?.nodes?.forEach((variation: Variation, index: number) => {
    if (product.value?.variations?.nodes[index]) {
      product.value.variations.nodes[index].stockStatus = variation.stockStatus;
    }
  });
};

onMounted(async () => {
  try {
    const { product } = await GqlGetStockStatus({ slug });
    if (product) mergeLiveStockStatus(product as Product);
  } catch (error: any) {
    const errorMessage = error?.gqlErrors?.[0].message;
    if (errorMessage) console.error(errorMessage);
  }
  if (product.value.variations) indexOfTypeAny.value.push(...checkForVariationTypeOfAny(product.value));
});

const updateSelectedVariations = (variations: Attribute[]): void => {
  if (!product.value.variations) return;

  attrValues.value = variations.map((el) => ({ attributeName: el.name, attributeValue: el.value }));
  const cloneArray = JSON.parse(JSON.stringify(variations));
  const getActiveVariation = product.value.variations?.nodes.filter((variation: any) => {
    // If there is any variation of type ANY set the value to ''
    if (variation.attributes) {
      indexOfTypeAny.value.forEach((index) => (cloneArray[index].value = ''));
      return arraysEqual(formatArray(variation.attributes.nodes), formatArray(cloneArray));
    }
  });

  activeVariation.value = getActiveVariation[0];
  selectProductInput.value.variationId = activeVariation.value?.databaseId ?? null;
  selectProductInput.value.variation = activeVariation.value ? attrValues.value : null;
  variation.value = variations;
};

const stockStatus = computed(() => {
  if (isVariableProduct.value) return activeVariation.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
  return type.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
});
const disabledAddToCart = computed(() => {
  if (isSimpleProduct.value) return !type.value || stockStatus.value === StockStatusEnum.OUT_OF_STOCK || isUpdatingCart.value;
  return !type.value || stockStatus.value === StockStatusEnum.OUT_OF_STOCK || !activeVariation.value || isUpdatingCart.value;
});



const sliderEl = ref(null);
const { height: sliderHeight } = useElementBounding(sliderEl);

const sliderVar = useCssVar('--slider-height');

watch(sliderHeight, (v) => {
  sliderVar.value = `${Math.round(v)}px`;
});

const infoEl = ref(null);
const { height: infoHeight } = useElementBounding(infoEl);

const infoVar = useCssVar('--info-height');

watch(infoHeight, (v) => {
  infoVar.value = `${Math.round(v)}px`;
});
</script>

<template>
  <main v-if="product">
    <SEOHead :info="product" />

    <div ref="sliderEl" class="flex flex-col md:flex-row relative md:justify-between">
      <Breadcrumb :product class="absolute top-0 left-0 z-20 m-2 md:m-1.5" />
      <ProductImageGallery
        v-if="product.image"
        class="w-full h-full overflow-hidden"
        :main-image="product.image"
        :gallery="product.galleryImages!"
        :node="type"
        :activeVariation="activeVariation || {}" />
      <NuxtImg v-else class="w-full h-screen overflow-hidden skeleton" src="/images/placeholder.jpg" :alt="product?.name || 'Product'" />

      <div class="sticky-container pointer-events-none w-full md:z-10 block md:absolute bottom-0 md:m-1.5">
        <div ref="infoEl" class="sticky-info pointer-events-auto md:sticky bg-white w-full md:max-w-sm p-2 md:p-3">
          <div class="mb-8 gap-2 grid">
            <div>
              <h1 class="uppercase flex flex-wrap items-center text-xl md:text-2xl tracking-s">
                {{ product.name }}
              </h1>
            </div>
            <ProductPrice :sale-price="type.salePrice" :regular-price="type.regularPrice" />
          </div>

          <!-- <div class="grid gap-2 my-8">
          <div class="flex items-center gap-2">
            <span class="text-gray-400">{{ $t('messages.shop.availability') }}: </span>
            <StockStatus :stockStatus @updated="mergeLiveStockStatus" />
          </div>
        </div> -->
        <div class="mb-8">
          <div class="mb-2" v-html="product.shortDescription" />
          <Accordion :description="product.description" />
          </div>

          <form @submit.prevent="addToCart(selectProductInput)">
            <AttributeSelections
              v-if="product.type == 'VARIABLE' && product.attributes && product.variations"
              class="mt-4 mb-8"
              :attributes="product.attributes.nodes"
              :defaultAttributes="product.defaultAttributes"
              :variations="product.variations.nodes"
              @attrs-changed="updateSelectedVariations" />
            <div class="fixed bottom-0 left-0 z-10 flex items-center w-full gap-2 bg-white md:static md:bg-transparent bg-white md:p-0">
              <!-- <input
              v-model="quantity"
              type="number"
              min="1"
              aria-label="Quantity"
              class="bg-white border flex text-left p-2.5 w-20 gap-4 items-center justify-center focus:outline-none" /> -->
              <AddToCartButton class="flex-1 w-full" :disabled="disabledAddToCart" :class="{ loading: isUpdatingCart }" />
            </div>
          </form>

          <!-- <div class="grid gap-2 my-8">
          <div class="flex items-center gap-2">
            <span class="text-gray-400">{{ $t('messages.shop.category', 2) }}:</span>
            <div class="product-categories" v-if="product.productCategories">
              <NuxtLink
                v-for="category in product.productCategories.nodes"
                :key="category.slug"
                :to="`/categoria-prodotto/${decodeURIComponent(category.slug)}`"
                class="hover:text-primary"
                :title="category.name"
                >{{ category.name }}<span class="comma">, </span>
              </NuxtLink>
            </div>
          </div>
        </div> -->

          <!-- <div class="flex flex-wrap gap-4">
          <WishlistButton :product />
          <ShareButton :product />
        </div> -->
        </div>
      </div>
    </div>
    <div v-if="product.related">
      <div class="text-xl md:text-2xl tracking-s p-2 md:p-1.5 pb-0 mt-16 md:pb-0">{{ $t('messages.shop.youMayLike') }}</div>
      <ProductRow :products="product.related.nodes" class="grid-cols-2 md:grid-cols-3 gap-x-10 3xl:grid-cols-4" />
    </div>
  </main>
</template>

<style scoped>
.product-categories > a:last-child .comma {
  display: none;
}

input[type='number']::-webkit-inner-spin-button {
  opacity: 1;
}

@media (min-width: 768px) {
  .sticky-container {
    height: var(--slider-height);
  }

  .sticky-info {
    top: calc(100vh - var(--info-height) - 6px);
  }
}

.hide {
  display: none;
}

.tracking-s {
  letter-spacing: -0.015em;
}
</style>
