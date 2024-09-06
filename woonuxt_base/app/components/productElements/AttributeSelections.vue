<script setup lang="ts">
interface Props {
  attributes: any[];
  defaultAttributes?: { nodes: Attribute[] };
}

const { attributes, defaultAttributes } = defineProps<Props>();
const emit = defineEmits(['attrs-changed']);

const activeVariations = ref<Attribute[]>([]);

const updateAttrs = () => {
  const selectedVariations = attributes.map((row): Attribute => {
    const radioValue = document.querySelector(`.name-${row.name}:checked`) as HTMLInputElement;
    const dropdownValue = document.querySelector(`#${row.name}`) as HTMLSelectElement;
    const name = row.name.charAt(0).toLowerCase() + row.name.slice(1);
    const value = radioValue?.value ?? dropdownValue?.value ?? '';
    return { name, value };
  });

  activeVariations.value = selectedVariations;
  emit('attrs-changed', selectedVariations);
};

const setDefaultAttributes = () => {
  if (defaultAttributes?.nodes) {
    defaultAttributes?.nodes.forEach((attr: Attribute) => {
      const radio = document.querySelector(`.name-${attr.name}[value="${attr.value}"]`) as HTMLInputElement;
      const dropdown = document.querySelector(`#${attr.name}[value="${attr.value}"]`) as HTMLSelectElement;
      if (radio) radio.checked = true;
      if (dropdown) dropdown.value = attr.value;
    });
  }
};

onMounted(() => {
  setDefaultAttributes();
  updateAttrs();
});
</script>

<template>
  <div class="flex flex-col gap-1 justify-between" v-if="attributes">
    <div v-for="(attr, i) in attributes" :key="i" class="flex flex-wrap relative justify-between">
      <!-- COLOR SWATCHES -->
      <div v-if="attr.name == 'pa_color' || attr.name == 'color'" class="grid gap-2">
        <div>
          {{ $t('messages.general.color') }}
          <span v-if="activeVariations.length" class="text-gray-400 capitalize">{{ decodeURIComponent(activeVariations[i].value) }}</span>
        </div>
        <div class="flex gap-2">
          <span v-for="(option, optionIndex) in attr.options" :key="optionIndex">
            <label :for="`${option}_${optionIndex}`">
              <input
                :id="`${option}_${optionIndex}`"
                :ref="attr.name"
                class="hidden"
                :checked="optionIndex == 0"
                type="radio"
                :class="`name-${attr.name}`"
                :name="attr.name"
                :value="option"
                @change="updateAttrs" />
              <span class="color-button" :class="`color-${option}`" :title="`${attr.name}`"></span>
            </label>
          </span>
        </div>
      </div>

      <!-- DROPDOWN -->
      <div v-else-if="attr.options && attr.options?.length > 8" class="grid gap-2">
        <div>
          {{ attr.label }} <span v-if="activeVariations.length" class="text-gray-400 capitalize">{{ decodeURIComponent(activeVariations[i].value) }}</span>
        </div>
        <select :id="attr.name" :ref="attr.name" :name="attr.name" required class="border-white shadow" @change="updateAttrs">
          <option disabled hidden>{{ $t('messages.general.choose') }} {{ decodeURIComponent(attr.label) }}</option>
          <option v-for="(option, dropdownIndex) in attr.options" :key="option" :value="option" v-html="option" :selected="dropdownIndex == 0" />
        </select>
      </div>

      <!-- CHECKBOXES -->
      <div v-else class="grid gap-2 w-full">
        <div>
          {{ attr.label }}
        </div>
        <div class="flex gap-2 justify-between">
          <span v-for="(term, index) in attr.terms.nodes" :key="index" class="w-full">
            <label :for="`${term.slug}_${index}`">
              <input
                :id="`${term.slug}_${index}`"
                :ref="attr.name"
                class="hidden"
                :checked="index == 0"
                type="radio"
                :class="`name-${attr.name}`"
                :name="attr.name"
                :value="term.slug"
                @change="updateAttrs" />
              <span class="radio-button" :class="`picker-${term.slug}`" :title="`${attr.name}: ${term.slug}`">{{ term.name }}</span>
            </label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.radio-button {
  @apply cursor-pointer border text-center py-1.5 px-3 w-full transition-all text-gray-300 inline-block hover:border-black hover:text-black;
}

.color-button {
  @apply cursor-pointer border text-center transition-all text-gray-300 inline-block hover:border-black hover:text-black;
  width: 2rem;
  height: 2rem;
}

.color-green {
  @apply bg-green-500;
}

.color-blue {
  @apply bg-blue-500;
}

.color-red {
  @apply bg-red-500;
}

.color-yellow {
  @apply bg-yellow-500;
}

.color-orange {
  @apply bg-orange-500;
}

.color-purple {
  @apply bg-purple-500;
}

.color-black {
  @apply bg-black;
}

input[type='radio']:checked ~ span {
  @apply border border-black text-black;
}
</style>
