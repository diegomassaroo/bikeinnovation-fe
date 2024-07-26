<script setup>
const props = defineProps(['modelValue', 'countryCode']);
const emit = defineEmits(['update:modelValue']);
const states = ref([]);

function select(evt) {
  emit('update:modelValue', evt.target.value);
}

async function updateState() {
  const country = props?.countryCode || 'IE';
  try {
    const { countryStates } = await GqlGetStates({ country });
    states.value = countryStates;
  } catch (error) {
    console.error(error);
  }
}

watch(
  () => props.countryCode,
  () => {
    updateState();
  },
);

onMounted(() => {
  updateState();
});
</script>

<template>
  <select @change="select" v-if="states.length">
    <option v-for="state in states" :key="state.code" :value="state.code" :selected="state.code === props.modelValue">
      {{ state.name }}
    </option>
  </select>
  <input v-else type="text" @change="select" placeholder="Provincia" />
</template>

<style scoped lang="postcss">
.account-form select, select {
  @apply bg-white border-b h-9 rounded-none outline-none border-gray-300 w-full p-2;
}
</style>
