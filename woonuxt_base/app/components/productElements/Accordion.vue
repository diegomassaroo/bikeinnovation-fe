<script setup>
const { data: accordionData } = await useAsyncGql('getAccordion');
const props = defineProps({
  description: {
    type: String,
    default: '',
  },
});

const showDescription = ref(false);
const showShippingReturns = ref(false);
const showPaymentMethod = ref(false);
const showAssistenceContact = ref(false);

const toggleSection = (section) => {
  if (section === 'description') {
    showDescription.value = !showDescription.value;
    if (showDescription.value) {
      showShippingReturns.value = false;
      showPaymentMethod.value = false;
      showAssistenceContact.value = false;
    }
  } else if (section === 'shippingReturns') {
    showShippingReturns.value = !showShippingReturns.value;
    if (showShippingReturns.value) {
      showDescription.value = false;
      showPaymentMethod.value = false;
      showAssistenceContact.value = false;
    }
  } else if (section === 'paymentMethod') {
    showPaymentMethod.value = !showPaymentMethod.value;
    if (showPaymentMethod.value) {
      showDescription.value = false;
      showShippingReturns.value = false;
      showAssistenceContact.value = false;
    }
  } else if (section === 'assistenceContact') {
    showAssistenceContact.value = !showAssistenceContact.value;
    if (showAssistenceContact.value) {
      showDescription.value = false;
      showShippingReturns.value = false;
      showPaymentMethod.value = false;
    }
  }
};
</script>

<template>
  <div class="mb-8">
    <button class="hover:underline" @click="toggleSection('description')">
      {{ showDescription ? '-' : '+' }} {{ $t('messages.general.details') }}
    </button>
    <transition name="collapse">
      <div v-if="showDescription" class="max-h-40 overflow-y-scroll" v-html="description"></div>
    </transition>
  </div>
  <div class="grid justify-start">
    <div>
      <button class="text-left hover:underline" @click="toggleSection('shippingReturns')">
        {{ showShippingReturns ? '-' : '+' }} {{ $t('messages.general.shippingReturns') }}
      </button>
      <transition name="collapse">
        <p v-if="showShippingReturns" class="max-h-40 overflow-y-scroll">
          {{ accordionData.page.accordion.shippingReturns }}
        </p>
      </transition>
    </div>
    <div>
      <button class="text-left hover:underline" @click="toggleSection('paymentMethod')">
        {{ showPaymentMethod ? '-' : '+' }} {{ $t('messages.general.paymentMethod') }}
      </button>
      <transition name="collapse">
        <p v-if="showPaymentMethod" class="max-h-40 overflow-y-scroll">
          {{ accordionData.page.accordion.paymentMethod }}
        </p>
      </transition>
    </div>
    <div>
      <button class="text-left hover:underline" @click="toggleSection('assistenceContact')">
        {{ showAssistenceContact ? '-' : '+' }} {{ $t('messages.general.assistenceContact') }}
      </button>
      <transition name="collapse">
        <p v-if="showAssistenceContact" class="max-h-40 overflow-y-scroll">
          {{ accordionData.page.accordion.assistenceContact }}
        </p>
      </transition>
    </div>
  </div>
</template>

<style>
.collapse-enter-active, .collapse-leave-active {
  transition: max-height 0.5s ease;
}
.collapse-enter-from, .collapse-leave-to {
  max-height: 0;
}
</style>
