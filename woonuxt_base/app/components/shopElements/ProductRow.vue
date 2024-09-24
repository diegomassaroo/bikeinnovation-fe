<script setup>
const props = defineProps({
  products: { type: Array, default: null },
});
</script>

<template>
  <div v-if="products" class="grid border-t border-black">
    <ProductCard
      v-for="(node, i) in products"
      :key="node.databaseId"
      class="w-full"
      :node="node"
      :index="i"
      :class="{
        hidden: i >= products.length - 3,
        'md:block': i === products.length - 2,
        'md:hidden': i === products.length - 1,
        '3xl:block': i === products.length - 1,
      }" />
  </div>
</template>
