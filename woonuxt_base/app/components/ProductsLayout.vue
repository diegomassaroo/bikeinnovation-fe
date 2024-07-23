<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object,
    default: [],
    nodes: {
      type: Array,
      default: null,
    },
  },
  product_second: {
    type: Object,
    default: [],
    nodes: {
      type: Array,
      default: null,
    },
  },
  link: {
    type: Object,
    default: [],
    url: {
      type: [String, Object],
      default: '',
    },
    target: {
      type: [String, Object],
      default: '',
    },
    title: {
      type: [String, Object],
      default: '',
    },
  },
  title: {
    type: String,
    required: true,
  },
  spacer: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section>
    <div :class="{'mb-24 md:mb-40': spacer.includes('Large')}">
      <div class="p-2 md:p-3 grid gap-1" v-if="title">
        <p class="text-2xl tracking-s">{{ title }}</p>
        <div v-if="link">
          <NuxtLink class="uppercase underline hover:no-underline" :to="link.url" :target="link.target">{{ link.title }}</NuxtLink>
        </div>
      </div>
      <div v-if="product" class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 border-t border-b border-black">
        <ProductCard
          v-for="(node, i) in product.nodes"
          :key="node.databaseId"
          class="w-full"
          :node="node"
          :index="i"
          :class="{
            hidden: i >= product.nodes.length - 2,
            'md:block': i === product.nodes.length - 2,
            'md:hidden': i === product.nodes.length - 1,
            '2xl:block': i === product.nodes.length - 1,
          }" />
      </div>
      <div v-if="product_second" class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 border-b border-black">
        <ProductCard
          v-for="(node, i) in product_second.nodes"
          :key="node.databaseId"
          class="w-full"
          :node="node"
          :index="i"
          :class="{
            hidden: i >= product_second.nodes.length - 2,
            'md:block': i === product_second.nodes.length - 2,
            'md:hidden': i === product_second.nodes.length - 1,
            '2xl:block': i === product_second.nodes.length - 1,
          }" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.tracking-s {
  letter-spacing: -0.015em;
}
</style>