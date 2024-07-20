<script setup>
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
          Spediamo Express in tutto il mondo. Tutti i pacchi sono assicurati con un numero di tracciamento a tariffa fissa. Si prega di attendere fino a 1-2 giorni lavorativi per elaborare l'ordine. Gli ordini superiori a 1000€ potrebbero richiedere 1-3 giorni lavorativi aggiuntivi per la dichiarazione doganale. Le richieste di reso devono essere effettuate entro 14 giorni dalla consegna. Si prega di contattarci via email per effettuare un reso.
        </p>
      </transition>
    </div>
    <div>
      <button class="text-left hover:underline" @click="toggleSection('paymentMethod')">
        {{ showPaymentMethod ? '-' : '+' }} {{ $t('messages.general.paymentMethod') }}
      </button>
      <transition name="collapse">
        <p v-if="showPaymentMethod" class="max-h-40 overflow-y-scroll">
          Accettiamo PayPal, Visa, Mastercard e la maggior parte delle principali carte di debito e di credito internazionali.
        </p>
      </transition>
    </div>
    <div>
      <button class="text-left hover:underline" @click="toggleSection('assistenceContact')">
        {{ showAssistenceContact ? '-' : '+' }} {{ $t('messages.general.assistenceContact') }}
      </button>
      <transition name="collapse">
        <p v-if="showAssistenceContact" class="max-h-40 overflow-y-scroll">
          Per qualsiasi domanda, contattare: E-mail: info@bikeinnovation.it
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
