<script setup>
const { allowedCountries } = await GqlGetStates({ country: 'IE' });
const { updateShippingLocation } = useCheckout();

const props = defineProps({
  modelValue: { type: Object, required: true },
  shipDifferent: { type: String, required: true },
});

const shipping = toRef(props, 'modelValue');
</script>

<template>
  <div class="grid w-full gap-4 lg:grid-cols-2">
    <div class="w-full">
      <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
      <input v-model="shipping.firstName" placeholder="Nome" type="text" :required="props.shipDifferent" />
    </div>

    <div class="w-full">
      <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
      <input v-model="shipping.lastName" placeholder="Cognome" type="text" :required="props.shipDifferent" />
    </div>

    <div class="w-full col-span-full">
      <label for="address1">{{ $t('messages.billing.address1') }}</label>
      <input v-model="shipping.address1" placeholder="Indirizzo" type="text" :required="props.shipDifferent" />
    </div>

    <div class="w-full col-span-full">
      <label for="address2">{{ $t('messages.billing.address2') }}</label>
      <input v-model="shipping.address2" placeholder="Appartamento, studio, piano" type="text" />
    </div>

    <div class="w-full">
      <label for="city">{{ $t('messages.billing.city') }}</label>
      <input v-model="shipping.city" placeholder="Città" type="text" :required="props.shipDifferent" />
    </div>

    <div class="w-full">
      <label for="zip">{{ $t('messages.billing.zip') }}</label>
      <input v-model="shipping.postcode" placeholder="CAP" type="text" />
    </div>

    <div class="w-full">
      <label for="state">{{ $t('messages.billing.state') }}</label>
      <StateSelect v-model="shipping.state" :default-value="shipping.state" :country-code="shipping.country" @change="updateShippingLocation" />
    </div>

    <div class="w-full">
      <label for="country">{{ $t('messages.billing.country') }}</label>
      <CountrySelect v-model="shipping.country" :default-value="shipping.country" @change="updateShippingLocation" />
    </div>

    <div class="w-full col-span-full">
      <label for="phone">{{ $t('messages.billing.phone') }} ({{ $t('messages.general.optional') }})</label>
      <input v-model="shipping.phone" placeholder="Telefono" type="tel" />
    </div>
  </div>
</template>
