<script setup lang="ts">
const route = useRoute();
const { productsPerPage } = useHelpers();
const { products } = useProducts();
const page = ref(parseInt(route.params.pageNumber as string) || 1);
const productsToShow = computed(() => products.value.slice((page.value - 1) * productsPerPage, page.value * productsPerPage));

const splitProductsIntoRows = (products: Product[], columns: number): Product[][] => {
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += columns) {
    rows.push(products.slice(i, i + columns));
  }
  return rows;
};

const gridColumns = ref(2);
const updateGridColumns = () => {
  if (window.innerWidth >= 1520) {
    gridColumns.value = 4;
  } else if (window.innerWidth >= 768) {
    gridColumns.value = 3;
  } else {
    gridColumns.value = 2;
  }
};

onMounted(() => {
  updateGridColumns();
  window.addEventListener('resize', updateGridColumns);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateGridColumns);
});
</script>

<template>
  <Transition name="fade" mode="out-in">
    <section v-if="!!products.length" class="relative w-full">
      <div v-for="(row, rowIndex) in splitProductsIntoRows(productsToShow, gridColumns)" :key="rowIndex" class="product-row border-t border-black">
        <TransitionGroup name="shrink" tag="div" mode="in-out" class="gap-x-10 product-grid">
          <ProductCard v-for="(node, i) in row" :key="node.id || i" :node="node" :index="i" />
        </TransitionGroup>
      </div>
      <Pagination />
    </section>
    <NoProductsFound v-else />
  </Transition>
</template>

<style lang="postcss" scoped>
.product-grid {
  @apply grid transition-all;

  grid-template-columns: repeat(2, 1fr);
}
.product-grid:empty {
  display: none;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1536px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.shrink-move {
  transition: all 400ms;
}

.shrink-leave-active {
  transition: transform 300ms;
  position: absolute;
  opacity: 0;
}

.shrink-enter-active {
  transition:
    opacity 400ms ease-out 200ms,
    transform 400ms ease-out;
  will-change: opacity, transform;
}

.shrink-enter,
.shrink-leave-to,
.shrink-enter-from {
  opacity: 0;
  transform: scale(0.75) translateY(25%);
}
</style>
